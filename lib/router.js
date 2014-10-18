Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('postApi', {
		path: 'api/v1/posts',
		where: 'server',
		action: function() {
			this.response.statusCode = 200;
			this.response.setHeader("Content-Type", "application/json");
			this.response.setHeader("Access-Control-Allow-Origin", "*");
			this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

			if (this.request.method == 'GET') {
				this.response.end(JSON.stringify(
					Posts.find().fetch()
				));
			} else if (this.request.method == 'POST') {
				this.response.end(JSON.stringify(
					Posts.insert(this.request.body)
				));
			}
		}
	});

	this.route('postIndex', {
		path: '/'
	});
});