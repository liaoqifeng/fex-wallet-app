import { CHAR_WIDTH_SCALE_MAP } from './utils'
const _expand = ctx => {
	// #ifndef APP-PLUS
	ctx._measureText = ctx.measureText
	// #endif
	return {
		setFonts({fontFamily: ff = 'sans-serif', fontSize: fs = 14, fontWeight: fw = 'normal' , textStyle: ts = 'normal'}) {
			// let ctx = this.ctx
			// 设置属性
			// #ifndef MP-TOUTIAO
			// fw = fw == 'bold' ? 'bold' : 'normal'
			// ts = ts == 'italic' ? 'italic' : 'normal'
			// #endif
			// #ifdef MP-TOUTIAO
			fw = fw == 'bold' ? 'bold' : ''
			ts =  ts == 'italic' ? 'italic' : ''
			// #endif
			ctx.font = `${ts} ${fw} ${fs}px ${ff}`;
		},
		// #ifndef APP-PLUS
		measureText(text, fontSize) {
			// app measureText为0需要累加计算0
			return {
				width: text.split("").reduce((widthScaleSum, char) => {
				let code = char.charCodeAt(0);
				let widthScale = CHAR_WIDTH_SCALE_MAP[code - 0x20] || 1;
				return widthScaleSum + widthScale;
			  }, 0) * fontSize
			};
		},
		// #endif
	}
};
export function expand(ctx) {
	return Object.assign(ctx, _expand(ctx))
}
export function adaptor(ctx) {
	return Object.assign(ctx, _expand(ctx), {
		setStrokeStyle(val) {
			ctx.strokeStyle = val;
		},
		setLineWidth(val) {
			ctx.lineWidth = val;
		},
		setLineCap(val) {
			ctx.lineCap = val;
		},
		setFillStyle(val) {
			ctx.fillStyle = val;
		},
		setFontSize(val) {
			ctx.font = String(val);
		},
		setGlobalAlpha(val) {
			ctx.globalAlpha = val;
		},
		setLineJoin(val) {
			ctx.lineJoin = val;
		},
		setTextAlign(val) {
			ctx.textAlign = val;
		},
		setMiterLimit(val) {
			ctx.miterLimit = val;
		},
		setShadow(offsetX, offsetY, blur, color) {
			ctx.shadowOffsetX = offsetX;
			ctx.shadowOffsetY = offsetY;
			ctx.shadowBlur = blur;
			ctx.shadowColor = color;
		},
		setTextBaseline(val) {
			ctx.textBaseline = val;
		},
		createCircularGradient() {},
		draw() {},
	});
}