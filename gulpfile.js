/*  Gulp will be used for development and deployment tasks, 
such as minification of code, translating SCSS into SASS & CSS,
and reloading after a save.See the README.md for gulp commands.
*/
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass')

var reload      = browserSync.reload;

// Our objective is to make some html stubs and be able to have the browser change everytime we save.
// So the first parameter is the gulp task name. This is what we call on the command line.
// When we run gulp serve, it will fire a function that initializes browserSync and serves up
// the index.html from the base of the project.
// the gulp.watch will look for changes in the .html and the .css files.
// At this point, try running gulp serve.
// Then, with the app up, change both the index.html & the main.css files. Be sure to save.
// It doesn't work if you just change the .css and save.
// We'll add more hear later. 

gulp.task('serve', function () {
    // Serve files from the root of the project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.html").on("change", reload);
});

// compiles scss files from /scss into /css
gulp.task('sass', function() {
    return gulp.src('scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
        stream: true
    }))
})

//runs sass and serve methods, watches for changes and reloads
gulp.task('dev', ['serve', 'sass'], function() {
    gulp.watch('scss/*,scss', ['sass']);
    gulp.watch('*.html');
})