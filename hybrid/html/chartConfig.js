var chartConfig = {
	autosize: true,
	fullscreen: true, //布尔值显示图表是否占用窗口中所有可用的空间。
	timezone: "Asia/Shanghai",
	container_id: "tv_chart_container",
	datafeed: new FeedBase(),
	library_path: "charting_library/",
	locale: "zh",
	loading_screen: {
		"backgroundColor": "#1e222d",
		"foregroundColor": "#5d7d93"
	},
	theme: 'Dark',
	preset: "mobile",
	disabled_features: [ // 需要屏蔽掉的 参考 https://tradingview.gitee.io/featuresets/
		"header_symbol_search", // 搜索
		'symbol_search_hot_key',
		'pane_context_menu', // 图表右键菜单
		"header_saveload", // 上传下载按钮
		"header_screenshot", // 照相机按钮
		"header_chart_type", // 图标类型按钮
		"header_compare", //compare
		"header_undo_redo", // 左右箭头
		'header_widget_dom_node', // 顶部工具栏
		"timeframes_toolbar", // 底部时间栏目
		"volume_force_overlay", // k线与销量分开
		"header_resolutions", // 分辨率
		'header_interval_dialog_button',
		'show_interval_dialog_on_key_press',
		"legend_context_menu",
		"control_bar",
		"edit_buttons_in_legend",
		"left_toolbar", // 左侧栏
		"header_fullscreen_button", //全屏
		'dont_show_boolean_study_arguments',
		'header_indicators', // 技术指标
		"save_chart_properties_to_local_storage",
		"use_localstorage_for_settings",
		"display_market_status",
		"header_settings", // 设置按钮
		"border_around_the_chart", //边框环绕
	],
	//禁用名称的数组
	enabled_features: [
		"move_logo_to_main_pane",
		"study_templates"
	],
	custom_css_url: "./css/tradingview.css",
	studies_overrides: {
		"volume.precision": 0,
		// 销量线
		"volume.volume.color.0": "#d64b62",
		"volume.volume.color.1": "#08ab90",
	},
	overrides: {
		// 蜡烛样式
		"mainSeriesProperties.candleStyle.upColor": "#08ab90",
		"mainSeriesProperties.candleStyle.downColor": "#d64b62",
		// 画布背景颜色
		"paneProperties.background": "#181B2A",
		//纵向网格线颜色
		"paneProperties.vertGridProperties.color": "#1f2943",
		//横向网格线颜色
		"paneProperties.horzGridProperties.color": "#1f2943",
		//标记水印透明度
		"symbolWatermarkProperties.transparency": 0,
		//刻度属性文本颜色
		"scalesProperties.textColor": '#61688a',
		// 设置坐标轴字体大小
		//'scalesProperties.fontSize': 16, 
		//隐藏左上角行情信息
		'paneProperties.legendProperties.showLegend': false,
		'left_toolbar': false,
		//销量面板尺寸，支持的值: large, medium, small, tiny
		"volumePaneSize": "medium",
		// 设置十字线
		'paneProperties.crossHairProperties.color': "rgba(197, 206, 226, 0.4)",
		'paneProperties.crossHairProperties.width': 10,
		'paneProperties.crossHairProperties.style': 0,

		//烛心
		// "mainSeriesProperties.candleStyle.drawWick" : true,
		//烛心颜色
		//"mainSeriesProperties.candleStyle.wickUpColor:" : '#8a3a3b',
		//"mainSeriesProperties.candleStyle.wickDownColor" : "#8a3a3b",

		//  白色烛心颜色
		// "mainSeriesProperties.candleStyle.wickUpColor:" : '#8a3a3b',
		// "mainSeriesProperties.candleStyle.wickDownColor" : "#8a3a3b",

		//边框
		"mainSeriesProperties.candleStyle.drawBorder": true,
	}
}
