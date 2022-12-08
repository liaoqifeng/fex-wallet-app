<template>
	<canvas 
		v-if="use2dCanvas" 
		:id="canvasId" 
		type="2d" 
		:style="style"
		>
	</canvas>
	<canvas
		v-else 
		:canvas-id="canvasId" 
		:style="style" 
		:id="canvasId" 
		:width="boardWidth * dpr" 
		:height="boardHeight * dpr"
		>
	</canvas>
</template>

<script>
import { toPx, base64ToPath, compareVersion} from './utils';
import { Draw } from './draw';
import { Layout } from './layout';
import { adaptor, expand } from './canvas';
export default {
	// version: '1.5.9.7',
	name: 'l-painter',
	props: {
		board: Object,
		fileType: {
			type: String,
			default: 'png'
		},
		quality: {
			type: Number,
			default: 1
		},
		width: [Number, String],
		height: [Number, String],
		pixelRatio: Number,
		customStyle: String,
		isRenderImage: Boolean,
		isBase64ToPath: Boolean,
		isH5PathToBase64: Boolean,
		sleep: {
			type: Number,
			default: 1000/30
		},
		// #ifdef MP-WEIXIN
		type: {
			type: String,
			default: '2d',
		},
		// #endif
		
	},
	data() {
		return {
			// #ifndef MP-WEIXIN || MP-QQ || MP-BAIDU
			canvasId: `l-painter${this._uid}`,
			// #endif
			// #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU
			canvasId: `l-painter`,
			// #endif
			// #ifdef MP-WEIXIN
			use2dCanvas: true,
			// #endif
			// #ifndef MP-WEIXIN
			use2dCanvas: false,
			// #endif
			draw: null,
			ctx: null,
			layout: new Layout()
		};
	},
	computed: {
		newboard() {
			return this.board && JSON.parse(JSON.stringify(this.board))
		},
		style() {
			return `width:${this.boardWidth}px; height: ${this.boardHeight}px; ${this.customStyle}`;
		},
		dpr() {
			return this.pixelRatio || uni.getSystemInfoSync().pixelRatio;
		},
		boardWidth() {
			const { width = 200 } = this.board || {};
			return toPx(this.width || width);
		},
		boardHeight() {
			const { height = 200 } = this.board || {};
			return toPx(this.height || height);
		}
	},
	watch: {
		style() {
			// #ifdef MP-WEIXIN
			if(this.use2dCanvas) {
				this.inited = false;
			}
			// #endif
			// #ifdef MP-ALIPAY
			this.inited = false;
			// #endif
		}
	},
	mounted() {
		// #ifdef MP-WEIXIN
		const {SDKVersion, version, platform} = wx.getSystemInfoSync()
		// ios wx7.0.20 createImage bug
		this.use2dCanvas = (this.type === '2d' && compareVersion(SDKVersion, '2.9.2') >= 0) && !(/ios/.test(platform) && /7.0.20/.test(version));
		// #endif
		this.$watch('board', async (val, old) => {
			if (JSON.stringify(val) === '{}' || !val) return;
			this.render();
		}, {
			deep: true, 
			immediate: true,
			})
	},
	methods: {
		async render(args = {}, single = false) {
			const isArgsNoEmpty = JSON.stringify(args) != '{}'
			const ctx = await this.getContext()
			const { use2dCanvas, boardWidth, boardHeight, board, canvas, isBase64ToPath, isH5PathToBase64, sleep } = this;
			if (use2dCanvas && !canvas) {
				return Promise.reject(new Error('render: fail canvas has not been created'));
			}
			this.boundary = {
			  top: 0,
			  left: 0,
			  width: boardWidth,
			  height: boardHeight,
			}
			if(!single) {
				ctx.clearRect(0, 0, boardWidth, boardHeight);
			}
			if(!this.draw || isArgsNoEmpty) {
				this.draw = new Draw(ctx, canvas, use2dCanvas, isH5PathToBase64, sleep);
			} 
			this.layout.init(ctx, this.boundary, this.isH5PathToBase64)
			if(isArgsNoEmpty || board && JSON.stringify(board) != '{}') {
				this.node = await this.layout.calcNode(isArgsNoEmpty ? args : board)
			}
			if(this.node) {
				await this.draw.drawNode(this.node);
			}
			await new Promise(resolve => this.$nextTick(resolve)) 
			if (!use2dCanvas && !single) {
				await this.canvasDraw(ctx);
			}
			this.$emit('done')
			if(this.isRenderImage && !single) {
				this.canvasToTempFilePath()
				.then(async res => {
					if(/^data:image\/(\w+);base64/.test(res.tempFilePath) && isBase64ToPath) {
						const img = await base64ToPath(res.tempFilePath)
						this.$emit('success', img)
					} else {
						this.$emit('success', res.tempFilePath)
					}
				})
				.catch(err => {
					this.$emit('fail', err)
					new Error(JSON.stringify(err))
					console.error(JSON.stringify(err))
				})
			}
			return Promise.resolve({ctx, draw: this.draw});
		},
		async custom(cb) {
			const {ctx, draw} = await this.render({}, true)
			ctx.save()
			await cb(ctx, draw)
			ctx.restore()
			return Promise.resolve(true);
		},
		async single(args = {}) {
			await this.render(args, true)
			return Promise.resolve(true);
		},
		canvasDraw(flag = false) {
			const {ctx} = this
			return new Promise(resolve => {
				ctx.draw(flag, () => {
					resolve(true);
				});
			});
		},
		async getContext() {
			if(this.ctx && this.inited) {
				return Promise.resolve(this.ctx)
			};
			const { type, use2dCanvas, dpr, boardWidth, boardHeight } = this;
			await new Promise(resolve => this.$nextTick(resolve)) 
			const _getContext = () => {
				return new Promise(resolve => {
				uni.createSelectorQuery()
					.in(this)
					.select('#' + this.canvasId)
					.boundingClientRect()
					.exec(res => {
						if(res) {
							const ctx = uni.createCanvasContext(this.canvasId, this);
							if (!this.inited) {
								this.inited = true;
								this.use2dCanvas = false;
								this.canvas = res
							}
							// #ifdef MP-ALIPAY
							ctx.scale(dpr, dpr);
							// #endif
							this.ctx = expand(ctx)
							resolve(this.ctx);
						}
					})
				})
			}
			// #ifndef MP-WEIXIN 
			return _getContext()
			// #endif
			
			if(!use2dCanvas) {
				return _getContext()
			}
			return new Promise(resolve => {
				uni.createSelectorQuery()
					.in(this)
					.select('#l-painter')
					.node()
					.exec(res => {
						const canvas = res[0].node;
						if(!canvas) {
							this.use2dCanvas = false;
							return this.getContext()
						}
						const ctx = canvas.getContext(type);
						if (!this.inited) {
							this.inited = true;
							canvas.width = boardWidth * dpr;
							canvas.height = boardHeight * dpr;
							this.use2dCanvas = true;
							this.canvas = canvas
							ctx.scale(dpr, dpr);
						}
						this.ctx = adaptor(ctx)
						resolve(this.ctx);
					});
				
			});
		},
		canvasToTempFilePath(args = {}) {
		  const {use2dCanvas, canvasId} = this
		  return new Promise((resolve, reject) => {
		    let { top: y = 0, left: x = 0, width, height } = this.boundary || this
			let destWidth = width * this.dpr
			let destHeight = height * this.dpr
			// #ifdef MP-ALIPAY
			width = width * this.dpr
			height = height * this.dpr
			// #endif
		    const copyArgs = {
		      x,
		      y,
		      width,
		      height,
		      destWidth,
		      destHeight,
		      canvasId,
		      fileType: args.fileType || this.fileType,
		      quality: /\d/.test(args.quality) ? args.quality : this.quality,
		      success: resolve,
		      fail: reject
		    }
		    if (use2dCanvas) {
		      delete copyArgs.canvasId
		      copyArgs.canvas = this.canvas
		    }
		    uni.canvasToTempFilePath(copyArgs, this)
		  })
		}
	}
};
</script>

<style></style>
