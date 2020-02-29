---
layout: post
title: "We're rasterizing too early"
date: 2018-12-01 02:50:00
categories: programming
---

..or the false dilemma between vector and raster graphics.

The common wisdom about representing real world data in computers is that it
gets sampled, digitized and loses information in the process. Well, there is no
workaround for that, we can only hope sample sizes get closer to Plank time and
length. By extension we tend to think that unless you're doing heavy data
analysis, it is bound to be represented by array of integers or, at best,
floats.

<cut/>

Programs typically don't work with color and sound, but with RGB24, 1280x720 or
44100Hz-16bit formats. For editing purposes one is supposed to use lossless
formats and, preferably with higher resolution than intended rendering, so that
inevitable loses won't be as noticeable.

There is of course, another common approach: vector, 3d or other kind of
procedural graphics, various sound synthesizers. But as the name implies, these
are mostly synthetic in their nature.

Finally, there is of course "delayed computation" paradigm, making editing
process almost non-destructive. These may even employ some optimizations on how
to apply raster operations, but otherwise they still work with the same data
array paradigm.

For a long time i was embracing two latter approaches and i still like them. But
recently, while thinking how to represent pictures in functional programming
paradigm and reading about arbitrary precision reals, i finally realized that we
don't have to lie. Yes, we can have a type for precise colors and sounds. More
precise than in life, actually.

```
WaveLength : {ℝ : Set} → Set
WaveLength {ℝ} = ℝ

Energy : {ℝ : Set} → Set
Energy {ℝ} = ℝ

SpectralColor : {ℝ : Set} → Set
SpectralColor = WaveLength → Energy
```

(that's not pseudocode, that's Agda)

Yes, it's just that simple: color is just a mapping of wavelength to energy; if
we know energy (can be replaced with intensity, if desired) level of every
wavelength contributing to final result, that's all (and in many cases, too
much) we need to know about color.

If you have only ever heard about computer "integers" and floats, you might
think "what the hell? how are you going to represent this infinite amount of
information?". Well, actually it starts with ℝ already: not only it's infinite,
it's also uncountable. But before i go into a brief note about ℝ, here's a hint
about repesenting colors as functions: surely we can represent "sin", which also
(at least conceptually) has "infinite amount of information". The only problem
is that outside of functional programming, data ↔ code "equivalence" is rarely
thought about beyond scripting.

And now about real ℝ for those who didn't meet it yet. The idea is that you
forget about bytes and machine words for a while and return to cozy mathematics
(constructive, of course). There, you can find all kinds of real number
constructions: using Cauchy sequences, Dedekind cuts etc. And what a surprise,
even famously transcedental π can be represented as infinite converging
sequences, which in turn can be written in finite alphabet using finite number
of symbols form just fine. So we can serialize it. Yeah, that's how you do it:
by serializing finite algorythm, we can later retrieve as many digits as we want
(and have computer power) to.

Now i feel like this post has become a bit too mathy than i wanted, so if you
are still left wondering (you probably should, unless you know it already) about
whether resulting ℝ type is really type of reals or is it countable etc, i
suggest you read about computable numbers and reals in constructive math.

Returning to colors, i should probably note that while the above `SpectralColor`
does represnt what we typically consider to be essence of color, it's still not
exactly physical. But then that's because there is no color in physics, photons
are always waving around at the speed of light and only at our slow perception
speeds we perceive frequencies. It's somewhat similar to sound, but that one is
much closer to our time perception speed and thus we don't tend to listen to
static mix of frequencies (although i guess researching possibilities of drawing
static sound spaces which need to be actively "watched" by rotating your head
can lead to interesting results).

And finally, there are of course implementation issues. Most notably,
considering how slow quality image and sound processing is already, it can be
hard to make it fast enough. Straightforward implementation is doomed to be
slow, so my best hopes are for hybrid approach dynamically choosing
lossy-but-fast hardware implementation when it's effect on result is less than
desired ε.
