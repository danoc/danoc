parseRSS('http://blog.danoc.me/rss', function(e) {
	var entries = e.entries;
	var m_names = new Array("Jan.", "Feb.", "Mar.",
	"Apr.", "May", "June", "July", "Aug.", "Sept.",
	"Oct.", "Nov.", "Dec.");
	
	for(var i = 0; i < 5; i++) {
		var published = new Date(entries[i].publishedDate);
		var post = '<li><h3 class="post-title"><a href="' + entries[i].link + '">' + entries[i].title + '</a><time class="post-date">'+ m_names[published.getMonth()] + ' ' + published.getDate() +'</time></h3></li>';
		$('#posts-list').append(post);
	}
});