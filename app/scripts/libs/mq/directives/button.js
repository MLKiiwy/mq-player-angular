angular.module(MQ.modules.directives.label)

.directive(MQ.modules.directives.button, [

	MQ.modules.events.event,

	function(Event) {
		return {
			restrict: 'A',
			scope: {},
			controller: function($scope, $attrs, $element) {
				var self = {
					emitEvent: function() {
						var value = $attrs[MQ.modules.directives.button];
						switch (value) {
							case 'quizz-start':
								$scope.$emit(MQ.events.quizz.start);
								break;

							default:
								$scope.$emit(
									MQ.events.error,
									new Event(
											MQ.events.error,
											false,
											'"' + value + '" is not a valid button event',
											self,
											true
										)
								);
								break;
						}
					},
					init: function() {
						$element.on('click', function() {
							self.emitEvent();
						});
					},
				};

				self.init();
			},
			link: function (scope, element) {

			}
		};
	}
]);