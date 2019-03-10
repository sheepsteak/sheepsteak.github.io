---
layout: post
published: 2013-04-04T10:48:28.946Z
title: Every Man and His Rendering Engine
---

Big changes in the web world yesterday as two new rendering engines were announced. Although one does seem bigger news than the other.

First, Mozilla and Samsung announced a new rendering engine called [Servo](http://blog.mozilla.org/blog/2013/04/03/mozilla-and-samsung-collaborate-on-next-generation-web-browser-engine/) built using Mozilla's new [Rust programming language](http://www.rust-lang.org/). It seems like it's further evidence of Samsung's push to make itself a major platform and a milestone on their way to break away from Android.

Then Google announced that they would be forking WebKit and going their own way down the multi-process architecture highway. It seems like that there is too much legacy in WebKit for them and it's holding up progress. Their new engine is called [Blink](http://blog.chromium.org/2013/04/blink-rendering-engine-for-chromium.html).

Google seems to be taking a new approach to vendor prefixes that I think will work a lot better for web developers. Instead of using prefixes such as “-webkit” or “-blink”, they'll be putting a flag in the preferences of Chrome. So the web developer can use the unprefixed CSS and when the feature hits the stable branch it will be suddenly turned on for end users.

There are some thoughts from a Google engineer [here](http://infrequently.org/2013/04/probably-wrong/) that are worth reading too.
