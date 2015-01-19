angular.module(MQ.modules.services.label)

.service(MQ.modules.services.ruler, [

	MQ.modules.utils.error,

	function(ErrorUtil) {

		this.getChoicesByQuestion = function(question, rules, options) {
			var choices = [],
				good = [],
				bad = [];

			// Take goods
			good = this.getRandomAnswers(question.answers, rules.good, options);
			bad = this.getRandomAnswers(question.falseAnswers, rules.choices - rules.good, options);

			choices = good.concat(bad);

			return choices;
		};

		this.getRandomAnswers = function (answers, num, options) {
			var result = [];

			for (var i = 0; i < num; i++) {
				result.push(answers[i]);
			}

			return result;
		};

		this.getQuestionTemplateRules = function(templateName, rules) {
			var defaultRules = {
				choices : 4,
				good: 1,
				validateOnChoice : true,
			};

			// @@todo

			return defaultRules;
		};
	}
]);