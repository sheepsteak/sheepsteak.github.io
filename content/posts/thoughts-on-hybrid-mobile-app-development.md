---
intro: I’ve been doing some hybrid mobile app development using PhoneGap recently and now that I’ve completed a few applications I wanted to summarise my thoughts.
layout: post
published: 2013-12-16T18:15:34.346Z
title: Thoughts on Hybrid Mobile App Development
---

I’ve been doing some hybrid mobile app development using [PhoneGap](http://phonegap.com/) recently and now that I’ve completed a few applications I wanted to summarise my thoughts.

There’s a lot of buzzwords flying around about mobile app development, so for the sake of clarity I’m talking about using HTML, CSS and JavaScript to write an app and then using [PhoneGap](http://phonegap.com/) to wrap it in a native container for mobile platforms. The thinking behind this is that you are maximising code reuse whilst covering the important platforms. There’s always a lot of articles such as [this one at VentureBeat](http://venturebeat.com/2013/11/20/html5-vs-native-vs-hybrid-mobile-apps-3500-developers-say-all-three-please/) about how HTML5 development is the way forward.

I find it’s generally best to use some sort of JavaScript MVC framework (Backbone, Angular, etc.) to structure your app. Coming from a .NET background, where I was used to using Caliburn.Micro as an MVVM framework, I chose to use Durandal as it follows a lot of the same ideas and is by the same developer, [Rob Eisenberg](http://devlicio.us/blogs/rob_eisenberg/), who’s work I have great admiration for. I also believe Durandal is genuinely better than the alternatives.

Performance is something some people seem to refer to when discussing native versus HTML mobile apps. However, I didn’t really have many problems as I was developing a mostly static list-based UI. By making sure you use things such as CSS transitions and animations and avoid animating things through jQuery you can get good performance. On iOS you’ll want to opt-in to take advantage of native scrolling also.

Where I did find problems is in creating a UI that fits in with what the user expects for each device. There are differences to how iOS and Android work. Due to the overwhelming iOS user base within the company I was developing the app for, I went iOS first. That’s where the craziness started. I found myself reimplementing what a [UINavigationController](https://developer.apple.com/library/iOS/documentation/UIKit/Reference/UINavigationController_Class/Reference/Reference.html) would do in native iOS. It just seemed crazy to me that I was coding this when using the [storyboarding feature in Xcode](http://www.techrepublic.com/blog/software-engineer/better-code-no-time-like-the-present-to-use-xcode-storyboards/) I could do this in a few clicks of the mouse.

When moving over to Android you then have to take the Back button into consideration. There were also massive problems with the fact that Android, up [until the latest KitKat version](https://developers.google.com/chrome/mobile/docs/webview/overview), uses the old Android browser component as a WebView. This effectively means you don’t have access to the latest and greatest features that the Chrome browser provides.

In the end, it felt like to get the best out of each platform I’d need to make multiple versions of the app to cater for the differences between platforms. This would destroy the very reason developers and businesses take the HTML route in the first place. Due to time constraints and a low user base we put the Android version on hold and went ahead with an iOS version only for iPhone and iPad.

After my experiences I’m against trying to use HTML to make mobile apps more than ever. I think **if you care about your users then you should be using the best tools available to make an app for their platform**. Where I do see a good use for HTML in mobile apps is in rendering things that are hard or time-consuming to do in native code. There’s a create article over at [Smashing Magazine](http://mobile.smashingmagazine.com/2013/10/17/best-of-both-worlds-mixing-html5-native-code/) with some examples.

I’m aware of tools such as Xamarin and I have used these. I’ll post my thoughts on it another time.
