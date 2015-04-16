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

		var user = Meteor.users.findOne(Meteor.userId())
		var target = Meteor.users.findOne(target)

		user.recents = user.recents || []
		target.recents = target.recents || []

		var i = user.recents.indexOf(target._id)
		if (i > -1) {
			user.recents.splice(i, 1)
		}

		i = target.recents.indexOf(user._id)
		if (i > -1) {
			target.recents.splice(i, 1)
		}

		user.recents.push(target._id)
		target.recents.push(user._id)

		Meteor.users.update(user._id, {
			$set: {
				recents: user.recents
			}
		})

		Meteor.users.update(target._id, {
			$set: {
				recents: target.recents
			}
		})
	}
})