# jones-hqchart2
# 介绍

> HQChart 
  H5, 微信小程序 沪深/港股/数字货币/期货/美股 K线图(kline),走势图,缩放,拖拽,十字光标,画图工具,截图,筹码图. 分析家语法,通达信语法,(麦语法),第3方数据替换接口
  
# 开源
- 源码地址:[https://github.com/jones2000/HQChart](https://github.com/jones2000/HQChart)
- 镜像地址:[https://gitee.com/jones2000/HQChart](https://gitee.com/jones2000/HQChart)
  
# 用户协议
- [用户协议](https://gitee.com/jones2000/HQChart/blob/master/%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE.txt)

# demo说明
* hqchart2_test3 内置组件模式
* hqchart2_test  单画布模式
* hqchart2_test2 多画布模式
* hqchart2_template  如何在外部封装hqchart模板
* hqchart2_renderjs 使用renderjs创建hqchart， 直接使用npm hqchart

# app demo apk下载
- [股票数据对接 app demo下载](https://opensource2.zealink.com/uniapp_demoapk/hqchart_shsz_uniapp_20210301.apk)
- [火币安卓app demo下载](https://opensource2.zealink.com/uniapp_demoapk/hqchart_huobi_uniapp.20210301.apk)
- [A股真实数据(新浪+腾讯行情源)app demo下载](https://opensource2.zealink.com/uniapp_demoapk/hqchart_astock_demo.20210505.01.apk)



> 功能:
# 1. K线图
- 支持前复权,后复权 
- 支持日线,月线,周线,年线.分钟线
- 主图支持股票叠加 
- K线形状支持 空心K线,实心K线,美国线,收盘价线
- 支持常用指标指标(目前以录入系统指标80多个),支持自定义通达信语法脚本指标( 均线，BOLL，MACD，KDJ，VOL，RSI，BRAR，WR，BIAS，OBV，DMI，CR，PSY，CCI， DMA，TRIX，VR，EMV，ROC，MIM，FSL，CYR，MASS，WAD，CHO ..... )
- 支持画图工具(小程序不支持)
- 线段，射线，矩形，圆弧线,水平线,趋势线,平行线,平行通道,价格通道线,文本,江恩角度线,阻速线,黄金分割,百分比线,波段线,三角形,对称角度,斐波那契周期线,平行四边形,圆, iconfont图片 
- 支持区间统计， 区间形态匹配 (微信小程序版本不支持) 
- 数据鼠标左右拖拽移动, 键盘移动十字光标移动，键盘缩放 
- 支持通达信语法指标
- 支持五彩K线(目前录入系统五彩K线30多个), 支持自定义通达信语法脚本的五彩K线
- 支持专家系统指标
- 支持个股筹码图
# 2. 走势图
- 支持指标 
- 支持股票叠加
- 支持沪深和港股,国内期货(开发中)
- 分钟数据显示 
- 支持多日分钟数据显示
- 
# 3. 网页demo
* [K线图](https://opensource2.zealink.com/hqweb/demo/phone7.html)  
* [走势图](https://opensource2.zealink.com/hqweb/demo/phone8.html)  
* [走势图手机页面](https://opensource2.zealink.com/hqweb/demo/phone2.html)  
* [K线图手机页面](https://opensource2.zealink.com/hqweb/demo/phone.html) 
* [横版走势图手机页面](https://opensource2.zealink.com/hqweb/demo/phone10.html)  
* [横版K线图手机页面](https://opensource2.zealink.com/hqweb/demo/phone9.html)  
* [多日走势图](https://opensource2.zealink.com/hqweb/demo/phone15.html) 
* [个股筹码图](https://opensource2.zealink.com/hqweb/demo/phone18.html) 
* [指标回测(手机版)](https://opensource2.zealink.com/hqweb/operatebsh5/index.html?symbol=000001.sz) 
* [手机K线训练](https://opensource2.zealink.com/hqweb/demo/demo_ktrain.html) 
* [手机K线训练横屏](https://opensource2.zealink.com/hqweb/demo/demo_ktrain2.html) 
* [弹幕功能](https://opensource2.zealink.com/hqweb/demo/phone21.html) 
* [多指标叠加](https://opensource2.zealink.com/hqweb/demo/phone22.html) 
* [截面数据(财务数据)计算器](https://opensource2.zealink.com/hqweb/demo/sectiondatatest.html) 
* [走势图-大盘异动](https://opensource2.zealink.com/hqweb/demo/phone23.html) 
* [分笔K线图](https://opensource2.zealink.com/hqweb/demo/phone24.html) 



# 4.使用教程
## H5教程
1. [HQChart使用教程1-如何快速创建一个K线图页面](https://blog.csdn.net/jones2000/article/details/90272733)
2. [HQChart使用教程2-如何把自定义指标显示在K线图页面](https://blog.csdn.net/jones2000/article/details/90273684) 
3. [HQChart使用教程3-如何把指标上锁显示在K线图页面](https://blog.csdn.net/jones2000/article/details/90285723)
4. [HQChart使用教程4-如何自定义K线图颜色风格](https://blog.csdn.net/jones2000/article/details/90286933)
5. [HQChart使用教程5-K线图控件操作函数说明](https://blog.csdn.net/jones2000/article/details/90301000)
6. [HQChart使用教程6-如何获取K线图上的指标数据进行回测](https://blog.csdn.net/jones2000/article/details/90314625)
7. [HQChart使用教程7-如何快速创建一个分时图页面](https://blog.csdn.net/jones2000/article/details/90319619) 
8. [HQChart使用教程9-如何快速创建K线训练页面](https://blog.csdn.net/jones2000/article/details/90478687) 
9. [HQChart使用教程10-手机端页面设置的几个特殊属性](https://blog.csdn.net/jones2000/article/details/90727468) 
10. [HQChart使用教程11-如何把K线数据API替换成自己的API数据](https://blog.csdn.net/jones2000/article/details/90747715) 
11. [HQChart使用教程8-如何快速创建一个横屏分时图页面](https://blog.csdn.net/jones2000/article/details/90453776) 
12. [HQChart使用教程14-分析家语法执行器](https://blog.csdn.net/jones2000/article/details/93731637) 
13. [HQChart使用教程13-5分钟完成一个小程序K线图](https://blog.csdn.net/jones2000/article/details/91471252) 
14. [HQChart使用教程12-如何在K线图上添加弹幕](https://blog.csdn.net/jones2000/article/details/91125408) 
15. [HQChart使用教程15-分析家语法执行器python版本](https://blog.csdn.net/jones2000/article/details/94738592) 
16. [HQChart使用教程16-py中使用麦语言指标可视化](https://blog.csdn.net/jones2000/article/details/94920596) 
17. [HQChart使用教程17-多技术指标独立坐标叠加](https://blog.csdn.net/jones2000/article/details/95618901) 
18. [HQChart使用教程18-K线截图](https://blog.csdn.net/jones2000/article/details/95738306) 
19. [HQChart使用教程19-基于HQChart的后台单股票指标计算服务](https://blog.csdn.net/jones2000/article/details/96479448) 
20. [HQChart使用教程20-单股票截面数据(财务数据)计算器](https://blog.csdn.net/jones2000/article/details/97135592) 
21. [HQChart使用教程21-十字光标设置说明](https://blog.csdn.net/jones2000/article/details/97682466) 
22. [HQChart使用教程22-如何创建移动筹码图](https://blog.csdn.net/jones2000/article/details/97928892) 
23. [HQChart使用教程23-Y轴刻度显示设置](https://blog.csdn.net/jones2000/article/details/98320020) 
24. [HQChart使用教程24-多语言设置](https://blog.csdn.net/jones2000/article/details/98734091) 
25. [HQChart使用教程25-叠加多个品种设置](https://blog.csdn.net/jones2000/article/details/98878463) 
26. [HQChart使用教程26-K线图及走势图数据自动更新设置](https://blog.csdn.net/jones2000/article/details/99483328) 
27. [HQChart使用教程27-动态设置K线图指标模板](https://blog.csdn.net/jones2000/article/details/100079989) 
28. [HQChart使用教程28-如何创建系统指标](https://blog.csdn.net/jones2000/article/details/100103486) 
29. [HQChart使用教程31-走势图异动数据设置](https://blog.csdn.net/jones2000/article/details/100191957) 
30. [HQChart使用教程32-如何K线图显示自定义SVG矢量图标](https://blog.csdn.net/jones2000/article/details/100613634) 
33. [HQChart使用教程39-指标中如何绘制文本分割线](https://blog.csdn.net/jones2000/article/details/101487482) 
34. [HQChart使用教程40-如何自定义分钟周期或日线周期K线](https://blog.csdn.net/jones2000/article/details/101722958) 
35. [HQChart使用教程41-分钟K线设置拖拽自动下载历史数据](https://blog.csdn.net/jones2000/article/details/102471720) 
36. [HQChart使用教程42-K线图如何对接数字货币](https://blog.csdn.net/jones2000/article/details/102493905) 
37. [HQChart使用教程43-日K线设置拖拽自动下载历史数据](https://blog.csdn.net/jones2000/article/details/102511317) 
38. [HQChart使用教程45-如何动态修改指标参数](https://blog.csdn.net/jones2000/article/details/102594672) 
39. [HQChart使用教程46-分钟周期数据计算外部接口](https://blog.csdn.net/jones2000/article/details/102628045) 
40. [HQChart使用教程47-如何自定义右键菜单](https://blog.csdn.net/jones2000/article/details/102720671) 
41. [HQChart使用教程48-如何自定义X轴刻度](https://blog.csdn.net/jones2000/article/details/102741428) 
42. [HQChart使用教程49-指标配置项说明](https://blog.csdn.net/jones2000/article/details/102928907) 
43. [HQChart使用教程50-Y轴自定义刻度设置说明](https://blog.csdn.net/jones2000/article/details/103174483) 
44. [HQChart使用教程51-指标切换按钮事件说明-h5版本](https://blog.csdn.net/jones2000/article/details/103187576) 
45. [HQChart使用教程52-自定义手机端K线图Tooltip](https://blog.csdn.net/jones2000/article/details/103820718) 
46. [HQChart使用教程53-log日志输出控制](https://blog.csdn.net/jones2000/article/details/104122774) 
47. [HQChart使用教程54-K线缩放控制按钮接口说明](https://blog.csdn.net/jones2000/article/details/104346016) 
48. [HQChart使用教程55-自定义PC端K线图Tooltip](https://blog.csdn.net/jones2000/article/details/104443471) 
49. [HQChart使用教程56-内置品种对应后缀列表说明](https://blog.csdn.net/jones2000/article/details/104457569) 
50. [HQChart使用教程57-如何调整K线的柱子缩放大小](https://blog.csdn.net/jones2000/article/details/104817724)
51. [HQChart使用教程58-如何在K线右侧绘制面积图(如深度图)](https://blog.csdn.net/jones2000/article/details/105026997)
52. [HQChart使用教程59-跨周期跨股票函数STKINDI使用说明](https://blog.csdn.net/jones2000/article/details/105401909)
53. [HQChart使用教程60-新版k线训练使用教程](https://blog.csdn.net/jones2000/article/details/105760924)
54. [HQChart使用教程61-画图工具接口使用教程](https://blog.csdn.net/jones2000/article/details/105835428)
55. [HQChart使用教程62-品种小数位数设置](https://blog.csdn.net/jones2000/article/details/106592730)
56. [HQChart使用教程64-前端自定义周期算法接口](https://blog.csdn.net/jones2000/article/details/107633707)
57. [HQChart使用教程65-设置指标输出动态变量名](https://blog.csdn.net/jones2000/article/details/108675254)
58. [HQChart使用教程66-自定义数据下载文字提示效果](https://blog.csdn.net/jones2000/article/details/109007027)
59. [HQChart使用教程67-鼠标点击K线柱子监听事件](https://blog.csdn.net/jones2000/article/details/109119390)
60. [HQChart使用教程68-配置DRAWTEXT,DRAWICON,DRAWNUMBER字体大小](https://blog.csdn.net/jones2000/article/details/109244069)
61. [HQChart使用教程69-获取指定股票的K线数据](https://blog.csdn.net/jones2000/article/details/111736960)
62. [HQChart使用教程70-通达信指标翻译](https://blog.csdn.net/jones2000/article/details/112998609)
63. [HQChart使用教程71-如何自定义Y轴刻度线](https://blog.csdn.net/jones2000/article/details/113666565)
64. [HQChart使用教程72-画图工具波浪尺刻度配置](https://blog.csdn.net/jones2000/article/details/113923817)
65. [HQChart使用教程73-使用Vue3.0创建HQChart图形](https://blog.csdn.net/jones2000/article/details/114954091)
66. [HQChart使用教程74-使用快速创建数字币深度图](https://blog.csdn.net/jones2000/article/details/115322752)
67. [HQChart使用教程75-K线图鼠标单击事件接口](https://blog.csdn.net/jones2000/article/details/115707759)
68. [HQChart使用教程76-K线图手势事件接口](https://blog.csdn.net/jones2000/article/details/115862159)
69. [HQChart使用教程77-Y轴刻度文字创建事件回调](https://blog.csdn.net/jones2000/article/details/116376898)<br>
70. [HQChart使用教程78-分时图集合竞价](https://blog.csdn.net/jones2000/article/details/116523681)<br>
71. [HQChart使用教程79-异常处理接口](https://blog.csdn.net/jones2000/article/details/117524401)<br>
72. [HQChart使用教程80-自定义指标标题信息](https://blog.csdn.net/jones2000/article/details/117803420)<br>
73. [HQChart使用教程81-自定义指标窗口高度](https://jones2000.blog.csdn.net/article/details/118652171)<br>
74. [HQChart使用教程82-动态修改叠加指标参数](https://jones2000.blog.csdn.net/article/details/118681399)<br>
75. [HQChart使用教程83-K线图最高最低价显示配置](https://jones2000.blog.csdn.net/article/details/118856130)<br>

## 小程序教程
1. [HQChart小程序教程1-如何快速的创建一个K线图](https://developers.weixin.qq.com/community/develop/article/doc/0006c451ac81589915b89d1c55bc13) 
2. [HQChart小程序教程2-如何使用新版2D画布创建一个K线图](https://blog.csdn.net/jones2000/article/details/105632095)
3. [HQChart小程序教程3-新版2D单画布如何切换K线图和分时图](https://blog.csdn.net/jones2000/article/details/108378355)

## uni-app教程
1. [HQChart使用教程35-如何在uni-app创建K线图(h5)](https://blog.csdn.net/jones2000/article/details/101039026) 
2. [HQChart使用教程36-如何在uni-app创建走势图(h5)](https://blog.csdn.net/jones2000/article/details/101039673) 
3. [HQChart使用教程37-如何在uni-app创建k线图(app)](https://blog.csdn.net/jones2000/article/details/101075683) 
4. [HQChart使用教程38-如何在uni-app创建走势图(app)](https://blog.csdn.net/jones2000/article/details/101481960) 
5. [HQChart使用教程44-uniapp使用条件编译同时支持h5,app,小程序](https://blog.csdn.net/jones2000/article/details/102529190) 
6. [HQChart使用教程60-解决uniapp-app页面隐藏后在显示白屏的问题](https://blog.csdn.net/jones2000/article/details/105484202) 
7. [HQChart使用教程63-uniapp使用renderjs+hqchart(h5)](https://blog.csdn.net/jones2000/article/details/106933985)
8. [HQChart实战教程40-如何制作hqchart组件(uniapp版本)](https://blog.csdn.net/jones2000/article/details/116034602)

## 第3方数据前端接入教程(走势图)
1. [HQChart使用教程29-走势图如何对接第3方数据1](https://blog.csdn.net/jones2000/article/details/100132357) 
2. [HQChart使用教程29-走势图如何对接第3方数据2-最新分时数据](https://blog.csdn.net/jones2000/article/details/100149703) 
3. [HQChart使用教程29-走势图如何对接第3方数据3-多日分时数据](https://blog.csdn.net/jones2000/article/details/100150842) 
4. [HQChart使用教程29-走势图如何对接第3方数据4-叠加股票分时数据](https://blog.csdn.net/jones2000/article/details/100167703) 
5. [HQChart使用教程29-走势图如何对接第3方数据4-异动提示信息](https://blog.csdn.net/jones2000/article/details/100516071) 
6. [HQChart使用教程29-走势图如何对接第3方数据5-指标数据](https://blog.csdn.net/jones2000/article/details/102426337) 
7. [HQChart使用教程29-走势图如何对接第3方数据6-websocket分钟数据](https://blog.csdn.net/jones2000/article/details/102568258) 
8. [HQChart使用教程29-走势图如何对接第3方数据7-叠加股票最新分时数据](https://blog.csdn.net/jones2000/article/details/110525351) 

## 第3方数据前端接入教程(K线图)
1. [HQChart使用教程30-K线图如何对接第3方数据1](https://blog.csdn.net/jones2000/article/details/100181279) 
2. [HQChart使用教程30-K线图如何对接第3方数据2-日K数据](https://blog.csdn.net/jones2000/article/details/100552022) 
3. [HQChart使用教程30-K线图如何对接第3方数据3-1分钟K数据](https://blog.csdn.net/jones2000/article/details/100557649) 
4. [HQChart使用教程30-K线图如何对接第3方数据4-流通股本数据](https://blog.csdn.net/jones2000/article/details/100574186) 
5. [HQChart使用教程30-K线图如何对接第3方数据5-指标数据](https://blog.csdn.net/jones2000/article/details/100579223) 
6. [HQChart使用教程30-K线图如何对接第3方数据6-分笔K线数据](https://blog.csdn.net/jones2000/article/details/100671849) 
7. [HQChart使用教程30-K线图如何对接第3方数据7-日K数据分页下载](https://blog.csdn.net/jones2000/article/details/101275824)
8. [HQChart使用教程30-K线图如何对接第3方数据8-1分钟K线数据分页下载](https://blog.csdn.net/jones2000/article/details/101277092) 
9. [HQChart使用教程30-K线图如何对接第3方数据9-BS指标数据](https://blog.csdn.net/jones2000/article/details/101350429) 
10. [HQChart使用教程30-K线图如何对接第3方数据10-如何绘制自定义线段或多边行指标数据](https://blog.csdn.net/jones2000/article/details/101694618)
11. [HQChart使用教程30-K线图如何对接第3方数据11-如何绘制多组自定义图标](https://blog.csdn.net/jones2000/article/details/101757384) 
12. [HQChart使用教程30-K线图如何对接第3方数据12-如何在指标中绘制文字](https://blog.csdn.net/jones2000/article/details/101864046) 
13. [HQChart使用教程30-K线图如何对接第3方数据13-使用websocket更新最新K线数据](https://blog.csdn.net/jones2000/article/details/102138784) 
14. [HQChart使用教程30-K线图如何对接第3方数据14-轮询增量更新日K数据](https://blog.csdn.net/jones2000/article/details/102518334) 
15. [HQChart使用教程30-K线图如何对接第3方数据15-轮询增量更新1分钟K线数据](https://blog.csdn.net/jones2000/article/details/102518422) 
16. [HQChart使用教程30-K线图如何对接第3方数据16-日K叠加股票](https://blog.csdn.net/jones2000/article/details/102661873) 
17. [HQChart使用教程30-K线图如何对接第3方数据17-分钟K叠加股票](https://blog.csdn.net/jones2000/article/details/102887690) 
18. [HQChart使用教程30-K线图如何对接第3方数据18-如何绘制自定义柱子](https://blog.csdn.net/jones2000/article/details/104417736)
19. [HQChart使用教程30-K线图如何对接第3方数据19-如何绘制彩色K线柱](https://blog.csdn.net/jones2000/article/details/104859784)
20. [HQChart使用教程30-K线图如何对接第3方数据20-信息地雷公告数据](https://blog.csdn.net/jones2000/article/details/105876161)
21. [HQChart使用教程30-K线图如何对接第3方数据21-跨周期函数数据](https://blog.csdn.net/jones2000/article/details/109063625)
22. [HQChart使用教程30-K线图如何对接第3方数据22-FINVALUE函数数据](https://blog.csdn.net/jones2000/article/details/111387095)
23. [HQChart使用教程30-K线图如何对接第3方数据23-FINANCE函数数据](https://blog.csdn.net/jones2000/article/details/111999910)
24. [HQChart使用教程30-K线图如何对接第3方数据24-如何填充K线背景色](https://blog.csdn.net/jones2000/article/details/112342980)
25. [HQChart使用教程30-K线图如何对接第3方数据25-指标脚本自定义变量](https://blog.csdn.net/jones2000/article/details/112755911)
26. [HQChart使用教程30-K线图如何对接第3方数据26-指标脚本自定义函数](https://blog.csdn.net/jones2000/article/details/112809781)
27. [HQChart使用教程30-K线图如何对接第3方数据27-如何在指标中渲染DOM元素](https://blog.csdn.net/jones2000/article/details/114006164)
28. [HQChart使用教程30-K线图如何对接第3方数据28-大盘数据](https://blog.csdn.net/jones2000/article/details/117712105)
29. [HQChart使用教程30-K线图如何对接第3方数据29-板块字符串函数数据](https://jones2000.blog.csdn.net/article/details/118887416)


## 实战教程
1. [HQChart实战教程1-外汇分时图](https://blog.csdn.net/jones2000/article/details/103254501) 
2. [HQChart实战教程2-使用跨周期写指标](https://blog.csdn.net/jones2000/article/details/103275668) 
3. [HQChart实战教程3-http+ws对接分钟K线数据](https://blog.csdn.net/jones2000/article/details/103882063) 
4. [HQChart实战教程4-http+ws对接日K线数据](https://blog.csdn.net/jones2000/article/details/103966271) 
5. [HQChart实战教程5-http+ws对接单日分时图数据](https://blog.csdn.net/jones2000/article/details/103966925) 
6. [HQChart实战教程6-自定义分时图](https://blog.csdn.net/jones2000/article/details/104165374) 
7. [HQChart实战教程7-自定义显示手势点击K线显示信息](https://blog.csdn.net/jones2000/article/details/104168610) 
8. [HQChart实战教程8-如何手动重新初始化hqchart](https://blog.csdn.net/jones2000/article/details/105302626)
9. [HQChart实战教程9-自定义A股分时图](https://blog.csdn.net/jones2000/article/details/105587559) 
10. [HQChart实战教程14-K线图对接第3方http/https数据教程整理](https://blog.csdn.net/jones2000/article/details/106064879)
11. [HQChart实战教程17-K线沙盘推演](https://blog.csdn.net/jones2000/article/details/106776837) 
12. [HQChart实战教程18-多股同列](https://blog.csdn.net/jones2000/article/details/107193410)

## 火币对接完整教程（付费文章）
1. [HQChart实战教程10-全ws数据对接HQChart(数字货币对接实战)](https://blog.csdn.net/jones2000/article/details/105698038) 
2. [HQChart实战教程11-火币网ws数据对接](https://blog.csdn.net/jones2000/article/details/105721190) 
3. [HQChart实战教程12-火币网ws数据对接分时图](https://blog.csdn.net/jones2000/article/details/105756659) 
4. [HQChart实战教程13-火币网ws数据对接K线（uniapp)](https://blog.csdn.net/jones2000/article/details/105804461)
5. [HQChart实战教程15-火币网ws数据对接拖拽下载历史K线图](https://blog.csdn.net/jones2000/article/details/106205584)
6. [HQChart实战教程16-K线图风格配色篇-仿火币网H5配色](https://blog.csdn.net/jones2000/article/details/106226272)

## 币安对接(源码收费)
1. [HQChart实战教程36-数字货币安币对接-uniapp版本](https://blog.csdn.net/jones2000/article/details/114468807)
2. [HQChart实战教程41-新浪+腾讯A股数据源对接-uniapp版本](https://blog.csdn.net/jones2000/article/details/117139756)

## httpA股数据对接教程(付费文章)
### 日K线
1. [HQChart实战教程29-A股日K线数据对接-Vue版本](https://blog.csdn.net/jones2000/article/details/113099783)
2. [HQChart实战教程30-A股日K线数据对接-uniapp版本](https://blog.csdn.net/jones2000/article/details/113101342)
3. [HQChart实战教程34-A股日K线数据对接-小程序版本](https://blog.csdn.net/jones2000/article/details/113577904)
### 分钟K线
1. [HQChart实战教程31-A股分钟K线数据对接-Vue版本](https://blog.csdn.net/jones2000/article/details/113101407)
2. [HQChart实战教程32-A股分钟K线数据对接-uniapp版本](https://blog.csdn.net/jones2000/article/details/113101448)
### 分时图
1. [HQChart实战教程33-A股分时图数据对接-Vue版本](https://blog.csdn.net/jones2000/article/details/113226866)
2. [HQChart实战教程35-A股分时图数据对接-uniapp版本](https://blog.csdn.net/jones2000/article/details/113777111)
### 后台指标
1. [HQChart实战教程36-A股后台指标对接-uniapp版本](https://blog.csdn.net/jones2000/article/details/114991081)
### 新浪接口对接
1. [HQChart实战教程37-新浪分钟K线数据对接-js版本](https://blog.csdn.net/jones2000/article/details/115388377)
2. [HQChart实战教程38-新浪期货数据对接-js版本](https://blog.csdn.net/jones2000/article/details/115408971)

## 高级应用实战教程（付费文章）
1. [HQChart实战教程19 - PC端分时图定制tooltip](https://blog.csdn.net/jones2000/article/details/108633991)
2. [HQChart实战教程20 - PC端K线图定制tooltip](https://blog.csdn.net/jones2000/article/details/108639960)
3. [HQChart实战教程21 - unapp app端分时图定制tooltip](https://blog.csdn.net/jones2000/article/details/108657043)
4. [HQChart实战教程21 - uniapp app端K线图定制tooltip](https://blog.csdn.net/jones2000/article/details/108674679)
5. [HQChart实战教程22 - PC端定制区间选择菜单](https://blog.csdn.net/jones2000/article/details/108907629)
6. [HQChart实战教程23 - 点击K线显示历史分钟走势图](https://blog.csdn.net/jones2000/article/details/109127873)
7. [HQChart实战教程24 - 自定义K线画图工具设置框（线段类）](https://blog.csdn.net/jones2000/article/details/109217719)
8. [HQChart实战教程25 - 自定义K线画图工具设置框（文字类）](https://blog.csdn.net/jones2000/article/details/109267078)
9. [HQChart实战教程30 - 配置K线画图](https://blog.csdn.net/jones2000/article/details/113819121)
10. [HQChart实战教程26 - K线画图工具增加自定义图标](https://blog.csdn.net/jones2000/article/details/109529224)
11. [HQChart实战教程27 - 走势图最后一个数据增加动画点](https://blog.csdn.net/jones2000/article/details/111599341)
12. [HQChart实战教程28 - 动态切换颜色风格](https://blog.csdn.net/jones2000/article/details/112563596)
13. [HQChart实战教程29 - 指标参数保存到本地缓存](https://blog.csdn.net/jones2000/article/details/113349967)
14. [HQChart实战教程39 - K线图键盘事件重载](https://blog.csdn.net/jones2000/article/details/115921430)




## 设计文档:
1. [如何(c++,js)写一个传统的K线图和走势图1](https://blog.csdn.net/jones2000/article/details/84779481) <br>
2. [如何(c++,js)写一个传统的K线图和走势图2-走势图](https://blog.csdn.net/jones2000/article/details/84840770) <br>
3. [如何(c++,js)写一个传统的K线图和走势图3-多指标窗口模式如何实现的](https://blog.csdn.net/jones2000/article/details/84979910) <br>
4. [如何(c++,js)写一个传统的K线图和走势图3-十字光标的绘制](https://blog.csdn.net/jones2000/article/details/85123680) <br>
5. [如何(c++,js)写一个传统的K线图和走势图4-K线图](https://blog.csdn.net/jones2000/article/details/85235463) <br>
6. [如何(c++,js)写一个传统的K线图和走势图5-移动筹码图](https://blog.csdn.net/jones2000/article/details/85356163) <br>

## HQChartPy2介绍（py版本指标引擎）
1. [HQChart(C++)指标计算引擎-介绍](https://blog.csdn.net/jones2000/article/details/107464517) <br>
2. [HQChart(C++)指标计算引擎-安装](https://blog.csdn.net/jones2000/article/details/107712259) <br>
3. [HQChart(C++)指标计算引擎-py接口类FastHQChart介绍](https://blog.csdn.net/jones2000/article/details/107725170) <br>
4. [HQChart(C++)指标计算引擎-py接口类IHQData K线数据对接](https://blog.csdn.net/jones2000/article/details/107728903) <br>

## HQChartPy2数据对接教程 (以tushare数据为例子)
1. [hqchartPy2数据对接教程1-K线数据](https://blog.csdn.net/jones2000/article/details/112060412)<br>
2. [hqchartPy2数据对接教程2-股本数据,筹码分布函数](https://blog.csdn.net/jones2000/article/details/112060761)<br>
3. [hqchartPy2数据对接教程3-FINANCE数据](https://blog.csdn.net/jones2000/article/details/112095070)<br>
4. [hqchartPy2数据对接教程4-DYNAINFO函数](https://blog.csdn.net/jones2000/article/details/112334485)<br>
5. [hqchartPy2数据对接教程5-引用指定股票数据函数](https://blog.csdn.net/jones2000/article/details/112335307)<br>
6. [hqchartPy2指标选股-KDJ选股](https://blog.csdn.net/jones2000/article/details/113667444)<br>