var gulp = require( 'gulp' );
var $ = require('gulp-load-plugins')();

// var concat = require( 'gulp-concat' );
// var uglify = require( 'gulp-uglify' );
// var rename = require( 'gulp-rename' );
// var less = require( 'gulp-less' );
// var cleanCss = require( 'gulp-clean-css' );
// var htmlMin = require( 'gulp-htmlmin' );
// var livereload = require('gulp-livereload');
// var connect= require('gulp-connect');
var open = require ('open');
/**
 *  特点1： 任务化
 *  特点2： 基于流
 * task方法没有返回值的时候    为同步，有return 是异步. 可以同步可以异步
 */


// 注册任务
// gulp.task('renwuming', function() {
//     // 配置任务的操作
//     console.log('renwuming');

// })

// 注册合并压缩js的任务
gulp.task( 'js', function () {
    // **/  深度遍历文件夹。
    return gulp.src( 'src/js/**/*.js' ) // 找到目标源文件，将数据读取到gulp的内存中
        .pipe( $.concat( 'build.js' ) ) // 临时合并文件，并取名为 build.js
        .pipe( gulp.dest( 'dist/js/' ) ) // 合并文件到dist目录下面的js文件夹   临时输出文件到本地
        .pipe( $.uglify() )
        // .pipe(rename('build.min.js'))             // 压缩js文件
        .pipe( $.rename( {
            suffix: '.min'
        } ) ) // 重命名为 .min 后缀的文件
        .pipe( gulp.dest( 'dist/js/' ) )
        .pipe($.livereload())             // 实时刷新
        .pipe($.connect.reload())         // 全自动实时刷新
} )

// 注册转换less的task
gulp.task( 'less', function () {
    return gulp.src( 'src/less/*.less' )
        .pipe( $.less() ) // 编译less文件为css文件
        .pipe( gulp.dest( 'src/css/' ) )
        .pipe($.livereload())             // 实时刷新
        .pipe($.connect.reload())         // 全自动实时刷新
} )

// 注册合并压缩css文件的任务  
/**
 * ['less', '', '', ...]  数组中的任务为依赖任务。意思是需要等到数组中的任务执行完毕之后才能执行本体任务
 */
gulp.task( 'css', [ 'less' ], function () {
    return gulp.src( 'src/css/*.css' ) // 找到要合并的文件
        .pipe( $.concat( 'build.css' ) )
        .pipe( $.rename( {
            suffix: '.min'
        } ) )
        .pipe($.cleanCss( {
            compatibility: 'ie8'
        } ) )
        .pipe( gulp.dest( 'dist/css/' ) )
        .pipe($.livereload())             // 实时刷新
        .pipe($.connect.reload())         // 全自动实时刷新
} )


// 注册压缩html的任务
gulp.task( 'html', function () {
    return gulp.src( 'index.html' )
        .pipe( $.htmlmin( {
            collapseWhitespace: true
        } ) )
        .pipe(gulp.dest('dist/'))
        .pipe($.livereload())             // 实时刷新
        .pipe($.connect.reload())         // 全自动实时刷新
} )

// 注册liveReload 监测任务(半自动)
gulp.task('watch', ['default'], function() {
    // 开启监听
    $.livereload.listen();
    // 确认监听的目标以及绑定相应的任务
    gulp.watch('src/js/*.js',['js']);
    gulp.watch(['src/css/*.css', 'src/less/*.less'], ['css']);     
})


// /**
//  * 需要在文件变动后执行的一个或者多个通过 gulp.task() 创建的 task 的名字，
//  * 
//  */
// var watcher = gulp.watch('src/*.js', ['default']);


// watcher.on('change', function(event) {
//     console.log(event, `event`);
//     // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    
// })


// 注册监视任务（全自动）   // 同步['default'] 默认任务
gulp.task('server', ['default'], function() {
    // 配置服务器的选项
    $.connect.server({
        root:'dist/',
        livereload: true,
        host: '0.0.0.0',
        port: 8989
    })
    // open 插件可以自动打开指定的链接
    open('http:0.0.0.0:8989')

    // 确认监听的目标以及绑定相应的任务
   var watcher = gulp.watch('src/js/*.js',['js']);
    gulp.watch(['src/css/*.css', 'src/less/*.less'], ['css']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
})




//  注册默认任务  异步执行数组内所有任务
gulp.task( 'default', [ 'js', 'less', 'css', 'html' ] )