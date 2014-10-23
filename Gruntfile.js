'use strict';
module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			all: {
				files: ['**/*.html', '**/*.css', '**/*.js'],
				options: { livereload: true },
			}
		},
		connect: {
			server: {
				options: {
					port: 8800
				}
			}
		},
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask("default", ["connect","watch"]);
};
