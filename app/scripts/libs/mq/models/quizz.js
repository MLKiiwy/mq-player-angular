angular.module(MQ.modules.models.label)

.factory(MQ.modules.models.quizz, [

	MQ.modules.models.base,
	'$http',
	MQ.modules.utils.error,

	function(BaseModel, $http, ErrorUtil) {

		function Quizz() {
			BaseModel.apply(this, arguments);
		}

		Quizz = angular.extend(Quizz, BaseModel, {

		});

		Quizz.prototype = angular.extend(Quizz.prototype, BaseModel.prototype, {

		});

		return Quizz;
	}
]);