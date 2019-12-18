const gulp = require("gulp");
const sourcemaps = require('gulp-sourcemaps');
const babel = require("gulp-babel");
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const concatCSS = require('gulp-concat-css');
const imagemin = require('gulp-imagemin');
const del = require('del');
const gutil = require('gulp-util');

const PUBLIC_PATH = './public';

const filesPath = {
    html: [
        './src/*.html',
    ],
    css: [
        './src/css/bootstrap.min.css',
        './src/css/plugins/**/*.css',
        './src/css/style.css',
        './src/css/main.css',
    ],
    // templateScripts: [
    //     './src/js/**/*.js'
    // ],
    scripts: [
        './src/js-app/**/*.js'
    ],
    fonts: [
        './src/fonts/**/*',
    ],
    images: [
        './src/images/**/*',
    ],
};

const outputPath = {
    html: `${PUBLIC_PATH}`,
    css: `${PUBLIC_PATH}/css`,
    // templateScripts: `${PUBLIC_PATH}/js`,
    scripts: `${PUBLIC_PATH}/js`, // scripts: `${PUBLIC_PATH}/js-app`,
    fonts: `${PUBLIC_PATH}/fonts`,
    images: `${PUBLIC_PATH}/images`,
};

const imageminParams = [
    imagemin.gifsicle({ interlaced: true }),
    imagemin.jpegtran({ progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 }),
    imagemin.svgo({
        plugins: [
            { removeViewBox: false },
            { cleanupIDs: false }
        ]
    })
];

const cleanCSSParams = {
    level: 2
};



gulp.task('styles', () => {
    return gulp.src(filesPath.css)
        .pipe(ifDevRun(sourcemaps.init))
        .pipe(concatCSS('bundle.css'))
        .pipe(ifProdRun(cleanCSS, [cleanCSSParams]))
        .pipe(ifDevRun(sourcemaps.write, [`./`]))
        .pipe(gulp.dest(outputPath.css))
        .pipe(browserSync.stream());
});

gulp.task('fonts', () => {
    return gulp.src(filesPath.fonts)
        .pipe(gulp.dest(outputPath.fonts))
        .pipe(browserSync.stream());
});

gulp.task('images', () => {
    return gulp.src(filesPath.images)
        .pipe(ifProdRun(imagemin, [imageminParams]))
        .pipe(gulp.dest(outputPath.images))
        .pipe(browserSync.stream());
});

gulp.task('html', () => {
    return gulp.src(filesPath.html)
        .pipe(gulp.dest(outputPath.html))
        .pipe(browserSync.stream());
});

// gulp.task("templateScripts", () => {
//     return gulp.src(filesPath.templateScripts)
//         // .pipe(ifDevRun(sourcemaps.init))
//         // .pipe(babel({
//         //     "presets": [
//         //         ["@babel/preset-env", {
//         //                 "modules": 'umd'
//         //         }]
//         //     ]
//         // }))
//         // .pipe(concat("bundle.js"))
//         // .pipe(ifDevRun(sourcemaps.write, [`./`]))
//         .pipe(gulp.dest(outputPath.templateScripts))
//         .pipe(browserSync.stream());
// });

// gulp.task("scripts", () => {
//     return gulp.src(filesPath.scripts)
//         // .pipe(ifDevRun(sourcemaps.init))
//         // .pipe(babel({
//         //     "presets": [
//         //         ["@babel/preset-env", {
//         //                 "modules": 'umd'
//         //         }]
//         //     ]
//         // }))
//         // .pipe(concat("bundle.js"))
//         // .pipe(ifDevRun(sourcemaps.write, [`./`]))
//         .pipe(gulp.dest(outputPath.scripts))
//         .pipe(browserSync.stream());
// });

gulp.task("scripts", () => {
        return gulp.src([
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/popper.js/dist/umd/popper.min.js', //'./src/js/popper.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js', // './src/js/bootstrap.min.js',

            './src/js/plugins.js',
            './src/js/active.js',

            './src/js-app/components/*.js',
            './src/js-app/handlers/*.js',
            './src/js-app/pages/*.js',
            './src/js-app/templates/*.js',

            './src/js-app/fetch.js',
            './src/js-app/helpers.js',
            './src/js-app/pageController.js',
            './src/js-app/qs.js',
            './src/js-app/settings.js',
            './src/js-app/main.js',
        ])
        .pipe(ifDevRun(sourcemaps.init))
        // .pipe(babel({
        //     "presets": [
        //         ["@babel/preset-env", {
        //                 "modules": 'umd'
        //         }]
        //     ]
        // }))
        .pipe(concat("bundle.js"))
        .pipe(ifDevRun(sourcemaps.write, [`./`]))
        .pipe(gulp.dest(outputPath.scripts))
        .pipe(browserSync.stream());
});

gulp.task('del', () => del([`${PUBLIC_PATH}/*`]));

gulp.task('watch', () => {
    browserSync.init({
        port: 3010,
        server: {
            baseDir: `${PUBLIC_PATH}`,
        },
    });

    gulp.watch(filesPath.html, gulp.series('html')).on('change', browserSync.reload);
    gulp.watch(filesPath.css, gulp.series('styles'));
    // gulp.watch(filesPath.templateScripts, gulp.series('templateScripts'));
    gulp.watch(filesPath.scripts, gulp.series('scripts'));
    gulp.watch(filesPath.fonts, gulp.series('fonts'));
    gulp.watch(filesPath.images, gulp.series('images'));
 });

const devTasks = ['html', 'styles', 'scripts', 'fonts', 'images']; // ['html', 'styles', 'templateScripts', 'scripts', 'fonts', 'images'];
gulp.task('build', gulp.series('del', gulp.parallel(...devTasks)));

gulp.task('build:watch', gulp.series('build', 'watch'));


function ifDevRun(cb, params = []) {
    return gutil.env.env !== 'production'
        ? gutil.noop()
        : cb(...params);
}

function ifProdRun(cb, params = []) {
    return gutil.env.env === 'production'
        ? cb(...params)
        : gutil.noop();
}