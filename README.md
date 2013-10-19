
# ng-chartjs-directive
This is a AngularJS directive for using the ChartJS library.



## Getting Started
This is how to use this directive in your application

#### 1. Download or Use CDN

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/jonniespratley/ng-chartjs-directive/master/dist/ng-chartjs-directive.min.js
[max]: https://raw.github.com/jonniespratley/ng-chartjs-directive/master/dist/ng-chartjs-directive.js


In your web page:

	<script src="angular.js"></script>
	<script src="dist/ng-chartjs-directive.min.js"></script>
	
	
#### 2. Add Dependency
In your app.js file or wherever you have declared your applications module add `jonniespratley.ngChartjsDirective` to your dependencies.

	var app = angular.module('app', [
		'jonniespratley.ngChartjsDirective'
	]);

#### 4. Add Markup
Now add the following markup to your view.

	<chart-js id="chart1"
			width="{{chart.width}}"
			height="{{chart.height}}"
			title="{{chart.title}}"
			type="{{chart.type}}"
			data="{{chart.data}}"
			options="{{chart.options}}"
			ng-model="chart.data">
			
			<!-- Fallback -->
			You do not support the HTML5 Canvas.
			
	</chart-js>


#### 5. Add Configuration
Now add the configuration inside of your controller.

	$scope.chart = {
	  "title": "Chart",
	  "type": "Bar",
	  "height": 300,
	  "width": 600,
	  "options": {
	    "chart": {
	      "events": {}
	    }
	  },
	  "data": {
	    "labels": [
	      "January",
	      "February",
	      "March",
	      "April",
	      "May",
	      "June",
	      "July"
	    ],
	    "datasets": [
	      {
	        "fillColor": "rgba(220,220,220,0.5)",
	        "strokeColor": "rgba(220,220,220,1)",
	        "pointColor": "rgba(220,220,220,1)",
	        "pointStrokeColor": "#fff",
	        "data": [
	          65,
	          59,
	          90,
	          81,
	          56,
	          55,
	          40
	        ]
	      },
	      {
	        "fillColor": "rgba(151,187,205,0.5)",
	        "strokeColor": "rgba(151,187,205,1)",
	        "pointColor": "rgba(151,187,205,1)",
	        "pointStrokeColor": "#fff",
	        "data": [
	          28,
	          48,
	          40,
	          19,
	          96,
	          27,
	          100
	        ]
	      }
	    ]
	  }
	}




## Documentation
_(Coming soon)_


## Examples
To view a example, open the `index.html` file located in the `www` directory in a web browser.

![image](https://dl.dropboxusercontent.com/u/26906414/cdn/img/ng-chartjs-directive-screenshot.png)

