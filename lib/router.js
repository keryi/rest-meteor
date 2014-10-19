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

			switch (this.request.method) {
			case 'GET':
				this.response.end(JSON.stringify(
					Posts.find().fetch()
				));
				break;
			case 'POST':
				this.response.end(JSON.stringify(
					{ 
						id: Posts.insert(this.request.body)
					}
				));
				break;
			}
		}
	});

	this.route('postApiWithParams', {
		path: 'api/v1/post/:id',
		where: 'server',
		action: function() {
			this.response.statusCode = 200;
			this.response.setHeader("Content-Type", "application/json");
			this.response.setHeader("Access-Control-Allow-Origin", "*");
			this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

			if (this.request.method == 'DELETE') {
				this.response.end(JSON.stringify(
					Posts.remove({ _id: this.params.id })
				));
			}
		}
	});

	this.route('postIndex', {
		path: '/'
	});
});