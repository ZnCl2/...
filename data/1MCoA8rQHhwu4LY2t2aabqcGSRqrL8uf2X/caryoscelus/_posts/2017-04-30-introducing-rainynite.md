---
layout: post
title:  "Introducing RainyNite #1"
date:   2017.04.30 02:09:11
categories: animation
---

This is the first post in series about [RainyNite][rainynite] in which i'll be
trying to explain why it came to be and why it might be relevant in the age of
many free software animation tools, as well as whether you should be interested
in it or not.

<cut/>

<a href="/images/screenshots/2017.04.30-sunrise.png"><img src="/images/screenshots/2017.04.30-sunrise.png" width="640" height="360" alt="editing sunrise in RainyNite" title="editing sunrise in RainyNite (when i was actually making that animation, there were virtually no editing capabilities and i did everything in text editor)"/></a>

Goals
=====
Of course, my ultimate goal is creating a tool that i can effectively use for
creating animation. Satisfaction of users, code and other contributions, world
fame, etc are either secondary goals, or mostly means for other goals or
non-goals.

But lets be more specific: i want a 2d vector animation tool allowing fully
non-destructive editing and interpolation, which would be easy to extend.

Alternatives
============
So, you might ask, why didn't you take one of existing tools and improve it to
fit your standards? Well, i did actually. I tried to add stuff into
[Synfig](https://github.com/synfig/synfig), but ultimately came to conclusion
that its code base (with lack of active developers) is just not worth fixing it.

"But, but.. what about OpenToonz, Krita, Pencil?"

[OpenToonz](https://github.com/opentoonz/opentoonz)
---------------------------------------------------
- it's even older than Synfig, which means, among other things, that its
  codebase is even more ancient
- it was meant to suite needs of "professional animators", not developers
  (which means that obscure stuff will be polished, while core features
  obscured)
- it has obscure file format
- it's under bsd license and gpl-forking without any community support is not
  much better than writing from scratch

[Krita](https://krita.org)
--------------------------
- it's mostly raster based (though apparently there is a progress in vector
  support)
- its animation support is oriented towards frame-based
- perhaps i haven't given this idea enough thought; maybe it really is possible
  to make all the awesome stuff despite current interface being oriented on
  frame-by-frame animation

[Pencil](https://github.com/pencil2d/pencil)
--------------------------------------------
- it's also frame-based and being simple seems to be one of its goals
- it doesn't have a lot of features and the code doesn't seem to be flexible
  enough

To be continued.

[rainynite]: https://notabug.org/caryoscelus/rainynite-studio
