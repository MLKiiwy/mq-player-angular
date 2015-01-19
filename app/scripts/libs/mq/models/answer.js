angular.module(MQ.modules.models.label)

.factory(MQ.modules.models.answer, [

	MQ.modules.models.base,
	'$http',
	MQ.modules.utils.error,
	MQ.modules.models.rules,

	function(
		BaseModel,
		$http,
		ErrorUtil,
		Rules) {

		function Answer() {
			BaseModel.apply(this, arguments);
		}

		Answer = angular.extend(Answer, BaseModel, {
			buildCollectionFromJson: function (jsonData) {
				var self = Answer,
					collection = [];

				if (!angular.isArray(jsonData)) {
					return collection;
				}
				for (var i = 0; i < jsonData.length ; i++) {
					collection.push(self.buildFromJson(jsonData[i]));
				}
				return collection;
			},
			buildFromJson: function(jsonData) {
				var answer = new Answer();

				if (angular.isString(jsonData)) {
					jsonData = {
						label: jsonData,
						good: true,
					}
				}

				answer.setData(jsonData);

				return answer;
			}
		});

		Answer.prototype = angular.extend(Answer.prototype, BaseModel.prototype, {

		});

		return Answer;
	}
]);