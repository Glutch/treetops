'use strict'

Meteor.methods({
	sendMessage: function(message) {
		if (!message) return
		Message.insert({
			message: message,
			timestamp: new Date(),
			user: 'Glutch'
		})
	}
})