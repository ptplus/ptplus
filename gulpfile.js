var gulp = require('gulp');
var browsersync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var htmlmin = require('gulp-htmlmin');
var del = require('del');
var rename = require("gulp-rename");
var sequence = require('run-sequence');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');

var config = {
  dist: 'dist/',
  src: 'src/',

  cssin: 'src/**/*.css',
  jsin: 'src/**/*.js',
  imgin: 'src/images/**/*.{jpg,jpeg,png,gif}',
  htmlin: 'src/*.html',
  otherin: 'src/**/*.{json,xml,svg,txt,ico}',

  cssout: 'dist/css/',
  jsout: 'dist/js/',
  imgout: 'dist/images/',
  htmlout: 'dist/'
};

/* BROWSER SYNC (dev)
************************************/
gulp.task('reload', function() {
  browsersync.reload();
});


/* HTML
************************************/
gulp.task('html', function() {
  return gulp.src(config.htmlin)
    .pipe(useref())
    .pipe(gulpif( '*.css', autoprefixer({ browsers: ['last 4 versions'], grid: true }) ))
    .pipe(gulpif( '*.css', cleancss() ))
    .pipe(gulpif( '*.js', uglify() ))
    .pipe(htmlmin({
      sortAttributes: true,
      sortClassName: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(config.dist));
});

/* CSS
************************************/
gulp.task('css', function() {
  return gulp.src(config.cssin)
    // .pipe(sourcemaps.init())
    // .pipe(autoprefixer({ browsers: ['last 4 versions'], grid: true }))
    // .pipe(concat(config.cssoutname))
    // .pipe(cleancss())
    // .pipe(sourcemaps.write())
    // .pipe(gulp.dest(config.cssout))
    .pipe(browsersync.stream());
});

/* JS
************************************/
gulp.task('js', function() {
  return gulp.src(config.jsin)
    // .pipe(sourcemaps.init())
    // .pipe(concat(config.jsoutname))
    // .pipe(uglify())
    // .pipe(sourcemaps.write())
    // .pipe(gulp.dest(config.jsout));
});

/* IMAGES
************************************/
gulp.task('img', function() {
  return gulp.src(config.imgin)
    .pipe(changed(config.imgout))
    .pipe(imagemin())
    .pipe(gulp.dest(config.imgout));
});

/* Other
************************************/
gulp.task('other', function() {
  return gulp.src(config.otherin)
    .pipe(gulp.dest(config.dist));
});




/* PRODUCTION ENVIRONMENT
************************************/
// Clean
gulp.task('clean', function() {
  return del([config.dist]);
});

// Start Server
gulp.task('build', function() {
  sequence('clean', ['js', 'css', 'img', 'html', 'other']);

  browsersync({
    server: config.dist
  });
});


/* DEVELOPMENT ENVIRONMENT
************************************/
gulp.task('serve', function() {
  browsersync({
    server: config.src
  });

  gulp.watch([config.htmlin, config.jsin, config.otherin], ['reload']);
  gulp.watch(config.cssin, ['css']);
});

// Start Server
gulp.task('default', ['serve']);