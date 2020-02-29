---
layout: post
title:  "Synfig vector morphing without waypoints"
date:   2017.01.30 18:30:00
categories: animation
---

Since i'm reworking Synfig time & animation subsystem, i'm getting rid of
current hard-coded & hard-to-edit interpolation via waypoints and replacing it
with lightweight valuenodes.

<cut/>

Interpolation of simple values (plain numbers, angles, times) will be done via
curves ([mostly works already, except for fancy ui and error-checking][node]).
However, that can't be applied directly to shapes, so now i'm researching how to
do it and one way is to use existing weighted average node. It is not practical
to do so at the moment (as there is no ui to automate valuenode connecting) and
it generally doesn't solve a problem of morphing shapes with different vertex
amount, but i think it might be interesting to see that morphing from two
individually editable shapes is possible even now.

Demo animation:

<video width="640" height="360" loop="1" autoplay="1" controls>
    <source src="https://github.com/caryoscelus/synfig-demos/releases/download/morphin/morphin-ani.webm" type="video/webm"/>
Bah, no video support!
</video>

Playing around with it:
<video width="640" height="360" controls>
    <source src="https://github.com/caryoscelus/synfig-demos/releases/download/morphin/morphin-fast.webm" type="video/webm"/>
Bah, no video support!
</video>

[Get .sifs][sifs] (you'll need timecurve module from [here][branch] to load
non-linear one).

[node]: https://github.com/synfig/synfig/issues/295
[sifs]: https://github.com/caryoscelus/synfig-demos/tree/master/2017.01.30-morphin
[branch]: https://github.com/caryoscelus/synfig/tree/curve_node
