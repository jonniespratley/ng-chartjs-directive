(function() {
  "use strict";
  describe('Module: angularChartjsDirective', function() {
    var $compile, $sandbox, $timeout, compileDirective, scope, templates;
    compileDirective = function(template) {
      var $element;
      template = (template ? templates[template] : templates['default']);
      angular.extend(scope, template.scope || templates['default'].scope);
      $element = $(template.element).appendTo($sandbox);
      $element = $compile($element)(scope);
      scope.$digest();
      return $element;
    };
    scope = void 0;
    $sandbox = void 0;
    $compile = void 0;
    $timeout = void 0;
    beforeEach(module('jonniespratley.angularChartjsDirective'));
    beforeEach(inject(function($injector, $rootScope, _$compile_, _$timeout_) {
      scope = $rootScope;
      $compile = _$compile_;
      $timeout = _$timeout_;
      return $sandbox = $('<div id="sandbox"></div>').appendTo($('body'));
    }));
    afterEach(function() {
      $sandbox.remove();
      return scope.$destroy();
    });
    templates = {
      "default": {
        scope: {},
        element: '<div my-directive></div>'
      }
    };
    return it('should correctly display hello world', function() {
      var elm;
      elm = compileDirective();
      return expect(elm.text()).toBe('hello world');
    });
  });

}).call(this);
