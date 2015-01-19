angular.module(MQ.modules.directives.label)

.directive(MQ.modules.directives.question, [

	MQ.modules.services.logger,
	MQ.modules.services.ruler,

	function(
		Logger,
		Ruler) {

		return {
			restrict: 'EA',
			scope: {
				question: '=',
				rules: '=',
				options: '='
			},
			templateUrl: 'views/player/default/questions/container.html',
			controller: function($scope, $attrs, $element) {
				var self = {};

				Logger.info('mqQuestion::controller()');

				self.initChoices = function() {
					$scope.choices = Ruler.getChoicesByQuestion(
						$scope.question,
						Ruler.getQuestionTemplateRules($scope.currentView.name, $scope.rules),
						$scope.options
					);
				};

				self.determinateTemplate = function() {
					Logger.info('mqQuestion::controller:determinateTemplate()', self);

					// @@todo
					return 'default';
				};

				self.applyTemplate = function(name) {
					$scope.currentView = {
						type: name,
						templateUrl: 'views/player/default/questions/' + name + '.html',
					};
				};

				self.init = function() {
					Logger.info('mqQuestion::controller:init()', self);

					$scope.template = self.determinateTemplate();
					self.applyTemplate($scope.template);

					self.initChoices();
				};

				self.init();
			},
			link: function (scope, element) {

			}
		};
	}
]);