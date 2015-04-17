'use strict'

Meteor.methods({
	sendMessage: function(message, nick) {
		if (!message) return

		var target = Meteor.users.findOne({nick: nick})
		var user = Meteor.user()

		Message.insert({
			message: message,
			date: new Date(),
			from: Meteor.userId(),
			to: target._id
		})

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