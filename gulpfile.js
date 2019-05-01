var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
// 注册任务
// gulp.task('renwuming', function() {
//     // 配置任务的操作
//     console.log('renwuming');
    
// })

// 注册合并压缩js的任务
gulp.task('js', function () {
    // **/  深度遍历文件夹。
    return gulp.src('src/js/**/*.js') // 找到目标源文件，将数据读取到gulp的内存中
    .pipe(concat('build.js')) // 临时合并文件，并取名为 build.js
    .pipe(gulp.dest('dist/js/')) // 合并文件到dist目录下面的js文件夹   临时输出文件到本地
    .pipe(uglify())
    // .pipe(rename('build.min.js'))             // 压缩js文件
    .pipe(rename({suffix:'.min'}))                // 重命名为 .min 后缀的文件
    .pipe(gulp.dest('dist/js/'))

})

// 注册转换less的task
gulp.task('less', function() {
    return gulp.src('src/less/*.less')
    .pipe(less())   // 编译less文件为css文件
    .pipe(gulp.dest('src/css/'))
})

//  注册默认任务
gulp.task('default', [])