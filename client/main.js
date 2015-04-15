Router.configure({
	layoutTemplate: 'layout'
})

Router.route('/', function() {
	this.render('chat')
})

Router.route('/yes', function() {
	this.render('home')
})

Router.route('/Third', function() {
	this.render('Third')
})


Meteor.subscribe('messages')


var M = Message.find({}, {sort: {timestamp: 1}})

M.observe({
	added: function() {
		var chat = $('.chat')[0]
		chat.scrollTop = chat.scrollHeight
	}
})

Template.layout.events({
	'click #login': function(e) {
		if (e.target === document.getElementById('login')) {
			e.target.classList.add('swosh')
		}
	},
	'submit #sign-up': function(e) {
		e.preventDefault()
		console.log(e.target.username.value)
		console.log(e.target.email.value)
		console.log(e.target.password.value)
	}
})

// Chat
Template.submitMessage.events({
	'submit form': function(e) {
		e.preventDefault()
		Meteor.call('sendMessage', e.target.message.value)
		e.target.message.value = ''
	}
})

Template.chat.helpers({
	messageGrab: function() {
		//var currPage = Session.get('currentPage')
		return M
	},
	formatDate: function(date) {
		return moment(date).format('MMMM Do')
	},
	formatTime: function(date) {
		return moment(date).format('HH:mm:ss')
	},
	showUsername: function() {
		return Meteor.user().username
	},
	currentPageFisk: function() {
		return Session.get('currentPage')
	},
	getUsername: function(user_id) {
		return Meteor.users.find({_id: user_id}).username
	}
})

Meteor.startup(function() {
	setInterval(function() {
		Meteor.call('getServerTime', function(error, result) {
			Session.set('time', result)
		})
	}, 1000)
})