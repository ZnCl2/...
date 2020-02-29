---
layout: post
title:  "Side note: if you can't draw poses"
date:   2014-09-28 22:45:13
categories: graphics
---

Yeah, then you should study, study, study, draw, draw, draw until you get it
right. But if you can't afford that, there are always ways around. One of them
is described below.

<cut />

    Note: this tutorial assumes you have basic skills of searching additional
    information. Not every detail is described.

So, instead of making sketches out of nothing, or using some random images as
reference or posing your drawing dummy, you can pose 3d model and use it as ref.

### Step one: [makehuman][makehuman]

Because not everyone can or wish to model from scratch just for posing.

I'm not going to go in details because interface is mostly straightforward. The
only thing you need to pay attention apart from actual modelling is exporting:
make sure bones are included in pose/animate tab and export in blender exchange
format.

<img src="/images/makehuman/makehuman.png"/>

### Step two: [blender][blender]

You may need to install makehuman import plugin which is available at
[makehuman download section][makehuman_download].

Then import the model, edit it if you want and pose. I recommend using posing
library if you are going to need multiple poses.

<img src="/images/makehuman/blender.png"/>

After you're done with posing, maybe adding something to the scene and placing
the camera, all you need is render. You may want to use ambient occlusion if you
don't want / don't need proper illumination to be on render.

<img src="/images/makehuman/render.png"/>

### Final step

Just grab your graphical editor, import rendered image and draw your sketch!

<img src="/images/makehuman/krita.png"/>

You'll still need to do the rest of the job yourself :p

<img src="/images/makehuman/krita-sketch.png"/>


[makehuman]:            http://makehuman.org/
[makehuman_download]:   http://makehuman.org/content/download.html
[blender]:              http://blender.org/
