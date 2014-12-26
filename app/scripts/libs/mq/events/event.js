angular.module(MQ.modules.events.label)

.factory(MQ.modules.events.event, [

	MQ.modules.utils.error,

	function(ErrorUtil) {

		function Event(name, success, data, from, isMqEvent) {
			this.name = angular.isDefined(name) ? name : 'unknow';
			this.success = !!success;

			if (this.success) {
				if (angular.isDefined(data)) {
					this.data = angular.isString(data) ? { msg: data} : data;
				} else {
					this.data = {};
				}
			} else {
				this.data = ErrorUtil.buildData(data, isMqEvent);
			}

			this.from = from;
			this.isMq = !!isMqEvent;
		}

		Event = angular.extend(Event, {

		});

		Event.prototype = angular.extend(Event.prototype, {

		});

		return Event;
	}
]);