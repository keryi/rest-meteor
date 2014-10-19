Meteor.startup(function() {
	Session.set('serverUrl', 'http://192.168.78.178:3000/')
})

Template.postIndex.helpers({
	posts: function() {
		return Posts.find();
	}
});

Template.postIndex.events({
	'click .postDelete': function(e) {
		e.preventDefault();

		if (confirm('Are you sure you want to remove this post?')) {
			var postId = $(e.currentTarget).attr('postId');

			var url = Session.get('serverUrl') + 'api/v1/post/' + postId;

			alert(url);

			HTTP.del(url, {}, function(error, result){
				if(error) {
					console.error(error);
				}
			});
		}
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