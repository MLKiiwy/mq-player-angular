angular.module(MQ.modules.services.label)

.constant('errors', {
	loadFailed: {
		id: 'Quizz1',
		msg: 'cannot load quizz'
	}
})

.service(MQ.modules.services.quizzLoader, [

	'$http',
	'$rootScope',
	MQ.modules.utils.error,
	MQ.modules.models.quizz,
	MQ.modules.events.event,
	'errors',

	function(
		$http,
		$rootScope,
		ErrorUtil,
		Quizz,
		Event,
		Errors) {

		this.load = function(value) {
			var self = this;

			$rootScope.$broadcast(MQ.events.loader.start);
			return $http.get(value).then(function(content) {
				var instance = Quizz.buildFromJson(content.data),
					event = new Event(MQ.events.loader.end, true, {quizz: instance}, self, true);

				$rootScope.$broadcast(MQ.events.loader.end, event);

				return instance;
			}, function(reason) {
				var error = ErrorUtil.buildData('QuizzLoader::load cannot load quizz',true);

				error.exception = reason;

				$rootScope.$broadcast(MQ.events.loader.end,
					new Event(MQ.events.loader.end, false, error, self, true));

				return ErrorUtil.buildDeferred(self, Errors.loadFailed, reason);
			});
		};
	}
]);