const { src, dest, watch, parallel, series } = require('gulp');
var browsersync     = require('browser-sync');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins         = gulpLoadPlugins();

function copy(done) {
	src(['src/index.html']).pipe(dest('build/'));
	done();
}

function templates(done) {
	src(['src/modules/**/*.html'])
	.pipe(plugins.html2js('template.js', {
		adapter: 'javascript',
		base: 'templates',
		name: 'templates'
	}))
	.pipe(dest('src')).on('end', function(){
		console.log("OK");
	});
	done();
}

function scripts(done) {
	src(['src/**/*.js', 'src/modules/**/*.js'])
	.pipe(plugins.jshint())
	.pipe(plugins.jshint.reporter('default'))
	.pipe(plugins.concat('script.js'))
	.pipe(dest('build/js'));
	done();
}

function watchFiles(done) {
  watch(['src/**/*.js', 'src/modules/**/*.js'], { events: 'all' }, series(scripts));
  watch(['src/**/*.html', 'src/modules/**/*.html'], { events: 'all' }, series(templates));
  watch(['src/index.html'], { events: 'all' }, series(copy));
  done();
}

function browserSync(done) {
	var files = ['build/index.html', 'build/js', 'build/css'];
	browsersync.init(files, {
		server: {
			baseDir: "build"
		}
	});
	done();
}

exports.default = parallel(copy, templates, scripts, browserSync, watchFiles);
exports.watch = watchFiles;
