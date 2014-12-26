angular.module(MQ.modules.utils.label)

.constant('constants', {
	unknowId: 0,
})

.factory(MQ.modules.utils.error, [

	'$http',
	'$q',
	'constants',

	function($http, $q, Const) {
		var self = {
			isMQError: function(data) {
				return data && angular.isDefined(data.isMq) ? data.isMq : false;
			},

			buildData: function(input, isMq) {
				var output;

				data = angular.isDefined(input) ? input : 'unknow';
				output = angular.isString(data) ?
					{id: Const.unknowId, msg: data} : data;

				output.isMq = isMq;

				return output;
			},

			buildDeferred: function(from, data, lastError) {
				var deferred = $q.defer();

				from = angular.isDefined(from) ? from : {};
				data = self.buildData(data);

				data.from = from;
				data.errors = [lastError];

				deferred.reject(data)

				return deferred.promise;

			},

			toString: function(value) {
				var str = '';
				if (self.isMQError(value)) {
					str += '[' + value.id + ']' + value.msg;
				} else if (angular.isString(value)) {
					str = value;
				}

				return str;
			},

			log: function(value) {
				value = ErrorUtil.toString(value);
				console.error(value);
			}
		};

		return self;
	}
]);