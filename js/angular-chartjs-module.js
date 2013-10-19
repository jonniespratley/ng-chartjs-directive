var chartJsModule = angular.module('chartjs.module', []);
chartJsModule.directive('chartjs', function () {
  return {
      restrict: 'E',
      replace: true,
      scope: {
        id: '@',
        title: '@',
        type: '@',
        width: '@',
        height: '@',
        options: '@',
        data: '@'
  		},
			template: '<div class="chartjs"><legend ng-show="{{title}}">{{title}}</legend><div class="chartjs-wrap"><canvas id="chart_{{id}}" width="{{width}}" height="{{height}}">Content</canvas></div></div>',
      link: function postLink(scope, element, attrs, ngModel) {
				
				var id = '#chart_'+attrs.id,
						options = attrs.options, 
            type = attrs.type,
            data = [];
          // watch the expression, and update the UI on change.
					attrs.$observe('type', function(value) {
            type = String(value).toLowerCase();					  
            //createChart(id, type, data, options);
            buildChart();
					});
          
          // observe changes to interpolated attribute
          attrs.$observe('data', function(value) {
            data = angular.fromJson(attrs.data);
            buildChart();
            console.log('data has changed value to ', data);
          });
          
          //Build chart based on done resizing
          var rtime = new Date(1, 1, 2000, 12,00,00);
          var timeout = false;
          var delta = 100;
          angular.element(window).resize(function() {
              rtime = new Date();
              if (timeout === false) {
                  timeout = true;
                  setTimeout(resizeend, delta);
              }
          });
          
          function resizeend() {
              if (new Date() - rtime < delta) {
                  setTimeout(resizeend, delta);
              } else {
                  timeout = false;
                  //alert('Done resizing');
                  buildChart();
              }               
          }
   
          
				
			function createChart(id, type, data, options){
					var ctx = angular.element(id).get(0).getContext("2d"), 
							myNewChart = null, 
							defaults = angular.extend({}, options);
          
          var wrapper = angular.element(id).parent();
          
            scope.$apply(function(){
              scope.width = ctx.width = wrapper.width();
              scope.height = ctx.height = wrapper.height();
            });
          
            switch(type){
              case 'line':
                myNewChart = new Chart(ctx).Line(data, defaults);
              break;
              case 'bar':
                myNewChart = new Chart(ctx).Bar(data, defaults);
              break;
              case 'doughnut':
                myNewChart = new Chart(ctx).Doughnut(data, defaults);
              break;
              case 'pie':
                myNewChart = new Chart(ctx).Pie(data, defaults);
              break;
              case 'polar':
                myNewChart = new Chart(ctx).PolarArea(data, defaults);
              break;
              case 'radar':
                myNewChart = new Chart(ctx).Radar(data, defaults);
              break;        
              default:
                myNewChart = new Chart(ctx).Line(data, defaults);
              break;
            }  
          return myNewChart;
				}
				function buildChart(){
						setTimeout(function(){
							createChart(id, type, data, options);
						}, 500);
				}
      }
    };
});
