---
layout: post
title: "A small (semi-technical) note about my new site"
date: 2019-01-29 11:11:11
categories: misc
---

Last few days i was working on finalizing a few things about [my video channel
site](http://127.0.0.1:43110/1N8zibqog72CCDBDo8jrxU7C6Q8JeVND2Z) (go visit it
before it opens officially, for then i'll have to remove fun-but-distracting
background). There were a few rough edges with my infamous engine, but mostly it
was about design. Funnily enough it was design which led me to using custom,
badly written js code again. But let me start from beginning.

<cut/>

..Or so i'd like to say, but tracking beginning in my video making journey is
not something that would fit into my plans. So the beginning here is only
relative; mostly i'm going to explain reasons for using tech which i do, so the
story starts some time last autumn when i started seriously considering
available options.

Of course one reasonable solution would be to use existing tech, most likely
KopyKate or the then still promising KxoVid. I quickly decided against the
latter due to its hub design (i'm not a fan of "hubs as categories" concept) as
well as (superfluous to my taste) reliance on (promising, but not widely used)
plugin. KK has another downside: it doesn't use hubs at all, so all content is
controllable by single owner and changing design is impossible (cloning it and
using for single channel makes little sense, because then most positive sides of
using existing engines are lost).

So in the end i started considering less video-oriented options. Because really,
all additional tech you want for personal channel are notifications in 0hello
feed and possibly comments, both of which are also expected from blog
platforms. Optional features like custom player or some kind of thumbnail fancy
can be added if needed, but one can do without them: *in the end the real thing
you want is, without a shadow of a doubt, design. It is design (and design
alone!) that creates atmosphere for a site.*

As you may know by this point, i have no sympathy for (most forms of) web
development, so i was willing to make some sacrifices just to avoid touching JS
as much as possible. I was even ok with reverse comment order (which is one of
the most annoying thing about 0net sites), so i thought i'd just throw some css
on top of classical ZeroBlog and be done with it.

Well, that hope broke apart fast as soon as i made a mockup and actually tried
to bring it to life. ZeroBlog's css was huge and i don't really like "editing"
css, i rather prefer starting from blank sheet. But.. after disabling it, i
quickly realized that the css was used for more than design: hiding elements
which should really *never* be visible also relied on css. I tried fixing that
in html by means of `<template>` tag, but only broke more things instead.

I could probably learn what part of css was functionality-relevant, or how to
build coffescript and fix usage of templates, or simply indulge in editing
existing css, but i just gave up.

There was no reason to learn something that i wouldn't want to use ever again,
so i could just as well use something that i wouldn't want to use ever again,
but at least already knew how to use.

And that's about how HydeView usage grew by one. Now i'm afraid i'll have to add
tag support or something.
