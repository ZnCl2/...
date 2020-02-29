// Load plugins
var
  gulp         = require('gulp'),
  chmod        = require('gulp-chmod'),
  less         = require('gulp-less'),
  minifycss    = require('gulp-minify-css'),
  uglify       = require('gulp-uglify'),
  rimraf       = require('gulp-rimraf'),
  concat       = require('gulp-concat'),
  notify       = require('gulp-notify'),
  cache        = require('gulp-cache');

var config = {
  // Should CSS & JS be compressed?
  minifyCss: true,
  uglifyJS: true

}

// CSS
gulp.task('css', function() {
    /*
  var stream = gulp
    .src('src/less/style.less')
    .pipe(less().on('error', notify.onError(function (error) {
      return 'Error compiling LESS: ' + error.message;
    })))
    .pipe(chmod(755))
    .pipe(gulp.dest('css'));

  if (config.minifyCss === true) {
    stream.pipe(minifycss());
  }

  return stream
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'Successfully compiled LESS' }));
    */
});

// JS
gulp.task('js', function() {
  var scripts = [
      'src/js/libs/jquery-2.2.0.min.js',
      'src/js/libs/bootstrap.min.js',
      'src/js/libs/handlebars.min.js',
      'src/js/libs/validator.min.js',
      'src/js/ZeroFrame.js',
      'src/js/Class.js',
      'src/js/User.js',
      'src/js/Product.js',
      'src/js/Category.js',
      'src/js/Order.js',
      'src/js/Menu.js',
      'src/js/Render.js',
      'src/js/Core.js',
  ];


  var stream = gulp
    .src(scripts)
    .pipe(concat('script.js'));

  if (config.uglifyJS === true) {
    stream.pipe(uglify());
  }

  return stream
    .pipe(gulp.dest('js'))
    .pipe(notify({ message: 'Successfully compiled JavaScript' }));
});

// Images
gulp.task('images', function() {
//  return gulp
//    .src('src/images/**/*')
//    .pipe(gulp.dest('images'))
//    .pipe(notify({ message: 'Successfully processed image' }));
});

// Fonts
gulp.task('fonts', function() {
//  return gulp
//    .src([
//      'bower_components/bootstrap/fonts/**/*',
//      'bower_components/font-awesome/fonts/**/*'
//    ])
//    .pipe(gulp.dest('fonts'))
//    .pipe(notify({ message: 'Successfully processed font' }));
});

// Rimraf
gulp.task('rimraf', function() {
  return gulp
    .src(['css', 'js', 'images'], {read: false})
    .pipe(rimraf());
});

// Default task
gulp.task('default', ['rimraf'], function() {
    gulp.start('css', 'js', 'images', 'fonts');
});

// Watch
gulp.task('watch', function() {

  // Watch .less files
  gulp.watch('src/less/**/*.less', ['css']);

  // Watch .js files
  gulp.watch('src/js/**/*.js', ['js']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Watch any files in , reload on change
  gulp.watch(['css/style.css', 'js/script.js', 'images/**/*', 'fonts/**/*']).on('change', function(file) {
    //server.changed(file.path);
  });

});
