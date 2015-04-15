Chat = new Mongo.Collection('messages');

Meteor.methods({
	getServerTime: function () {
		var _time = new Date();
		return _time;
	}
});