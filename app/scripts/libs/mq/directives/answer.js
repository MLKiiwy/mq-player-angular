angular.module(MQ.modules.directives.label)

.directive(MQ.modules.directives.answer, function() {
	return {
		restrict: 'A',
		scope: {
			answer: '='
		},
		controller: function($scope, $attrs, $element) {

		},
		link: function (scope, element) {

		}
	};
});