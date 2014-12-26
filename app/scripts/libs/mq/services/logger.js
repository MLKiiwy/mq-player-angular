angular.module(MQ.modules.services.label)

.constant('levels', {
	INFO:'INFO',
	ERROR: 'ERROR',
})

.service(MQ.modules.services.logger, [

	MQ.modules.utils.error,
	'levels',

	function(ErrorUtil, Levels) {

		this.info = function(value) {
			var self = this;
			self.log(value, Levels.INFO);
		},

		this.error = function(value) {
			var self = this;
			self.log(value, Levels.ERROR);
		},

		this.log = function(value, level) {
			level = angular.isDefined(level) ? level : Levels.INFO;

			if (ErrorUtil.isMQError(value)) {
				value = ErrorUtil.toString(value);
			}

			switch (level) {
				case Levels.ERROR:
					console.error(value);
					break;
				default:
					console.log(value);
					break;
			}
		}
	}
]);