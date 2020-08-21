# web-dist
传统模式开发的web站点，进行整站所有文件压缩及混淆处理

很多公司开发的项目或非web前端工程师开发的一些web前端页面或系统都不是基于NodeJS或当前流行的前端技术栈来开发的，对于这部分人群来说压缩混淆整个web站点还是有点难度。

我们开发了一个基于gulp的直接简单易用的整站压缩混淆工具，会保持原项目的所有目录结构，递归进行对所有文件的压缩和混淆处理，使用步骤如下：


## 使用
1. 首次使用输入命令：`npm install` 或 `cnpm install`   安装依赖包
2. 将需要压缩的站点放在src目录下，执行`npm  run  build` 命令后，结果站点会生成在disc目录下。
3. 将disc目录拷贝至http服务容器中进行发布访问即可。

## 提示
1. gulp4 对node版本有要求，可以百度查询学习下。
2. 如果中间有报错，按提示修改相关文件内容，直至无错误提示
3. 部分如cesium等由多个js组成的复杂的关联性lib 不能进行压缩（目前代码中已处理），可修改配置文件中noPipePath参数 或 将源文件覆盖至压缩后的文件中。
4. 如果你懂点javascript技术，可以打开gulpfile.js文件，按需修改配置。

## 支持
1. 支持js文件混淆及压缩
2. 支持css、html、图片文件压缩
3. 保持原项目的所有目录结构和其他格式文件的复制
 

## 更高级的加密方式
   访问 [ https://github.com/muyao1987/web-dist-pro]( https://github.com/muyao1987/web-dist-pro)，该仓库与本仓库基本相同，但采用了更复杂的js加密方式，更难以破解，但是也更容易出问题，可以酌情使用。

## 作者
  [火星科技](http://marsgis.cn/) - [木遥](https://work.weixin.qq.com/wework_admin/user/h5/qqmail_user_card/vc9b130b6638aebeb7)  