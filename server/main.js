Meteor.methods({
	getServerTime: function () {
		var _time = new Date();
		return _time;
	}
})

Meteor.publish('messages', function () {
	return Chat.find({})
})