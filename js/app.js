angular.module('app', []);

var app = angular.module('app', []);



angular.module('app').controller("TriggersController", function($http,$scope){

	var triggerList = this;

	$http.get('js/triggers.json').then(function(res){
    	triggerList.triggers = res.data.triggers;

    });
	
	$scope.showContent = function($fileContent){
    	
    	$scope.content = $fileContent;
    	triggerList.triggers = JSON.parse($scope.content).triggers;
	};




	triggerList.addTrigger = function(){
		triggerList.triggers.push({logMessage:triggerList.logMessage, message:triggerList.message});
	};

	triggerList.deleteSeletected = function() {
	    var oldTriggers = triggerList.triggers;
	    triggerList.triggers = [];
	    angular.forEach(oldTriggers, function(trigger) {
		    if (!trigger.seletected) triggerList.triggers.push(trigger);
	    });
	};





	triggerList.saveJSON = function () {
		triggerList.toJSON = '';
		triggerList.toJSON = angular.toJson(triggerList);
		var blob = new Blob([triggerList.toJSON], { type:"application/json;charset=utf-8;" });			
		var downloadLink = angular.element('<a></a>');
        	downloadLink.attr('href',window.URL.createObjectURL(blob));
            downloadLink.attr('download', 'fileName.json');
		downloadLink[0].click();
	};




});




app.directive('onReadFile', function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
                
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};

				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});