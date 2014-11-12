var MQ = {};

MQ.Events = {
	Actions: {
		Next: 'mq-event-action-next'
	}
};

MQ.QuizzWrapper = function(data) {
	this.data = data;
};

MQ.QuizzWrapper.prototype.toObject = function() {
	var object = {};

	object.label = angular.isDefined(this.data.label) ? this.data.label : 'Empty quizz label';
	return object;
};

angular.module('mq', [])

.directive('mqPlayer', function($http) {
	var View = {},
		viewsUrls = {
			start: 'views/player/start.html',
			question : 'views/player/question.html',
			end: 'views/player/end.html'
		};

	View.getInitialView = function() {
		return View.buildView('start');
	}

	View.buildView = function(name) {
		return {
			type:name,
			templateUrl: viewsUrls[name]
		};
	};

	return {
		restrict: 'E',
		scope: {
		},
		templateUrl: 'views/player/playerMain.html',
		controller: function($scope, $attrs, $element) {
			var self = {};

			console.log('mqPlayer::controller()');

			self.getNextViewName = function() {
				var name = '';
				switch ($scope.currentView.type) {
					case 'start':
						name = 'question';
						break;

					case 'question':
						name = 'end';
						break;

				}
				return name;
			};

			self.nextView = function() {
				console.log('mqPlayer::controller:nextView()');

				$scope.currentView = View.buildView(self.getNextViewName());
				$scope.$apply();
			};

			self.setFileContent = function(data) {
				console.log('mqPlayer::controller:setFileContent()');

				$scope.fileContent = data;

				self.init();
			}

			self.init = function() {

				console.log('mqPlayer::controller:init()');

				$scope.quizzWrapper = new MQ.QuizzWrapper($scope.fileContent);
				$scope.quizz = $scope.quizzWrapper.toObject();
			}

			$scope.currentView = View.getInitialView();

			$http.get($attrs.src).success(function(data) {
				self.setFileContent(data);
			});

			$scope.$on(MQ.Events.Actions.Next, function(e) {
				self.nextView();
			});
		},
		link: function (scope, element) {

		}
	};
})

.directive('mqPanel', function() {
	return {
		restrict: 'A',
		scope: {},
		controller: function($scope, $attrs, $element) {

		},
		link: function (scope, element) {

		}
	};
})

.directive('mqNext', function() {
	return {
		restrict: 'A',
		scope: {},
		controller: function($scope, $attrs, $element) {
			$element.on('click', function() {
				$scope.$emit(MQ.Events.Actions.Next);
			})
		},
		link: function (scope, element) {

		}
	};
});