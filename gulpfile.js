const gulp = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const cleancss = require('gulp-clean-css')

gulp.task('default', ['js', 'scss', 'minify-js', 'minify-css'])
gulp.task('watch', function(){
   gulp.watch('src/**/*', ['default'])
})

gulp.task('minify-css', function(){
   gulp.src('dist/styles.css')
      .pipe(cleancss())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('dist'))
})

gulp.task('minify-js', function(){
   gulp.src('dist/scripts.js')
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('dist'))
})

gulp.task('js', function(){
   gulp.src('src/*.js')
      .pipe(babel({ presets: ['env'] }))
      .pipe(gulp.dest('dist'))
});

gulp.task('scss', function(){
   gulp.src('src/*.scss')
      .pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
      .pipe(gulp.dest('dist'))
});
