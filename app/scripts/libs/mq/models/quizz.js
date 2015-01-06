angular.module(MQ.modules.models.label)

.factory(MQ.modules.models.quizz, [

	MQ.modules.models.base,
	MQ.modules.models.question,
	'$http',
	MQ.modules.utils.error,
	MQ.modules.models.rules,

	function(
		BaseModel,
		Questions,
		$http,
		ErrorUtil,
		Rules) {

		function Quizz() {
			BaseModel.apply(this, arguments);
		}

		Quizz = angular.extend(Quizz, BaseModel, {
			buildFromJson: function(jsonData) {
				var quizz = new Quizz(),
					questions = [],
					rules = new Rules(angular.isDefined(jsonData.rules) ? jsonData.rules : null);

				if (angular.isDefined(jsonData.data) && angular.isDefined(jsonData.data.questions)) {
					questions = Questions.buildCollectionFromJson(jsonData.data.questions);
					delete jsonData.data.questions;
				}

				quizz.setRules(rules);
				quizz.setQuestions(questions);
				quizz.setData(angular.isDefined(jsonData.data) ? jsonData.data : {});

				return quizz;
			}
		});

		Quizz.prototype = angular.extend(Quizz.prototype, BaseModel.prototype, {
			setRules: function(rules) {
				this.rules = rules;
			},
			setQuestions: function(value) {
				if (!angular.isArray(value)) {
					throw ErrorUtil.buildData('questions must be an array', true);
				}
				this.questions = value;
			},
			getQuestion: function(index) {
				if (this.questions.length <= index || index < 0) {
					throw ErrorUtil.buildData('questions[' + index + '] is not defined', true);
				}

				return this.questions[index];
			}
		});

		return Quizz;
	}
]);