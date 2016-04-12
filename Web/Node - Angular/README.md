# Stealie - US

---

## Page Index
* [Libraries](#libraries)
* [NodeJS](#nodejs) (v4.4.2)
* [AngularJS](#angularjs) (v1.5.2)
* [Angular Material](#angular-material) (v1.0.7)
* [Selenium](#selenium) (v2.52)
* [Protractor](#protractor) (v3.2.2)
* [Gulp](#gulp) (3.9.1)
* Gogs (git repository)

---

## Libraries

### Node
(last updated 04/07/2016)
* [body-parser v1.15.0](https://www.npmjs.com/package/body-parser)
* [cfenv v1.0.x](https://www.npmjs.com/package/cfenv)
* [express v4.13.x](https://www.npmjs.com/package/express)
* [ldapjs v1.0.0](https://www.npmjs.com/package/ldapjs)
* [request v2.69.0](https://www.npmjs.com/package/request)

### Angular
(last updated 04/07/2016)
* [angular-animate.js v1.5.2](https://www.npmjs.com/package/angular-animate)
* [angular-aria.js v1.5.2](https://www.npmjs.com/package/angular-aria)
* [angular-material.js v1.0.7](https://www.npmjs.com/package/angular-material)
* [angular-messages.js v1.5.2](https://www.npmjs.com/package/angular-messages)
* [angular-route.js v1.5.2](https://www.npmjs.com/package/angular-route)
* [angular-sanitize.js v1.5.2](https://www.npmjs.com/package/angular-sanitize)
* angular.js v1.5.2 [[Angular Link]](https://angularjs.org/) [[NPM link]](https://www.npmjs.com/package/angular)
* [excelplus-2.3.js v2.3](http://aymkdn.github.io/ExcelPlus/)
* FileSaver.js v1.1.20160328
* [ng-file-upload-shim.js v12.0.4](https://www.npmjs.com/package/ng-file-upload)
* [ng-file-upload.js v12.0.4](https://www.npmjs.com/package/ng-file-upload)
* [sheetjs.all.js v1.0.0](http://aymkdn.github.io/ExcelPlus/)

### Gulp
(last updated 04/07/2016)
* [del.js v2.2.0](https://www.npmjs.com/package/del)
* [gulp.js v3.9.1](https://www.npmjs.com/package/gulp)
* [gulp-autoprefixer.js v3.1.0](https://www.npmjs.com/package/gulp-autoprefixer)
* [gulp-clean-css.js v2.0.4](https://www.npmjs.com/package/gulp-clean-css)
* [gulp-concat.js v2.6.0](https://www.npmjs.com/package/gulp-concat)
* [gulp-file-include.js v0.13.7](https://www.npmjs.com/package/gulp-file-include)
* [gulp-inject.js v4.0.0](https://www.npmjs.com/package/gulp-inject)
* [gulp-jshint.js v2.0.0](https://www.npmjs.com/package/gulp-jshint)
* [gulp-ng-annotate.js v2.0.0](https://www.npmjs.com/package/gulp-ng-annotate)
* [gulp-nodemon.js v2.0.6](https://www.npmjs.com/package/gulp-nodemon)
* [gulp-plumber.js v1.1.0](https://www.npmjs.com/package/gulp-plumber)
* [gulp-rename.js v1.2.2](https://www.npmjs.com/package/gulp-rename)
* [gulp-sass.js v2.2.0](https://www.npmjs.com/package/gulp-sass)
* [gulp-sourcemaps.js v1.6.0](https://www.npmjs.com/package/gulp-sourcemaps)
* [gulp-streamify.js v1.0.2](https://www.npmjs.com/package/gulp-streamify)
* [gulp-uglify.js v1.5.3](https://www.npmjs.com/package/gulp-uglify)
* [gulp-util.js v3.0.7](https://www.npmjs.com/package/gulp-util)
* [jshint.js v2.9.1](https://www.npmjs.com/package/jshint)
* [run-sequence.jsv1.1.5](https://www.npmjs.com/package/run-sequence)

---

## NodeJS
* v4.4.2 (last updated 04/07/2016)
* Only version that is supported by Bluemix, all other versions will break code

Download: https://nodejs.org/en/ (Click on LTS)

---

## AngularJS
* v1.5.2 (last updated 04/07/2016)
* Be sure to download *AngularJS 1*

Download: https://angularjs.org/

---

## Angular Material
* v1.0.7 (last updated 04/07/2016)

Documentation Link: https://material.angularjs.org/latest/

---

## Selenium
* v2.52 (last updated 04/07/2016)

Documentation Link: http://www.seleniumhq.org/

---

## Protractor
* v3.2.2 (last updated 04/07/2016)

Documentation Link: https://angular.github.io/protractor/#/

---

## Gulp
* v3.9.1 (last updated 04/07/2016)

Gulp is a task/build runner for development. The way this Gulp development
environment is set up currently allows for:
* Sass (scss)
* Minification of CSS/Sass and JS
* Linter for CSS/Sass and JS
* Minificaiton of Angular code
* Creation of maps for error logging
* File include for html (Disabled)
* Auto File Renaming
* Node.js Server Reloading
* In addition to the previous mentioned tools there are also gulp optimization
modules running to maintain and facilitate the gulp stream and limit gulp errors,
which cause gulp to need to be restarted.

Documentation Link: http://gulpjs.com/

### How to run the app

1. [Install Node.js][]
2. Install Gulp globally on your computer
    -run the following command in the CLI in your computer:
        npm install -g gulp
3. use the CLI and cd into the app directory of where the
   gulpFile.js is located
4. If this is your first time running gulp run the following command in the
   CLI to install Gulps' dependencies:
        npm install
5. cd into the src directory and run "npm install" again
6. Go back one directory to where the gulpFile.js is located
5. Run the following command in the CLI to run Gulp and start file processing to open a connection to localhost:
        gulp

[Install Node.js]: https://nodejs.org/en/download/

### File structure for Gulped files

Please note gulp will output to 'dist' a similar file structure as 'src', which will be optimized for production

    |- src ->
      |- app.js
      |- README.md
      |- api
      |- db
      |- node_modules
      |- vendor
      |- public ->
        |- index.html
        |- html ->
          |-View Folders ->
            |-Html files
        |- js ->
          |- app.js
          |- controllers
            |- Angular.js Controller Files
          |- services
            |- Angular.js Service/Factory Files
        |- resources ->
          |- images ->
            |- Image Files
          |- js ->
            |-Vendor ->
              |- Third-party JS Files
          |- scss ->
            |- app.scss
            |- stylesheet ->
              //These files have to start w/ a underscore
              |- global.scss
              |- style.scss
            |- vendor-css ->
              |- Third party CSS not Scss or Sass Files
