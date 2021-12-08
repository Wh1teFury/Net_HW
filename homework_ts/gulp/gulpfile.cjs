var gulp                            = require("gulp");
var browserify                      = require("browserify");
var source                          = require('vinyl-source-stream');
var tsify                           = require("tsify");
var uglify                          = require('gulp-uglify');
var sourcemaps                      = require('gulp-sourcemaps');
var buffer                          = require('vinyl-buffer');
var browserSync                     = require('browser-sync').create();
var paths = {
	html: ['../app/index.html'],
  css: ['../app/style.css']
};

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "../dist"
        },
		  online:false
    });
});

gulp.task("copy-html", function () {
	return gulp.src(paths.html)
		 .pipe(gulp.dest("../dist"));
});
gulp.task("copy-css", function () {
	return gulp.src(paths.css)
		 .pipe(gulp.dest("../dist"));
});

 
gulp.task("bundle",  function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['../app/tree.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("../dist"));
});

gulp.task('default', gulp.series('bundle', "copy-html","copy-css",'browser-sync'));
