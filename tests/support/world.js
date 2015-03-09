var zombie = require('zombie'),
	WorldConstructor = function WorldConstructor(callback) {

		var world = {
			pages: {
				'player-tester' : '/',
			},
			currentUser:null,
			browser: new zombie(),

			visit: function(url, callback) {
				this.browser.visit(url, callback);
			},

			useUser: function(user) {
				this.currentUser = user;
			},

			getHost: function() {
				return 'localhost:9000';
			},

			getPage: function(pageAlias) {
				var relativeUrl = this.pages[pageAlias],
					host = this.getHost();

				return 'http://' + host + relativeUrl;
			}
		};

	callback(world);
};

exports.World = WorldConstructor;