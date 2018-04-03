angular.module('app', []);





angular.module('app').controller("TriggersController", function($http){

	var triggerList = this;


	$http.get('triggers.json').then(function(res){
    	triggerList.triggers = res.data.triggers;
    	console.log(triggerList.triggers);

    });






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




});