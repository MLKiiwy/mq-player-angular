angular.module(MQ.modules.directives.label)

.directive(MQ.modules.directives.question, [

	MQ.modules.services.logger,

	function(
		Logger) {

		return {
			restrict: 'EA',
			scope: {
				question: '='
			},
			templateUrl: 'views/player/default/questions/container.html',
			controller: function($scope, $attrs, $element) {
				var self = {};

				Logger.info('mqQuestion::controller()');

				self.init = function() {
					Logger.info('mqQuestion::controller:init()', self);

					$scope.currentView = {
						type: 'default',
						templateUrl: 'views/player/default/questions/default.html',
					};
				};

				self.init();
			},
			link: function (scope, element) {

			}
		};
	}
]);