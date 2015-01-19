angular.module(MQ.modules.directives.label)

.directive(MQ.modules.directives.player, [

	'$http',
	'$rootScope',
	MQ.modules.models.quizz,
	MQ.modules.utils.error,
	MQ.modules.services.quizzLoader,
	MQ.modules.services.logger,

	function(
		$http,
		$rootScope,
		Quizz,
		ErrorUtil,
		quizzLoader,
		Logger) {

		// Private State of Player
		var State = {
			INIT: 'init',
			LOAD: 'load',
			START: 'start',
			GAME: 'game',
			END: 'end',
			ERROR: 'error'
		};

		var View = {};

		View.buildView = function(name) {
			var templatePath = 'views/%(directive)s/default/%(state)s.html';
			templatePath = _.string.sprintf(templatePath, {
				directive: 'player',
				state: name,
			});
			return {
				type:name,
				templateUrl: templatePath
			};
		};

		View.types = {
			error: 'error'
		};

		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'views/player/container.html',
			controller: function($scope, $attrs, $element) {
				var self = {};

				Logger.info('mqPlayer::controller()');

				self.goToState = function(newState) {

					// Exit state
					switch ($scope.state) {
						default:
						break;
					}

					$scope.state = newState;

					switch ($scope.state) {
						case State.GAME:
							$scope.question = $scope.quizz.getQuestion(0);
						break;
					}

					// Determine view
					$scope.currentView = View.buildView($scope.state);
					//$scope.$apply();
				};

				self.init = function() {

					Logger.info('mqPlayer::controller:init()', self);

					$scope.title = 'Quizz player';
					$scope.quizz = {};
					$scope.error = null;

					$scope.question = {};
					$scope.currentQuestionOptions = {};

					// Set up initial values
					//
					/*
						C'est plutot le controlleur de player qui doit indiquer son initial view
						=> determinateView

						Sachant que la vue par défault est le loading
						Les vues principales doivent etre mise en constantes quelque part

						Suivant la vue choisie, passer par le template service qui determine le template a setter

					 */

					self.goToState(State.INIT);

					self.quizzLoader = quizzLoader;

					self.attachEvents();

					self.quizzLoader.load($attrs.src);
				};

				self.setQuizz = function(quizz) {
					$scope.quizz = quizz;

					$scope.title = quizz.getLabel();
				};

				self.onError = function(err) {
					$scope.error = err;

					Logger.error(err, self);

					self.goToState(State.ERROR);
				};

				self.onStartLoadQuizz = function(e) {
					self.goToState(State.LOAD);
				};

				self.onEndLoadQuizz = function(e) {
					if (e.success) {
						self.setQuizz(e.data.quizz);
						self.goToState(State.START);
					} else {
						self.onError(e.data);
					}
				};

				self.onStartEvent = function(e) {
					self.goToState(State.GAME);
				};

				self.attachEvents = function() {

					Logger.info('mqPlayer::controller::attachEvents()');

					$rootScope.$on(MQ.events.loader.start, function(e, data) {
						self.onStartLoadQuizz(data);
					});

					$rootScope.$on(MQ.events.loader.end, function(e, data) {
						self.onEndLoadQuizz(data);
					});

					// Cet event ne devrait pas etre la, on est au level quizz
					// en gros on doit ecouter les event du quizz ... on delegue les events de questions aux questions, etc ....
					$scope.$on(MQ.events.quizz.start, function(e, data) {
						$scope.$apply(function() {
							self.onStartEvent(data);
						});
					});

					$scope.$on(MQ.events.error, function(e, data) {
						$scope.$apply(function() {
							self.onError(data.data);
						});
					});

					// Ces events provoqueront soit des determinateView (changement d'état)
				};

				self.init();

				// TODO :  Regarder si on peux deporter le controlleur dans un fichier a part ...
			},
			link: function (scope, element) {

			}
		};
	}
]);

/*

TODO : Une fois chargé on passe le quizz au "QuizzRuler"
=> C'est lui qui va determiner a quel étape du quizz on se trouve (QuizzStep ?)
=> A partir de cette étape el
 */