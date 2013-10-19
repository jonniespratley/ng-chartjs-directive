#ChartJS Directive
'use strict'

angular.module('jonniespratley.angularChartjsDirective', []).directive 'chartJs', ->
  scope:
    id: '@'
    title: '@'
    type: '@'
    width: '@'
    height: '@'
    options: '@'
    data: '@'
    ngModel: '='
  restrict: 'E'
  replace: true
  require: '?ngModel'
  template: '<div class="chartjs"><legend ng-show="{{title}}">{{title}}</legend><div class="chartjs-wrap"><canvas id="chart_{{id}}" width="{{width}}" height="{{height}}">Content</canvas></div></div>'
  link: (scope, element, attrs, ngModel) ->
    
    #Setup variables
    rtime = new Date(1, 1, 2000, 12, '00', '00')
    timeout = false
    delta = 100
    id = '#chart_' + attrs.id
    options = attrs.options
    type = attrs.type
    data = []
    
    return  unless ngModel
    
    
    #Build chart based on done resizing
    resizeend = ->
      if new Date() - rtime < delta
        setTimeout resizeend, delta
      else
        timeout = false
        buildChart()
         
    #Watch for window resize, then redraw
    angular.element(window).resize ->
      rtime = new Date()
      if timeout is false
        timeout = true
        setTimeout resizeend, delta
     
    #Create the chart method actually does the creating of the chart.
    #createChart(id, type, data, options);
    createChart = (id, type, data, options) ->
      ctx = angular.element(id).get(0).getContext('2d')
      myNewChart = null
      defaults = angular.extend({}, options)
      wrapper = angular.element(id).parent()
      
      #Set the size
      scope.$apply ->
        scope.width = ctx.width = wrapper.width()
        scope.height = ctx.height = wrapper.height()

      #Switch based on type
      switch type
        when 'line'
          myNewChart = new Chart(ctx).Line(data, defaults)
        when 'bar'
          myNewChart = new Chart(ctx).Bar(data, defaults)
        when 'doughnut'
          myNewChart = new Chart(ctx).Doughnut(data, defaults)
        when 'pie'
          myNewChart = new Chart(ctx).Pie(data, defaults)
        when 'polar'
          myNewChart = new Chart(ctx).PolarArea(data, defaults)
        when 'radar'
          myNewChart = new Chart(ctx).Radar(data, defaults)
        else
          myNewChart = new Chart(ctx).Line(data, defaults)
      myNewChart
    
    #Build the chart
    buildChart = ->
      setTimeout (->
        createChart id, type, data, options
      ), 500
    
    #Watch the model
    scope.$watch 'ngModel', (newVal, oldVal) ->
      ngModel.$setViewValue newVal
      data = ngModel.$viewValue
      console.log 'Model $viewValue:', ngModel, newVal, oldVal
      ngModel.$render = ->
        buildChart()

    #Watch the type attribute
    attrs.$observe 'type', (value) ->
      type = String(value).toLowerCase()
      buildChart()

    #Watch the data attribute
    attrs.$observe 'data', (value) ->
      data = angular.fromJson(value)
      buildChart()

