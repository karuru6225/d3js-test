requirejs.config({
	baseUrl: '/js/vendor',
	paths: {
		jquery: 'jquery-2.1.3.min.js',
		underscore: 'underscore-min.js',
		backbone: 'backbone-min.js',
	},
	shim: {
		underscore: {
			exports: '_'
		}
	}
});
