# ReactNative_Eyepetizer
一款基于ReactNative + TypeScript实现的精美仿开眼视频跨平台App,适合新手入门，快速掌握TypeScript基本语法以及快速上手ReactNative开发。<br /><br />
Kotlin版： [Kotlin_Eyepetizer](https://github.com/fmtjava/Kotlin_Eyepetizer)<br /><br />
Flutter版：[Flutter_Eyepetizer](https://github.com/fmtjava/Flutter_Eyepetizer)

# 前言
 前段时间有Github的小伙伴问[Flutter_Eyepetizer](https://github.com/fmtjava/Flutter_Eyepetizer)能不能提供一个ReactNative版本，因为当时的工作暂时没有涉及这块内容，所以暂时就搁置了。最近公司的一个项目用到了个ReactNative混合开发，自己也参与了一部分开发，便通过这个项目把学到的相关技能分享出来，因为目前对ReactNative处于初步入门阶段，希望Github的小伙伴多多Issues，留下你们的宝贵意见。当前如果觉得项目能够帮助到你们，也希望给一个 `Star` 或 `Fork` ^_^ ，谢谢**

# 项目截图
<div style="float:right">
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcQUqJZ4KbPa4QaiwmVmQ.zNvq.hSBS75lktljPLhlzqKCul.5COQETV49bx2HLC.0GSVDMhU3Pervtbh4neHMGA!/b&bo=OARwCAAAAAABF3Q!&rf=viewer_4" width="270"/>&nbsp;&nbsp;&nbsp;
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcUsfTkluZWSrI6tGeHxmIvbm9X3IWxmMB0*w*1uLQCSpn*qqaFB3QVKDLcfDqL4SeF5DvRCOS7mrhdJFyh3fHXQ!/b&bo=OARwCAAAAAABJ0Q!&rf=viewer_4" width="270"/>&nbsp;&nbsp;&nbsp;
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcUsfTkluZWSrI6tGeHxmIvZJxy2yYHSwlhrW6bBph8kbDaiUNIBZ2uWd9w26J19YvSNKZjT6l0mHXfOkMDXH.IY!/b&bo=OARwCAAAAAABJ0Q!&rf=viewer_4" width="260"/>
</div>

<br/>

<div style="float:right">
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcUsfTkluZWSrI6tGeHxmIvY5JvV81Rb8XTIaa.BPS8IsdpWLsp.NDnvPVIKICwtTOm6iCthVBKQlR5fADUm3ucE!/b&bo=OARwCAAAAAABF3Q!&rf=viewer_4" width="270"/>&nbsp;&nbsp;&nbsp;
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcXCiAbUjcKu1jBPbX42kshw.m8kL6xMrqMiRdanFVBXAtWuvj08JsrarMi2Px6yFiKITv0eoxlMXt8N3La1kaXs!/b&bo=OARwCAAAAAABJ0Q!&rf=viewer_4" width="270"/>&nbsp;&nbsp;&nbsp;
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcavTzlTG8kuGqMngjWykI7yAuHrPCOf*S3ldznIQtxpgkL9nLWjb2macjYTMBDHWBf9ILtlXS8Q0hyIBsX8w1u4!/b&bo=OARwCAAAAAABF3Q!&rf=viewer_4" width="260"/>
</div>
<br/>

<div style="float:right">
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcavTzlTG8kuGqMngjWykI7wroj9DEOD*1ylue*0B.tCZ0476s4gdQHVRYVw6P6mD1PGCTldHm43bEmstGmDQ0KA!/b&bo=OARwCAAAAAABF3Q!&rf=viewer_4" width="270"/>&nbsp;&nbsp;&nbsp;
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcUsfTkluZWSrI6tGeHxmIvbGwvulrHRAj.zXkN6e21d6GvzqCfwaF4C8T5yWbVZiUlFZpS371nmk.5Xxhavf2lU!/b&bo=OARwCAAAAAABF3Q!&rf=viewer_4" width="270"/>&nbsp;&nbsp;&nbsp;
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcbYpu*7P3IG2l4cWH6GfBvmZsUfQc9M8STCSlUbnfQSdAoyJiYBARqXUoF394prNQcf.E7HAnByX95.US8xbVRk!/b&bo=OARwCAAAAAABF3Q!&rf=viewer_4" width="260"/>
</div>
<br/>

<div style="float:right">
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcbYpu*7P3IG2l4cWH6GfBvkpS*EGeHd6FYWKdErwaUo5Odi7XqJkOlrfQpjIlrnix7GD4D5.FhNMtXzUi*siLU0!/b&bo=OARwCAAAAAABJ0Q!&rf=viewer_4" width="270"/>&nbsp;&nbsp;&nbsp;
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcRRY0UmipAR0faJ.L5CYrlTT6bxXO3jGD5SyCRSsdcCTqTJnujozmB1oq8irk*3ebSII9d3UlforAM*i0zs2x5Y!/b&bo=OARwCAAAAAABF3Q!&rf=viewer_4" width="270"/>&nbsp;&nbsp;&nbsp;
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcbYpu*7P3IG2l4cWH6GfBvnJuM619oKuS*QMZRwkqOUfQBN0btgvp.9MmxzmFJBjMQDrE*5AKWBMMg9OsjkuV.Y!/b&bo=cAg4BAAAAAABF3Q!&rf=viewer_4" width="260"/>
</div>

<div style="float:right">
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcavTzlTG8kuGqMngjWykI7yQSQZmFPGxu4uKeKHit8KYjKItojTAbNS7cFM*XrY80VJc0E4iSZB096noqlTVQjg!/b&bo=OARwCAAAAAABF3Q!&rf=viewer_4" width="270"/>&nbsp;&nbsp;&nbsp;
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcavTzlTG8kuGqMngjWykI7w8JBYdkoLCF9sOLgUE.doJ*RkKfexYdhSSW68GKd4wLnPfpfyF5s54ONo755*wks4!/b&bo=OARwCAAAAAABF3Q!&rf=viewer_4" width="270"/>&nbsp;&nbsp;&nbsp;
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcRRY0UmipAR0faJ.L5CYrlTA.vc9kMQFMCatsFv1PUTYcjcFCH1ColsGIMOWlUuZs5wZ6kd2eI8RFbufUpzaZSw!/b&bo=OARwCAAAAAABF3Q!&rf=viewer_4" width="260"/>
</div>

<div style="float:right">
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcRRY0UmipAR0faJ.L5CYrlRt8tIdUZFCj*hgF4WWGFgFbGOTNT5BGYMMpHH*xcLU1gFtPuBGRVoMTqPv3Zh1Nnc!/b&bo=OARwCAAAAAABF3Q!&rf=viewer_4" width="270"/>
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcQUqJZ4KbPa4QaiwmVmQ.zPuXhKjEjq9xowwfYF82TZmExo6FS0uEpbECtZ.Ab3RBpCaHeJ*denZpDdFBt2YBhM!/b&bo=OARwCAAAAAABF3Q!&rf=viewer_4" width="270"/>&nbsp;&nbsp;&nbsp;
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcbYpu*7P3IG2l4cWH6GfBvnqdVqyqZouI4PjFBugExXxW33*OnvA6U035qRyoC41zEE2Ny.ibWXg8ax57IACLYo!/b&bo=OARwCAAAAAABF3Q!&rf=viewer_4" width="270"/>&nbsp;&nbsp;&nbsp;
</div>

# 核心功能
<img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcXCiAbUjcKu1jBPbX42kshw8FaB*hM5TU20jQpQjg4LV1NbXenIxDopoT11d0sR.PGeysmxV9wV95CPU3xj*weM!/b&bo=IwY4BAAAAAADJxs!&rf=viewer_4"/>
# 核心技术点
<div>
  <img src="http://m.qpic.cn/psc?/V526iEgm3HgG9w0K6aQL2X9HJE4OnV96/45NBuzDIW489QBoVep5mcT.IxVv2IQvOB.vZXZDSbBEkFcK1oeFNQbpDqVO1dPTKGM2iJRov9b*tT*jJ9afSs1sDfWkiLTshgB0ZGEpsGcM!/b&bo=EwqjAwAAAAADJ7s!&rf=viewer_4"/>
</div>

# 下载体验(Android版本) 
 - 点击[![](https://img.shields.io/badge/Download-apk-green.svg)](https://www.pgyer.com/app/qrcode/lXrn)
 - 下方二维码下载(每日上限100次，如达到上限，还是 clone 源码吧！✧(≖ ◡ ≖✿))）<br/>
   <img src="https://www.pgyer.com/app/qrcode/lXrn"/>
 - ios请自行clone项目代码运行 
 
  # 更新日志
   ### v1.0
   * 初始化项目，完成开眼视频App核心功能，目前实现首页、发现、热门、分类、我的、视频详情、视频播放、科大讯飞语音识别、推荐画廊、推荐小视频等功能，后续持续完善中...
   
   # Thanks
  - [react-navigation](https://github.com/react-navigation/react-navigation) 页面导航框架
  - [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image) 图片缓存框架
  - [axios](https://github.com/axios/axios) 网络请求框架
  - [react-native-refresh-list-view](https://github.com/huanxsd/react-native-refresh-list-view)上拉、下拉刷新框架
  - [react-native-loading-spinner-overlay](https://github.com/joinspontaneous/react-native-loading-spinner-overlay) Loading框架
  - [dva](https://github.com/dvajs/dva) 状态管理框架
  - [react-native-root-toast](https://github.com/magicismight/react-native-root-toast) 吐司组件
  - [moment](https://github.com/moment/moment) 日期处理工具集
  - [react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen) 启动白屏框架
  - [react-native-image-viewer](https://github.com/ascoders/react-native-image-viewer) 图片画廊组件
  - [react-native-af-video-player](https://github.com/abbasfreestyle/react-native-af-video-player) 视频播放组件
  - [react-native-config](https://github.com/luggit/react-native-config) 资源配置组件
 
  
 # 关于我
  - WX：fmtjava
  - QQ：2694746499
  - Email：2694746499@qq.com
  - Github：https://github.com/fmtjava
  
 # 声明
  项目中的 API 均来自开眼视频，纯属学习交流使用，不得用于商业用途！
  
 # License 
 
 Copyright (c) 2021 fmtjava

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
