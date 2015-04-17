Meteor.subscribe('messages')
Meteor.subscribe('users')

var M = Message.find({}, {sort: {date: 1}})

var scrollToBottom = function() {
	var chat = document.getElementById('chat')
	if (!chat) return
	chat.scrollTop = chat.scrollHeight
}

Message.find().observe({
	added: scrollToBottom
})


Template.layout.events({
	'submit #sign-in': function(e) {
		e.preventDefault()
		var fields = $(e.target).toObject()
		Meteor.loginWithPassword(fields.username, fields.password, function(err) {
			if (err) {
				alert(err.reason)
			}
		})
	},
	'submit #sign-up': function(e) {
		e.preventDefault()
		var fields = $(e.target).toObject()
		Accounts.createUser(fields, function(err) {
			if (err) {
				alert('something went wrong, check console')
				console.log(err)
			}
		})
	},
	'click .settingsButton': function() {
		$('.profile').toggleClass('settingsActive1')
		$('.settings').toggleClass('settingsActive2')
		$('.settingsButton').toggleClass('settingsButtonRotate')
		
		$('.addFriendBox').removeClass('addFriendBoxActive')
		$('.settings').removeClass('addFriendBoxActive2')
		$('.profile').removeClass('addFriendBoxActive2')
	},
	'click .addFriend': function() {
		$('.addFriendBox').toggleClass('addFriendBoxActive')
		$('.settings').toggleClass('addFriendBoxActive2')
		$('.profile').toggleClass('addFriendBoxActive2')
	}
})

// Chat
Template.submitMessage.events({
	'submit form': function(e) {
		e.preventDefault()
		Meteor.call('sendMessage', e.target.message.value, window.location.pathname.substr(2))
		scrollToBottom()
		e.target.message.value = ''
	}
})

Template.chat.helpers({
	formatDate: function(date) {
		return moment(date).format('MMMM Do')
	},
	formatTime: function(date) {
		return moment(date).format('HH:mm:ss')
	}
})

Template.sidebar.events({
	'click #log-out': function() {
		console.log(Meteor.user())
		Meteor.logout(function(err) {
			console.log(err)
		})
	}
})

Template.sidebar.helpers({
	displayUsername: function() {
		return Meteor.user().username
	},
	users: function() {
		return Meteor.users.find({})
	}
})

Template.rightbar.helpers({
	users: function() {
		return Meteor.users.find({})
	}
})

Meteor.startup(function() {
	setInterval(function() {
		Meteor.call('getServerTime', function(error, result) {
			Session.set('time', result)
		})
	}, 1000)
})

UI.registerHelper('equals', function(a, b) {
	return a === b
})