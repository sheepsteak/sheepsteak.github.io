extends /main

block content
.main(role='main')
.headline
.content-container
h1.home-title Hi!
p.strap-line.push-up
| Developer from Middlesbrough, living in London. Mostly interested in iOS, Node.js and the web.

    	.content-container
    		section.clear
    			each post in posts
    				article.post-summary
    					h1.post-summary-title
    						a(href='posts/' + post.slug) #{post.title}
    					time.post-summary-date(datetime=post.published) #{post.published.toLocaleDateString("en-GB")}
