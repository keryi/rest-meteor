Meteor.startup(function() {
	Session.set('serverUrl', 'http://localhost:3000/')
})

Template.postIndex.helpers({
	posts: function() {
		return Posts.find({}, { sort: { created_at: 'desc' } });
	},

	timeAgo: function(datetime) {
		var secondsDiff = Math.floor((new Date() - datetime) / 1000);
		if (secondsDiff < 60) {
			return secondsDiff + " seconds ago";
		} else if (secondsDiff >= 60 && secondsDiff <= 59 * 60) {
			return Math.floor(secondsDiff / 60) + " minutes ago";
		} else if (secondsDiff >= 3600 && secondsDiff <= 23 * 3600) {
			return Math.floor(secondsDiff / 3600) + " hours ago";
		} else {
			return datetime.toDateString();
		}
	}
});

Template.postIndex.events({
	'click .postDelete': function(e) {
		e.preventDefault();

		if (confirm('Are you sure you want to remove this post?')) {
			var postId = $(e.currentTarget).attr('postId');

			var url = Session.get('serverUrl') + 'api/v1/post/' + postId;

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
					content: content
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