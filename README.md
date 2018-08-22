# webdist
传统模式开发的web站点进行整站所有文件压缩及混淆处理

很多公司开发的项目或非web前端工程师开发的一些web前端页面或系统都不是基于NodeJS或当前流行的前端技术栈来开发的，对于这部分人群来说压缩混淆整个web站点还是有点难点。
我们开发了一个基于gulp的直接简单易用的整站压缩混淆工具，使用步骤如下：

- 1、输入命令：npm install 或 cnpm install   安装webdist依赖包
- 2、将需要压缩的站点放在src目录下，执行npm  run  build 命令后，结果站点会生成在disc目录下。

提示：
- 1、如果中间有报错，按提示修改相关文件内容，直至无错误提示
- 2、部分如cesium等复杂的关联性lib 不能进行压缩，可修改配置文件 或 将源文件覆盖至压缩后的文件中。、
- 3、如果你懂点javascript技术，可以打开gulpfile.js文件，按需修改配置。



---------------------------
广告：
二维地图请点击： [http://leaflet.marsgis.cn](http://leaflet.marsgis.cn)
三维地图请点击： [http://cesium.marsgis.cn](http://cesium.marsgis.cn)