angular.module(MQ.modules.models.label)

.factory(MQ.modules.models.question, [

	MQ.modules.models.base,
	MQ.modules.models.answer,
	'$http',
	MQ.modules.utils.error,

	function(
		BaseModel,
		Answer,
		$http,
		ErrorUtil
	) {

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
				var question = new Question(),
					answers = [],
					falseAnswers = [];

				if (angular.isDefined(jsonData.answers)) {
					answers = Answer.buildCollectionFromJson(jsonData.answers);
					delete jsonData.answers;
				}

				question.setAnswers(answers);

				if (angular.isDefined(jsonData.falseAnswers)) {
					falseAnswers = Answer.buildCollectionFromJson(jsonData.falseAnswers);
					delete jsonData.falseAnswers;
				}

				question.setFalseAnswers(falseAnswers);

				question.setData(jsonData);

				return question;
			}
		});

		Question.prototype = angular.extend(Question.prototype, BaseModel.prototype, {
			setAnswers: function(value) {
				if (!angular.isArray(value)) {
					throw ErrorUtil.buildData('answers must be an array', true);
				}
				this.answers = value;

				// Apply good to all data
				for (var i = 0; i < this.answers.length ; i++) {
					this.answers[i].good = true;
				}
			},
			setFalseAnswers: function(value) {
				if (!angular.isArray(value)) {
					throw ErrorUtil.buildData('falseAnswers must be an array', true);
				}
				this.falseAnswers = value;

				// Apply bad to all data
				for (var i = 0; i < this.falseAnswers.length ; i++) {
					this.falseAnswers[i].good = false;
				}
			}
		});

		return Question;
	}
]);