angular.module(MQ.modules.models.label)

.factory(MQ.modules.models.rules, [

	MQ.modules.models.base,
	'$http',
	MQ.modules.utils.error,

	function(BaseModel, $http, ErrorUtil) {

		function Rules() {
			BaseModel.apply(this, arguments);
		}

		Rules = angular.extend(Rules, BaseModel, {
		});

		Rules.prototype = angular.extend(Rules.prototype, BaseModel.prototype, {

		});

		return Rules;
	}
]);