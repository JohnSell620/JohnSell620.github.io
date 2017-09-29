// Required Modules
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    rename = require('gulp-rename');

// Script Task
gulp.task('scripts', function() {
  gulp.src(['src/js/**/*.js', '!js/**/*.min.js'])
      .pipe(plumber())
      .pipe(concat('all.js'))
      .pipe(rename({suffix:'.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('js'))
      .pipe(reload({stream:true}));
});

// SASS Tasks
gulp.task('styles', function() {
  gulp.src('src/scss/style.scss')
      .pipe(plumber())
      .pipe(sass().on('error', sass.logError))  //alt version: .pipe(sass({outputStyle: 'compressed', includePaths: ['node_modules/susy/sass']}).on('error', sass.logError))
      .pipe(autoprefixer('last 2 versions'))
      .pipe(gulp.dest('./css/'))
      .pipe(reload({stream:true}));
});

// HTML Tasks
gulp.task('html', function() {
  gulp.src('./**/*.html')
  .pipe(reload({stream:true}));
});

// Build tasks ////////////////////////////////////////////////////
// to clear out files and folders from directory
gulp.task('build:cleanfolder', function(cb) {
  return del([
    'build/**'
  ], cb);
});

// to create build directory for all files.
gulp.task('build:copy', ['build:cleanfolder'], function() {
  return gulp.src('./**/*/')
  .pipe(gulp.dest('build/'));
});

// to remove unwanted build files
// list all files and directories here that you dont' want included
gulp.task('build:remove', ['build:copy'], function(cb) {
  del([
    'build/src/',
    'build/js/!(all.min.js)'
  ], cb);
});

gulp.task('build', ['build:copy', 'build:remove']);

////////////////////////////////////////////////////////////////////

// Browser-Sync Tasks
gulp.task('browser-sync', function() {
  browserSync({
    server:{
      baseDir: "./"
    }
  });
});

// task to run build server for testing final app
gulp.task('build:serve', function() {
  browserSync({
    server:{
      baseDir: "./build/"
    }
  });
});

// Watch Tasks
gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('./**/*.html', ['html']);
});

//Default Task
gulp.task('default', ['scripts', 'styles', 'html',
          'browser-sync', 'watch']);
