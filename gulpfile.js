const { src, dest, parallel } = require('gulp');
var gulp          = require('gulp'),
    concat        = require('gulp-concat'),
    minifyCSS     = require('gulp-minify-css'),
    uglify        = require('gulp-uglify'),

    serveDir = './src',
    distPaths = {
        build: 'build',
        js_build_file: 'game.min.js',
        css_build_file: 'game.min.css'
    },
    sourcePaths = {
        css: [
            'src/*.css', 
        ],
        js: [
            'src/scripts/base/*.js',
            'src/scripts/elements/*.js',
            'src/scripts/*.js',
            'src/main.js',
        ],
        mainHtml: [
            'src/index.html' 
        ]
    };

function css () {
    return gulp.src(sourcePaths.css)
        .pipe(concat(distPaths.css_build_file))
        .pipe(minifyCSS())
        .pipe(gulp.dest(distPaths.build));
};

function js () {
    return gulp.src(sourcePaths.js)
        .pipe(concat(distPaths.js_build_file))
        .pipe(gulp.dest(distPaths.build));
};

exports.js = js;
exports.css = css;
exports.default = parallel(css, js);