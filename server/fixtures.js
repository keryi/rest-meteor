if (Posts.find().count() == 0) {
	Posts.insert({ content: 'This is a sample post' });
	Posts.insert({ content: 'TGIF, lets grab some beers tonight' });
}