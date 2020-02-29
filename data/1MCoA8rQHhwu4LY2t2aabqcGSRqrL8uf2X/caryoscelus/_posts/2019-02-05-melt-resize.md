---
layout: post
title: "Moving pictures theatre &amp; melt resize script"
date: 2019-02-05 15:36:27
categories: misc
---

More than one month and two days later than planned, [moving pictures
theatre](http://127.0.0.1:43110/1N8zibqog72CCDBDo8jrxU7C6Q8JeVND2Z/) is open.
Along with it, i'm going to share a script i'm actively using for video
production in kdenlive on a blunt edge laptop.

<cut/>

As some of you might know, Kdenlive is one of the best (as rumors go anyway)
free (libre) video editing software. But like a few others, it delegates actual
video processing to melt. Well, this is just a side note so that you understand
that when i'm talking about kdenlive rendering i'm implying melt and vice verse.

The problematic point is that many melt effects (though some of them are
apparently not even directly melt-based, but supported by it anyway) use
absolute pixel (and frame, but this is less important for most of my usecases)
values. This is annoying by itself: if you were making 720p project and then
decided to go full hd, you can't easily do it if you used any of those effects.

But even if you don't do it, if you accept dirty reality where you have to
select highest resolution from the start, you may still be in trouble. The
problem is that *apparently* video processing is a very slow process (i'm not
even sure melt uses gpu); adding just a couple heavier effects can make effect
preview (beyond one frame) completely broken.

But surely there must be a solution? Like, those proxy clips, for example? Well,
indeed, proxying clips can make things a bit faster for montage. But perhaps
surprisingly it doesn't change anything for effects: they are being processed at
target resolution. *If you're using high resolution there seems to be no method
to edit videos with effects at normal speed without flushing money into render farm*

There seems to be, but.. these are free open-source projects, right? Using open
formats, right? And doesn't that look like an xml?

One (un)fortunate day i noticed all of this and decided to just write that
script. Dirty script which would scale parameters of (some) effects and
transitions, so that i could enjoy blazing speed of processing 160x90 videos and
then render at proper resolution. Resulting workflow is still worse than ideal,
because sometimes 160x90 is just too small and switching resolutions for
anything other than rendering may lead to a trouble. But in this case i prefer
something that works now.

[Here](https://notabug.org/caryoscelus/bad-scripts/src/master/melt-change-resolution.hs)
is the result of (mis)using haskell for this ungraceful task. And remember:
never try to parse xml with regular expressions at home!
