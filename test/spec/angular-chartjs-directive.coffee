"use strict"
describe 'Module: angularChartjsDirective', ->
  
  # load the controller's module
  compileDirective = (template) ->
    template = (if template then templates[template] else templates['default'])
    angular.extend scope, template.scope or templates['default'].scope
    $element = $(template.element).appendTo($sandbox)
    $element = $compile($element)(scope)
    scope.$digest()
    $element
  scope = undefined
  $sandbox = undefined
  $compile = undefined
  $timeout = undefined
  beforeEach module('jonniespratley.angularChartjsDirective')
  beforeEach inject(($injector, $rootScope, _$compile_, _$timeout_) ->
    scope = $rootScope
    $compile = _$compile_
    $timeout = _$timeout_
    $sandbox = $('<div id="sandbox"></div>').appendTo($('body'))
  )
  afterEach ->
    $sandbox.remove()
    scope.$destroy()

  templates = default:
    scope: {}
    element: '<div my-directive></div>'

  it 'should correctly display hello world', ->
    elm = compileDirective()
    expect(elm.text()).toBe 'hello world'

