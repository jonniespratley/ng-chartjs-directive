(function () {
  'use strict';
  angular.module('jonniespratley.angularChartjsDirective', []).directive('chartJs', function () {
    return {
      scope: {
        id: '@',
        title: '@',
        type: '@',
        width: '@',
        height: '@',
        options: '@',
        data: '@',
        ngModel: '='
      },
      restrict: 'E',
      replace: true,
      require: '?ngModel',
      template: '<div class="chartjs"><legend ng-show="{{title}}">{{title}}</legend><div class="chartjs-wrap"><canvas id="chart_{{id}}" width="{{width}}" height="{{height}}">Content</canvas></div></div>',
      link: function (scope, element, attrs, ngModel) {
        var buildChart, createChart, data, delta, id, options, resizeend, rtime, timeout, type;
        rtime = new Date(1, 1, 2000, 12, '00', '00');
        timeout = false;
        delta = 100;
        id = '#chart_' + attrs.id;
        options = attrs.options;
        type = attrs.type;
        data = [];
        if (!ngModel) {
          return;
        }
        resizeend = function () {
          if (new Date() - rtime < delta) {
            return setTimeout(resizeend, delta);
          } else {
            timeout = false;
            return buildChart();
          }
        };
        angular.element(window).resize(function () {
          rtime = new Date();
          if (timeout === false) {
            timeout = true;
            return setTimeout(resizeend, delta);
          }
        });
        createChart = function (id, type, data, options) {
          var ctx, defaults, myNewChart, wrapper;
          ctx = angular.element(id).get(0).getContext('2d');
          myNewChart = null;
          defaults = angular.extend({}, options);
          wrapper = angular.element(id).parent();
          scope.$apply(function () {
            scope.width = ctx.width = wrapper.width();
            return scope.height = ctx.height = wrapper.height();
          });
          switch (type) {
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
          }
          return myNewChart;
        };
        buildChart = function () {
          return setTimeout(function () {
            return createChart(id, type, data, options);
          }, 500);
        };
        scope.$watch('ngModel', function (newVal, oldVal) {
          ngModel.$setViewValue(newVal);
          data = ngModel.$viewValue;
          console.log('Model $viewValue:', ngModel, newVal, oldVal);
          return ngModel.$render = function () {
            return buildChart();
          };
        });
        attrs.$observe('type', function (value) {
          type = String(value).toLowerCase();
          return buildChart();
        });
        return attrs.$observe('data', function (value) {
          data = angular.fromJson(value);
          return buildChart();
        });
      }
    };
  });
}.call(this));