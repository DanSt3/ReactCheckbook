module.exports = function(grunt) {
	require("load-grunt-tasks")(grunt);
	grunt.initConfig({
		clean: ["dist", "tmp"],

		browserify: {
			options: {
				transform: [ require("grunt-react").browserify ]
			},
			files: {
				src: ["src/js/**/*.js"],
				dest: "dist/js/main.js"
			},
		},

		copy: {
     		main: {
         		files: [
           			// Copy HTML
           			{expand: true, flatten: true, src: ["src/index.html"], dest: "dist/", filter: "isFile"},
           			// Copy CSS
           			{expand: true, flatten: true, src: ["src/css/**"], dest: "dist/css", filter: "isFile"},
           			// Copy images
           			{expand: true, flatten: true, src: ["src/img/**"], dest: "dist/img", filter: "isFile"},
					// Copy fonts
					{expand: true, flatten: true, src: ["src/fonts/*.ttf"], dest: "dist/fonts", filter: "isFile"},
				]
			}
		},

	    express: {
	      all: {
	        options: {
	          port:9000,
	          hostname: 'localhost',
	          bases: ['./dist'],
	          livereload: true
	        }
	      }
	    },

	    watch: {      
	      files: ['src/**'],
	      tasks: ["clean",  "browserify", "copy"],
	      options: {
	        livereload: true,
	      },
	    }
	});

	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.registerTask("default", ["clean", "browserify", "copy"]);
  	grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.loadNpmTasks('grunt-express');

  	grunt.registerTask('server', ['express', 'watch']);
};