angular.module(MQ.modules.directives.buttons.label)

.directive(MQ.modules.directives.buttons.next, function() {
	return {
		restrict: 'A',
		scope: {},
		controller: function($scope, $attrs, $element) {
			$element.on('click', function() {
				$scope.$emit(MQ.events.actions.next);
			})
		},
		link: function (scope, element) {

		}
	};
});