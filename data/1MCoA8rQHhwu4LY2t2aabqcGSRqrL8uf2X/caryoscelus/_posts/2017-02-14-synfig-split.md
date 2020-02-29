---
layout: post
title:  "Semi-linked region/outline in Synfig"
date:   2017.02.14 16:06:10
categories: animation
---

Here's a short tutorial on how to get a shape in Synfig with partial outlines
linked to it. This is pretty much a workaround, but the fix might require either
a lot of major changes or a lot of pain with inelegant code.

<cut/>

<video width="640" height="360" controls>
    <source src="https://github.com/caryoscelus/synfig-demos/releases/download/split_outline/split_ed.webm" type="video/webm"/>
Bah, no video support! Are you a Lynx user, perhaps?
</video>

Basic workflow:

- Create the whole shape
- Create outline from region (you can skip this if you created outlines originally)
- Disconnect outline's vertices
- Remove unneeded vertices from it (note that unlooping at this step will make it impossible to link ending tangents, so if you need that don't unloop yet)
- Select both outline and region layers
- For each vertex origin and tangent that you need to link: draw rectangular selection around it (this selects them on both layers) and link
- Unloop outline path if needed
- Done. You can repeat from second step to make more outlines
