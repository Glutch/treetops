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

Router.route('/@:nick', function() {
	var target = Meteor.users.findOne({nick: this.params.nick})
	this.render('chat', {
		data: {
			messages: Message.find({
				$or: [
					{to: Meteor.userId(), from: target._id},
					{to: target._id, from: Meteor.userId()}
				]
			}),
			target: target
		}
	})
})