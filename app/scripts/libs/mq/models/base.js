angular.module(MQ.modules.models.label)

.factory(MQ.modules.models.base, function() {

	function BaseModel(data) {
		this.setData(BaseModel.defaultData);
		if (angular.isDefined(data)) {
			this.setData(data);
		}
	}

	BaseModel = angular.extend(BaseModel, {
		defaultData: {
			label: "Default label"
		}
	});

	BaseModel.prototype = angular.extend(BaseModel.prototype, {
		setData: function(data) {
			angular.extend(this, bookData);
		},
	});

	return BaseModel;
});