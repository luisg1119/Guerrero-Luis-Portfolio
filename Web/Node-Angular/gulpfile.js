// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var del = require('del');
var runsequence = require('run-sequence');
var inject = require('gulp-inject');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var util = require('gulp-util');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
//var browserify = require('browserify');
var streamify = require('gulp-streamify');
var ngannotate = require('gulp-ng-annotate');
var project = require('./project.json');

//Move nodejs files to dist
gulp.task('nodeProjectFiles', function(){
    //Pass in all files in the root w/ no subdirectories to dist
    return gulp.src(project.src + '/*', {dot: true}) // get .cfignore, etc.
        .pipe(gulp.dest(project.dist));
});

// move api files to dis
gulp.task('nodeApi', function() {
    return gulp.src(project.apiSrc + '/*.js')
        .pipe(gulp.dest(project.apiDest));
});

// copy nodeModules so we don't have to npm install every time after clean
// NOTE** This currently does not take long, but it may be necessary to remove this in the future
gulp.task('nodeModules', function() {
    return gulp.src(project.nodeModulesSrc)
        .pipe(gulp.dest(project.nodeModulesDest));
});

// group our node tasks
gulp.task('node', ['nodeProjectFiles', 'nodeModules', 'nodeApi']);

//Compile sass and move to dist
gulp.task('appCss', function() {
  if (project.minifyCss) {
    return gulp.src(project.cssSrc + '/**/*.scss')
      .pipe(plumber())
      .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename({ suffix : '.min' }))
        .pipe(cleancss())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(project.cssDest));
  } else {
    return gulp.src(project.cssSrc + '/**/*.scss')
      .pipe(plumber())
      .pipe(sass({ errLogToConsole : true }))
      .pipe(autoprefixer('last 10 versions'))
      .pipe(gulp.dest(project.cssDest));
  }
});

//Minify vendor css and moves to dist
gulp.task('vendCss', function() {
  if (project.minifyCss) {
    return gulp.src(project.cssVendSrc + '/**/*.css')
      .pipe(plumber())
      .pipe(concat('vendor.min.css'))
      .pipe(cleancss())
      .pipe(gulp.dest(project.cssDest));
  } else {
    return gulp.src(project.cssVendSrc + '/**/*.css')
      .pipe(plumber())
      .pipe(gulp.dest(project.cssDest));
  }
});

// html task that moves html to dist
//Uncomment section for include functionality
gulp.task('html', function() {
  return gulp.src(project.htmlSrc + '/**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest(project.htmlDest));
});

// img task to move to dist
//Maybe add minify size?
gulp.task('img', function() {
  if (project.minifyImg) {
    return gulp.src(project.imgSrc + '/**/*')
      .pipe(gulp.dest(project.imgDest));
  } else {
    return gulp.src(project.imgSrc + '/**/*')
      .pipe(gulp.dest(project.imgDest));
  }
});

//Minifies vendor/third-party JS and moves to dist
gulp.task('vendJs', function() {
  if (project.minifyJs) {
       return gulp.src([
              project.jsVendSrc + '/angular.js', // this must be first
              project.jsVendSrc + '/sheetjs.all.js', // this must be before excelPlus
              project.jsVendSrc + '/*.js' // all other files
       ])
          .pipe(plumber())
          .pipe(sourcemaps.init())
            .pipe(concat('vendor.min.js'))
            .pipe(uglify()) // minify
          .pipe(sourcemaps.write())
          .pipe(gulp.dest(project.jsDest)); // store all final files in public root
  } else {
    return gulp.src(project.jsVendSrc  + '/**/*.js')
      .pipe(gulp.dest(project.jsDest + '/vendor'));
  }
});

// compiles and minifies the angular appjs
gulp.task('appJs', function() {
    if (project.minifyJs) {
        return gulp.src([
                project.angularJsSrc + '/app.js',
                project.angularJsSrc + '/**/*.js',
                project.angularJsSrc + '/**/**/*.js'
        ])
            .pipe(plumber())
            .pipe(sourcemaps.init())
              .pipe(concat('app.min.js'))
              .pipe(ngannotate()) // make our angular code minification safe
              .pipe(uglify()) // minify
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(project.jsDest));
    } else {
        return gulp.src(project.angularJsSrc + '/**/*.js')
            .pipe(gulp.dest(project.jsDest + '/app'));
    }
});

// compile our js
gulp.task('resources', ['vendJs', 'vendCss', 'appJs', 'appCss', 'html', 'img']);

// injects the js and css dependencies into our index.html
gulp.task('inject', function() {
    if (project.minifyJs) {
        return gulp.src(project.htmlSrc + '/index.html')
            .pipe(plumber())
            .pipe(inject(gulp.src([
                project.jsDest + '/vendor.min.js', // this needs to be included before our angular code
                project.jsDest + '/app.min.js',
                project.cssDest + '/vendor.min.css',
                project.cssDest + '/app.min.css'
            ], {read: false}), {ignorePath: 'dist/public', addRootSlash: false})) // reading slows down the process
            .pipe(gulp.dest(project.htmlDest));
    } else {
        return gulp.src(project.htmlSrc + '/index.html')
            .pipe(plumber())
            .pipe(inject(gulp.src([
                project.jsDest + '/vendor/angular.js',
                project.jsDest + '/vendor/sheetjs.all.js',
                project.jsDest + '/vendor/*.js',
                project.jsDest + '/app/app.js',
                project.jsDest + '/app/**/*.js',
                project.cssDest + '/vendor.min.css',
                project.cssDest + '/app.min.css'
            ], {read: false}),
                {ignorePath: 'dist/public', addRootSlash: false}
            ))
            .pipe(gulp.dest(project.htmlDest));
    }
});

//Do not lint all js avaiable if vendor js is included many errors display
//which is clunky

//Report any Angular JS errors
gulp.task('angularLint', function() {
    return gulp.src(project.angularJsSrc + '/**/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Report any project specific JS errors
gulp.task('projectLint', function() {
    return gulp.src(project.jsProjectSrc + '/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Report any Server JS errors
gulp.task('serverLint', function() {
    return gulp.src(project.nodeJsSrc + '/**/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('nodemon', function() {
   nodemon({
       script: project.dist + '/app.js',
       ext: 'js',
       env: {
           'NODE_ENV': 'development'
       }
   })
       .on('start', ['watch'])
       .on('change', ['watch'])
       .on('restart', function() {
           console.log('Restarting server...')
       })
});

// removes the old files from the directory so that we get a clean build each time
gulp.task('clean', function(callback) {
    return del([project.dist], {force: true}, callback); // delete the directory
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(project.src + '/*', ['nodeProjectFiles']);
    gulp.watch(project.angularJsSrc + '/**/*.js', ['angularLint','appJs']);
    gulp.watch(project.jsProjectSrc + '/*.js', ['projectLint','projectJs']);
    gulp.watch(project.apiSrc + '/**/*.js', ['serverLint', 'nodeApi']);
    gulp.watch(project.jsVendSrc + '/**/*.js', ['vendJs']);
    gulp.watch(project.cssSrc + '/**/*.scss', ['appCss']);
    gulp.watch(project.cssVendSrc + '/**/*.css', ['vendCss']);
    gulp.watch(project.htmlSrc + '/**/*.html', ['html', 'inject']);
    gulp.watch(project.imgSrc + '/**/*', ['img']);
    //Uncommment if @@include is enabled
    //gulp.watch(project.viewSrcHTML).on('change', function(file) {
        //gulp.src(project.htmlSrc + '/*.html')
          //this line is used to make anything with @@ become the code that is being called
    //       .pipe(fileinclude('@@'))
    //       .pipe(gulp.dest(project.htmlDest));
    // });
});

// Default Task
gulp.task('default', function(callback) {
    runsequence( // run in this order
        'clean', // clean the directory
        'build', // go forward with the build
        'nodemon', // watch for changes
        callback
    );
});

gulp.task('build', function(callback) {
    runsequence(
        'node', // our node related tasks
        'resources', // minify our files
        'inject',
        callback
    );
});
