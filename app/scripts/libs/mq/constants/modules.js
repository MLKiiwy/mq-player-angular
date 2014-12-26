MQ.modules = {
	label : 'mq',
	directives: {
		label: 'mq.directives',
		players: {
			label: 'mq.directives.players',
			base: 'mqPlayer',
		},
		buttons: {
			label: 'mq.directives.buttons',
			next: 'mqNext',
		},
		panels: {
			label : 'mq.directives.panels',
			panel: 'mqPanel',
		}
	},
	models: {
		label: 'mq.models',
		base: 'mqBaseModel',
		quizz: 'mqQuizz',
	},
	constants: {
		label: 'mq.constants',
	},
	events: {
		label: 'mq.events',
		event: 'mqEvent',
	},
	utils: {
		label: 'mq.utils',
		error: 'mqErrorUtil',
	},
	services: {
		label: 'mq.services',
		quizzLoader: 'mqQuizzLoader',
		logger: 'mqLogger',
	}
}