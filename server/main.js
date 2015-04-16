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