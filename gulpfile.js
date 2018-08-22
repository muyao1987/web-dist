'use strict';
//////////////////////////以下参数可以根据实际情况调整/////////////////////
var copyright = "版权所有 合肥火星科技有限公司 http://www.marsgis.cn  【联系我们QQ：516584683，微信：marsgis】";

//需要压缩混淆的根目录
var srcPath = 'src';

//生成到的目标目录 
var distPath = 'dist';

//排除不拷贝的文件类型后缀
var noCopyFileType = ["psd", "doc", "rar", "docx", "txt", "sln", "suo", "md"];

//定义不做压缩混淆直接拷贝的目录
var noPipePath = [
   srcPath + '\\lib\\Cesium'
];

//排除不拷贝的目录 
var noCopyPath = [
   srcPath + '\\echarts', 
];

/////////////////////////////////////////////////////


//在gulpfile中先载入gulp包，因为这个包提供了一些API
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var header = require('gulp-header');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var utf8Convert = require('gulp-utf8-convert');
var gutil = require('gulp-util')

var fs = require('fs');
var path = require("path");


//压缩混淆 
gulp.task('build', function () {
    console.log('开始处理目录：' + srcPath);
    console.log('生成至目录：' + distPath);

    travel(srcPath, function (pathname) {
        var fileType = getFileType(pathname);

        //排除不拷贝的文件类型和目录
        if (noCopyFileType.indexOf(fileType) != -1) return;
        for (var jj = 0; jj < noCopyPath.length; jj++) {
            if (pathname.startsWith(noCopyPath[jj])) {
                return;
            }
        }

        //直接拷贝，不做处理的目录
        for (var jj = 0; jj < noPipePath.length; jj++) {
            if (pathname.startsWith(noPipePath[jj])) {
                fileType = "";
                break;
            }
        }


        var filePath = distPath + getFilePath(pathname).replace(srcPath, "");
        var stat = fs.statSync(pathname);
        var bannerData = { date: stat.mtime.format("yyyy-M-d HH:mm:ss") };

        var banner = '/* <%= date %> | ' + copyright + ' */\n';
        var bannerHtml = '<!-- <%= date %> | ' + copyright + ' -->\n';

        //console.log('完成：' + pathname + "   至 " + filePath);

        switch (fileType) {
            default:
                gulp.src(pathname)
                    .pipe(gulp.dest(filePath));
                break;
            case "html":
                gulp.src(pathname)
                    .pipe(utf8Convert({
                        encNotMatchHandle: function (file) {
                            console.log(file + " 编码可能不是utf-8，避免乱码请修改！");
                        }
                    }))
                    .pipe(htmlmin({
                        collapseWhitespace: true,           //从字面意思应该可以看出来，清除空格，压缩html，这一条比较重要，作用比较大，引起的改变压缩量也特别大。
                        collapseBooleanAttributes: true,    //省略布尔属性的值，比如：<input checked="checked"/>,那么设置这个属性后，就会变成 <input checked/>。
                        removeComments: true,               //清除html中注释的部分，我们应该减少html页面中的注释。
                        removeEmptyAttributes: true,        //清除所有的空属性。
                        removeScriptTypeAttributes: true,   //清除所有script标签中的type="text/javascript"属性。
                        removeStyleLinkTypeAttributes: true,  //清楚所有Link标签上的type属性。
                        minifyJS: true,     //压缩html中的javascript代码。
                        minifyCSS: true     //压缩html中的css代码。
                    }))
                    .pipe(header(bannerHtml, bannerData))
                    .pipe(gulp.dest(filePath));
                break;
            case "css":
                gulp.src(pathname)
                    .pipe(utf8Convert({
                        encNotMatchHandle: function (file) {
                            console.log(file + " 编码可能不是utf-8，避免乱码请修改！");
                        }
                    }))
                    .pipe(cssmin({
                        advanced: false,            //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                        compatibility: 'ie8',       //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                        keepSpecialComments: '*'    //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
                    }))
                    .pipe(header(banner, bannerData))
                    .pipe(gulp.dest(filePath));
                break;

            case "js":
                gulp.src(pathname)
                    .pipe(utf8Convert({
                        encNotMatchHandle: function (file) {
                            console.log(file + " 编码可能不是utf-8，避免乱码请修改！");
                        }
                    }))
                    .pipe(uglify().on('error', function (err) {
                        gutil.log(err);
                        this.emit('end');
                    }))
                    .pipe(header(banner, bannerData))
                    .pipe(gulp.dest(filePath));
                break;
            case "png":
            case "jpg":
            case "gif":
            case "ico":
                gulp.src(pathname)
                    .pipe(imagemin({
                        //optimizationLevel: 5,   //类型：Number  默认：3  取值范围：0-7（优化等级）
                        progressive: true,      //类型：Boolean 默认：false 无损压缩jpg图片
                        use: [pngquant()]       //使用pngquant深度压缩png图片的imagemin插件
                    }))
                   .pipe(gulp.dest(filePath));
                break;

        }
    });



});


//遍历目录获取文件列表
function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}

//获取后缀名
function getFileType(url) {
    var arr = url.split('.');
    var len = arr.length;
    return arr[len - 1];
}

function getFilePath(url) {
    return url.substring(0, url.lastIndexOf("\\") + 1);
}

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份       
        "d+": this.getDate(), //日       
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时       
        "H+": this.getHours(), //小时       
        "m+": this.getMinutes(), //分       
        "s+": this.getSeconds(), //秒       
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度       
        "S": this.getMilliseconds() //毫秒       
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) == str;
    };
};