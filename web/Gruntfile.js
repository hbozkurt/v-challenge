
module.exports = function (grunt) {
  grunt.initConfig({
    sprite:{
      all: {
        src: './src/assets/icons/*.png',
        dest: './src/assets/images/sprites.png',
        destCss: './src/assets/css/sprites.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-spritesmith');
};