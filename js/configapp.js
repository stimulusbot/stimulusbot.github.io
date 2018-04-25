angular.module('app', []);

var app = angular.module('app', []);

angular.module('app').controller("ConfigController", function($http,$scope){

	var configOptions = this;

	var config = { "token":"","act_log_folder":""}


	configOptions.saveJSON = function () {
			configOptions.toJSON = '';
			configOptions.toJSON = angular.toJson(configOptions.config);
			var blob = new Blob([configOptions.toJSON], { type:"application/json;charset=utf-8;" });			
			var downloadLink = angular.element('<a></a>');
        		downloadLink.attr('href',window.URL.createObjectURL(blob));
            	downloadLink.attr('download', 'fileName.json');
			downloadLink[0].click();

	};


});