'use strict'

Meteor.methods({
	sendMessage: function(message, target) {
		if (!message) return
		Message.insert({
			message: message,
			date: new Date(),
			from: Meteor.userId(),
			to: target
		})
	}
})