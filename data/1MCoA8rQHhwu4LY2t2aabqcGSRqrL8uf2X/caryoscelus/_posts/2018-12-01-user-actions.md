---
layout: post
title: "Rasterizing too early, PS"
date: 2018-12-01 07:14:00
categories: programming
---

Writing previous post i got too busy with colors and math, which i have been
thinking about lately, but in fact the idea came to me earlier and wasn't about
"point-like" objects like color. Instead i was thinking about the whole
~~picture~~ 2d image.

<cut/>

If you've read my previous post, you can probably already guess where this is
going. If color is a function, then surely something as complex as image should
also be a function. And indeed, that's part of it. 2d images can be represented
as functions from (possibly bounded) coordinates to color. But that's not
exactly what i wanted to tackle here.

Rather i wanted to talk about how to represent "raster" user actions (like
drawing). The most straightforward way used in raster programs is to rasterize
them immediately. The vector way is to transform cursor movement into curves,
rotations, scalings. The omniscient way, though, is to store them all as
captured and rasterize into pixels or vectorize into actions as needed.

This concept can probably be thought of as free construction on FRP. And not
surprisingly, it's already used in relation with FRP, though from what i gather,
only experimentally. And not in graphics.

If you consider how many areas of computing are about "history" (undo, vcs, dbs,
logs, backups), it can even be surprising that "don't forget anything" principle
isn't used widely. Oh, but let me stop here so that i don't go on another rant
about how all of modern computing is a total wreck.
