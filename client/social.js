Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/', function () {
	this.render('chat');
});

Router.route('/yes', function () {
	this.render('home');
});

Router.route('/Third', function () {
	this.render('Third');
});

Template.layout.events({
	'click .login': function (e) {
		$(e.target).addClass('swosh');
	}
});

//Chat
Template.submitMessage.events({
	'submit form': function(event){
		event.preventDefault();
		var newMessage = event.target.message.value;
		var serverTime = Session.get('time');
		//var currentUserId = Meteor.user().username;
		Chat.insert({
			message: newMessage,
			user: 'Glutch',
			timestamp: serverTime
			//createdBy: currentUserId
		})
		event.target.message.value = "";
	}
});

Template.chat.helpers({
	'messageGrab': function(){
		//var currPage = Session.get('currentPage');
		return Chat.find({user: 'Glutch'}, {sort: {timestamp: 1}});
	},
	'formatDate': function(date) {
		return moment(date).format('MMMM Do');
	},
	'formatTime': function(date) {
		return moment(date).format('HH:mm:ss');
	},
	'showUsername': function(){
		return Meteor.user().username
	},
	'currentPageFisk': function(){
		return Session.get('currentPage');
	},
	getUsername: function (user_id) {
		return Meteor.users.find({_id: user_id}).username;
	}
});

Meteor.startup(function () {
	setInterval(function () {
		Meteor.call("getServerTime", function (error, result) {
			Session.set("time", result);
		});
	}, 1000);
});