Meteor.startup(function() {
	Session.set('serverUrl', 'http://192.168.78.178:3000/')
})

Template.postIndex.helpers({
	posts: function() {
		return Posts.find();
	}
});

Template.postSubmit.events({
	'click #postCreate': function(e) {
		e.preventDefault();

		var content = $('#postContent').val();
		if (content.length > 0) {
			var dataObject = {
				data: {
					content: content,
					created_at: new Date()
				}
			};

			var url = Session.get('serverUrl') + 'api/v1/posts/';
			console.log(url);
			HTTP.post(url, dataObject, function(error, result){
				
				if (result) {
					$('#postContent').val('');
				}

				if(error) {
					console.error(error);
				}
			});
		}
	}
});