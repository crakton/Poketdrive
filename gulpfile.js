const gulp = require("gulp");
const imagemin = require("gulp-imagemin");

gulp.task("default", () => {
  console.log("Hello Gulp!");
});

gulp.task("imagemin", () => {
  return gulp
    .src("public/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("public/images/minified"));
});