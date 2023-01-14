/*Dependencias 'gulp gulp-sass sass gulp-postcss autoprefixer postcss */
const { src, dest, watch, series, parallel } = require("gulp");
// css sass
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin');

//imagenes

const webp = require("gulp-webp");
const avif = require('gulp-avif');

// const squoosh = require('gulp-libsquoosh');

/* Compilar sass: 
    1.identificar el archivo
    2.compilar el archivo
    3. guerdar el .css    */

/* Tareas*/
function css(done) {
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        //.pipe(postcss([autoprefixer(), cssnano()])) // Añadimos el autoprefixer con [autoprefixer()]
        .pipe(postcss([autoprefixer()])) // Añadimos el autoprefixer con [autoprefixer()]
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
    done()
}

function img() {
    return src('src/img/**/*')
            .pipe(imagemin({optimizattionLevel: 3}))
            .pipe(dest('build/img'))
}

//VERSION WEBP
function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.jpg')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

}

function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.jpg')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
}

/*watch */
function dev() {
    watch('src/scss/**/*.scss', css)
    watch('bulid/img/**/*', img)
}

//gulp nombreTarea (llamamos a una tarea)

exports.css = css;
exports.dev = dev;
exports.img = img;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;

//Corriendo multiples tareas por default
exports.default = series(css, dev);

//series: inicia una tarea, y hasta que finaliza inicia la otra.
//parallel: inicia todas las tareas al mismo tiempo.