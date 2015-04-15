'use strict'

Meteor.methods({
	sendMessage: function(message) {
		if (!message) return
		Chat.insert({
			message: message,
			timestamp: new Date(),
			user: 'Glutch'
		})
	}
})