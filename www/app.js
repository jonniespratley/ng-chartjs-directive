var app = angular.module('app', ['colorpicker.module', 'jonniespratley.ngChartjsDirective']);
'use strict';
/**
 * @name - FormItem
 * @comment - This creates a form control group.
 * @usage <formitem title="Label:" type="text">[Contents]</box>
 */
app.directive('formitem', function() {
	return {
		restrict : 'E',
		replace : true,
		transclude : true,
		scope : {
			title : '@',
			name : '@',
			value : '@',
			icon : '@',
			type : '@',
			model : '@',
			help : '@',
			placeholder : '@'
		},
		link : function postLink(scope, iElement, iAttrs) {
			//console.log('postLink', scope, iElement, iAttrs);
		},
		template : '<div class="control-group">' + '<div class="control-label"><label for="{{name}}" id="{{title | lowercase}}">{{title}} </label></div>' + '<div class="controls" ng-transclude>' + '</div>' + '</div>'
	};

});

app.controller('MainCtrl', function($scope, $rootScope) {

	/**
	 * Hold default configuration options for examples.
	 */
	$scope.defaults = {
		//Bar defaults
		bar : {
			labels : ["January", "February", "March", "April", "May", "June", "July"],
			datasets : [{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : [65, 59, 90, 81, 56, 55, 40]
			}, {
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : [28, 48, 40, 19, 96, 27, 100]
			}]
		},
		//Line Defaults
		line : {},
		//Pie Defaults
		pie : {},
		//Radar Defaults
		radar : {
			labels : ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Partying", "Running"],
			datasets : [{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : [65, 59, 90, 81, 56, 55, 40]
			}, {
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : [28, 48, 40, 19, 96, 27, 100]
			}]
		},
		doughnut : {

		}
	};

	//Chart options
	$scope.chart = {
		title : 'Chart',
		type : 'Bar',
		height : 300,
		width : 600,
		options : {
			chart : {
				events : {
					selection : function(e) {
						console.log(e);
					}
				}
			}
		},
		data : null
	};

	//Set the default chart data to the selected default chart.
	$scope.chart.data = $scope.defaults[String($scope.chart.type).toLowerCase()];

	//Handle adding a item to the chartjs data set.
	$scope.Chartjs = {
		addItem : function(o) {
			$scope.$apply(function() {
				$scope.chart.data.datasets[0].data.push(obj);
			});
		}
	};

	//Just used to make the legends togglable.
	angular.element(document).ready(function() {
		angular.element('legend').bind('click', function() {
			angular.element(this).next().slideToggle();
		});
	});
});
