angular.module(MQ.modules.models.label)

.factory(MQ.modules.models.question, [

	MQ.modules.models.base,
	'$http',
	MQ.modules.utils.error,

	function(BaseModel, $http, ErrorUtil) {

		function Question() {
			BaseModel.apply(this, arguments);
		}

		Question = angular.extend(Question, BaseModel, {
			buildCollectionFromJson: function (jsonData) {
				var self = Question,
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
				var question = new Question();

				question.setData(jsonData);

				return question;
			}
		});

		Question.prototype = angular.extend(Question.prototype, BaseModel.prototype, {

		});

		return Question;
	}
]);