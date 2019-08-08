const { parallel } = require('gulp');
var gulp          = require('gulp'),
    concat        = require('gulp-concat'),
    minifyCSS     = require('gulp-minify-css'),
    minifyJS      = require('gulp-terser'),
    through       = require('through2'),
    cminify       = require('./minify'),

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
        .pipe(through.obj(function (file, enc, cb) {
            let content = file.contents.toString()
            let result = cminify.replaceCommunItens(content)
            file.contents = new Buffer(result)
            
            cb(null, file)
        }))
        .pipe(minifyJS())
        .pipe(gulp.dest(distPaths.build));
};

exports.js = js;
exports.css = css;
exports.default = parallel(css, js);