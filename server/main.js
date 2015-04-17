Meteor.methods({
	getServerTime: function () {
		var _time = new Date();
		return _time;
	}
})

Meteor.publish('messages', function() {
	return Message.find({
		$or: [
			{from: this.userId},
			{to: this.userId}
		]
	})
})

Meteor.publish('users', function() {
	return Meteor.users.find({})
})

Accounts.validateNewUser(function(user) {
	user.nick = user.username.replace(/\s/g, '.').toLowerCase()
	return true
})

console.log('helo')