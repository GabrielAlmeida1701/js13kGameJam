const { src, dest, parallel } = require('gulp');
var gulp          = require('gulp'),
    babel         = require('gulp-babel');
    opn           = require('opn'),
    concat        = require('gulp-concat'),
    minifyCSS     = require('gulp-minify-css'),
    rename        = require('gulp-rename'),
    uglify        = require('gulp-uglify'),
    jshint        = require('gulp-jshint'),
    minifyHTML    = require('gulp-minify-html'),
    replaceHTML   = require('gulp-html-replace'),
    rimraf        = require('gulp-rimraf'),
    ignore        = require('gulp-ignore'),
    zip           = require('gulp-zip'),
    checkFileSize = require('gulp-check-filesize'),
    watch         = require('gulp-watch'),

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