app.directive('imgLoad', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      var fn = $parse(attrs.imgLoad);
      elem.on('load', function (event) {
        console.log('loaded');
        scope.$apply(function() {
          fn(scope, { $event: event });
        });
      });
    }
  };
}]);