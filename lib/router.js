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

Router.route('/@:uid', function() {
	this.render('chat', {
		data: {
			ya: Message.find({
				$or: [
					{to: Meteor.userId(), from: this.params.uid},
					{to: this.params.uid, from: Meteor.userId()}
				]
			})
		}
	})
})