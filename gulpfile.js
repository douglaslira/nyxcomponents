var gulp            = require('gulp');
var browserSync     = require('browser-sync');
var reload          = browserSync.reload;
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins         = gulpLoadPlugins();

gulp.task('browser-sync', function() {
    var files = ['build/index.html', 'build/js', 'build/css'];
    browserSync.init(files, {
        server: {
            baseDir: "build"
        }
    });
});

gulp.task('scripts', function() {
    return gulp.src(['src/**/*.js', 'src/modules/**/*.js'])
	.pipe(plugins.jshint())
	.pipe(plugins.jshint.reporter('default'))
	.pipe(plugins.concat('script.js'))
	.pipe(gulp.dest('build/js'));
});

gulp.task('templates', function(){
	gulp.src(['src/modules/**/*.html'])
	.pipe(plugins.html2js('template.js', {
		adapter: 'javascript',
		base: 'templates',
		name: 'templates'
	}))
	.pipe(gulp.dest('src')).on('end', function(){
		console.log("OK");
	});
});

gulp.task('default', ['scripts', 'templates', 'browser-sync'], function () {
    gulp.watch('src/modules/**/*.html', ['templates']);
    gulp.watch(['src/**/*.js', 'src/modules/**/*.js'], ['scripts']);
});
