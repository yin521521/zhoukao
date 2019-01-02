var gulp = require("gulp");
var clean = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var webserver = require("gulp-webserver");
var sass = require("gulp-sass");
var fs = require("fs");
var path = require("path");
var url = require("url");
var concat = require("gulp-concat");

gulp.task("sass", function() {
    return gulp.src("./bulid/scss/style.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dist/css"))
})

gulp.task("watch", function() {
    return gulp.watch("./bulid/scss/style.scss", gulp.series("sass"))
})

gulp.task("css", function() {
    return gulp.src("./bulid/css/*.css")
        .pipe(clean())
        .pipe(gulp.dest("./dist/css"))
})
gulp.task("js", function() {
    return gulp.src("./bulid/js/*.js")
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
})
gulp.task("html", function() {
    return gulp.src("./bulid/*.html")
        .pipe(gulp.dest("./dist"))
})

gulp.task("web", function() {
    return gulp.src("./bulid")
        .pipe(webserver({
            port: 8989,
            livereload: true,
            middleware: function(req, res) {
                var pathname = url.parse(req.url).pathname;
                if (pathname == "/favicon.ico") {
                    res.end("")
                    return;
                }
                pathname = pathname == "/" ? "index.html" : pathname;
                res.end(fs.readFileSync(path.join(__dirname, "bulid", pathname)))
            }
        }))
})

gulp.task("default", gulp.series("web", "css", "js", "watch", "html"))