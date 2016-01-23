'use strict';

module.exports = function(grunt) {

	//Autload Grunt Module
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	// Project configuration.
	grunt.initConfig({

		project:{
			src 	: 'project_src',
			dist 	: 'project_dist',
			archive : 'project_archive',
			versionCss : 'bootstrap-3.3.6'
		},





		jshint: {
			options: {
				jshintrc: '.jshintrc',
				ignores: ['<%= project.src %>/generated/{,**/}*'],
			},
			all: [
				'GruntFile.js',
				'<%= project.src %>/app/{,**/}*.js'
			]
		},

		csslint: {
			options: {
				csslintrc: '.csslintrc',
			},
			all: [
				'<%= project.src %>/css/{,**/}*.css',
				'<%= project.src %>/generated/{,**/}*.css'
			]
		},





		/*
			Permet de mettre en cache des template html en js 
			Fonctionnement pas encore clair
			Laisser en commentaire, n'a pas d'incidence directe avec le bon fonctionnement des tâches

		 */
		// html2js:{
		// 	options: {
		// 		base: '<%= project.src %>',
		// 		module: 'templates.cache',
		// 		quoteChar: '\'',
		// 		useStrict: true,
		// 		singleModule: true,
		// 		htmlmin: {
		// 			collapseBooleanAttributes: true,
		// 			collapseWhitespace: true,
		// 			removeAttributeQuotes: true,
		// 			removeComments: true,
		// 			removeEmptyAttributes: true,
		// 			removeRedundantAttributes: true,
		// 			removeScriptTypeAttributes: true,
		// 			removeStyleLinkTypeAttributes: true
		// 		},
		// 	},
		// 	main: {
		// 		src: ['<%= project.src %>/app/views/{,**/}*.html'],
		// 		dest: '<%= project.src %>/app/views/templates.cache.js'
		// 	}
		// },








		includeSource: {
			options: {
				basePath : '<%= project.src %>',
				baseUrl  : ''
			},
			index:{
				files : {
					'<%= project.src %>/index.html': '<%= project.src %>/index.src'
				}
			}
		},





		copy:{
			index:{
				expand: true,
				cwd: '<%= project.src %>',
				src:'index.html',
				dest: '<%= project.dist %>'
			},
			asset: {
				expand: true,
				cwd: '<%= project.src %>/asset/',
				src:['**'],
				dest: '<%= project.dist %>/asset/'
			},
			bootstrapFontsSRC: {
				expand: true,
				cwd: '<%= project.src %>/vendor/<%= project.versionCss %>/dist/fonts/',
				src:['**'],
				dest: '<%= project.src %>/asset/fonts/'
			},
			bootstrapFontsDIST: {
				expand: true,
				cwd: '<%= project.src %>/vendor/<%= project.versionCss %>/dist/fonts/',
				src:['**'],
				dest: '<%= project.dist %>/asset/fonts/'
			}
		},




		useminPrepare: {
			html: '<%= project.src %>/index.html',
			options: {
				src: '<%= project.src %>',
				dest : '<%= project.dist %>'
			}
		},

			usemin: {
				html: '<%= project.dist %>/index.html',
				css: '<%= project.dist %>/{,**/}*.css'
			},

			cssmin: {
				options: {
					//delete all comments
					keepSpecialComments : 0
				}
			},

			ngAnnotate: {
				options: {
					singleQuotes: true,
				},
				dist: {
					files: [
						{
							expand: true,
							src: [
								'.tmp/concat/app.min.js'
							]
						}
					]
				}
			},

			uglify: {
				options: {
					compress: {
						drop_console: true
					}
				}
			},




		htmlmin:{
			dist:{
				options:{
					removeComments: true,
					collapseWhitespace: true,
					removeEmptyAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true
				},
				files: {
					'<%= project.dist %>/index.html': '<%= project.dist %>/index.html'
				}
			}
		},


		clean:{
			build: {
				src: [
					'<%= project.dist %>/**'
				]
			},
			tmp: {
				src: [
					'.tmp',
					'<%= project.dist %>/asset/css/{,**/}*.css',
					'!<%= project.dist %>/asset/css/{,**/}*.min.css'
				]
			}
		},

		less: {
			development: {
				files: {
					"project_src/asset/css/main.css": "project_src/asset/less/main.less"
				}
			},
			production: {
				files: {
					"project_dist/asset/css/main.css": "project_src/asset/less/main.less"
				}
			}	
		},


		task : {
			dev : [
				// 'html2js',
				'jshint',
				'csslint',
				'includeSource',
				'less:development'
			],
			dist  : [
				'clean',
				// 'html2js',
				'jshint',
				'csslint',
				'includeSource',
				'copy',
				'less:production',

				'useminPrepare',
					'usemin',
					'concat',
					'cssmin',
					'ngAnnotate',
					'uglify',

				'htmlmin',
				'clean:tmp'

			]
		},

		watchOptionFiles: {
			dev: [
					'<%= project.src %>/{,**/}*',
					'!<%= project.src %>/index.html',
					'!<%= project.src %>/generated/{,**/}*',
					'!<%= project.src %>/vendor/{,**/}*',
				],
		},

		watch: {
			dev: {
				files   : '<%= watchOptionFiles.dev %>',
				tasks   : '<%= task.dev %>',
				options : {
					livereload: true
				},
			},
			dist: {
				files   : '<%= watchOptionFiles.dev %>',
				tasks   : '<%= task.dist %>',
				options : {
					livereload: true
				}
			}
		},

	});

	// call DEV task
	grunt.registerTask('dev', function(){
  		grunt.task.run(grunt.config.get('task').dev);
	});

	grunt.registerTask('wdev', function(){
  		grunt.task.run(grunt.config.get('task').dev);
  		grunt.task.run(['watch:dev']);
	});


	//call DIST task
	grunt.registerTask('dist', function(){
  		grunt.task.run(grunt.config.get('task').dist);
	});

	grunt.registerTask('wdist', function(){
  		grunt.task.run(grunt.config.get('task').dist);
  		grunt.task.run(['watch:dist']);
	});
};
