if (Posts.find().count() == 0) {
	Posts.insert({
		content: 'This is a sample post.',
		created_at: new Date()
	});
	Posts.insert({
		content: 'TGIF, lets grab some beers tonight.',
		created_at: new Date()
	});
	Posts.insert({
		content: 'I am going to watch a movie tonight. What are you going to do?',
		created_at: new Date()
	});
}