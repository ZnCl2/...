---
layout: post
title: "Types as propositions is intuitive"
date: 2018-08-16 17:08:32
categories: programming
---

..if you're taught in a right way about it and know a bit of math.

<cut/>

As long as you understand immutability, it isn't hard to come to conclusion that
types are "kinda like" sets. This is blatantly obvious for numeric types, but if
you heard of cartesian product and discriminated union, it also becomes clear
that data definitions in pure fp work in a similar fashion.

Then it is simply a matter of contemplating idea that sets can be defined by
membership rules, i.e. by giving a predicate (well-defined in a sense, so as to
avoid paradoxes) that should hold for all of its members (and vice verse,
everything for which it is true is member of set in question).

Now proposition and predicates are not exactly the same, of course. But they are
so similar that finding a (perhaps partial) correspondence between them is a
really easy thing to do. Predicates can be made to propositions using
quantifiers (i.e. saying "for all x P is true", or "there is x such that P is
true for it"); propositions can be made into predicates by kinda removing
quantifiers, but although that might get a bit tricky, it is quite intuitive
that it can be done at least for many of propositions.

That's really all there is to it. But then of course, there's a number of
obstacles to that path.

And another note i should perhaps stress is that this correlation is no more
than intuition (and quite incomplete at that); if you want to be mathematical
about it, you'd need to give rigorous definitions for things you work with. But
in order to get interested in such definitions in the first place, it could be
useful to get the sense of it.
