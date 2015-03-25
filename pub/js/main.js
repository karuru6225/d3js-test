//global
App = new Marionette.Application();
App.addRegions({
	body:"body"
});
Marionette.TemplateCache.prototype.loadTemplate = function(templateId){
	var prefix = location.pathname.split('/').slice(0, -1).join('/') + '/templates';
	var template = '';
	Backbone.$.ajax({
		async: false,
		url: prefix + '/' + templateId,
		success: function(res){
			template = res;
		}
	});
	return template;
};

$(function(){
	App.start();
});
