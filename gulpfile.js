const gulp = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const cleancss = require('gulp-clean-css')
const concat = require('gulp-concat')
const jsdoc = require('gulp-jsdoc3')

gulp.task('default', ['js', 'scss', 'minify-js', 'minify-css'])
gulp.task('watch', function(){
   gulp.watch('src/**/*', ['default'])
})

gulp.task('doc', function() {
   gulp.src(['README.md', './src/**/*.js'], {read: false})
     .pipe(jsdoc());
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
   console.log('Babeling...')
   gulp.src('src/*.js')
      .pipe(concat('scripts.js'))
      .pipe(babel({ presets: ['env'] }))
      .on('error', (error) => {
         console.log('JavaScript Error: ', error.loc);
         console.log('JavaScript Error: ', error);
         this.emit('end') })
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
