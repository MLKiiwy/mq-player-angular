angular.module(MQ.modules.directives.players.label, [
	MQ.modules.models.label,
	MQ.modules.directives.panels.label,
	MQ.modules.directives.buttons.label,
	MQ.modules.utils.label,
	MQ.modules.events.label,
	MQ.modules.services.label
])

.directive(MQ.modules.directives.players.base, [

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
			scope: {
			},
			templateUrl: 'views/player/container.html',
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

				self.showView = function(value) {
					//TODO
				};

				self.goToState = function(newState) {
					$scope.state = newState;

					// Determine view
					$scope.currentView = View.buildView($scope.state);
				}

				self.init = function() {

					Logger.info('mqPlayer::controller:init()', self);

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

					$scope.quizz = {};
					self.quizzLoader = quizzLoader;

					self.attachEvents();

					//self.quizzLoader.load($attrs.src);
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
						$scope.quizz = e.data.quizz;
						self.goToState(State.START);
					} else {
						self.onError(e.data);
					}
				};

				self.attachEvents = function() {

					console.log('mqPlayer::controller::attachEvents()');

					$rootScope.$on(MQ.events.startLoad, function(e, data) {
						self.onStartLoadQuizz();
					});

					$rootScope.$on(MQ.events.endLoad, function(e, data) {
						self.onEndLoadQuizz(data);
					});

					// Cet event ne devrait pas etre la, on est au level quizz
					// en gros on doit ecouter les event du quizz ... on delegue les events de questions aux questions, etc ....
					$scope.$on(MQ.events.actions.next, function(e, data) {
						self.nextView();
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