---
layout: post
title: "Turing completeness trap"
date: 2019-05-07 08:49:00
categories: programming
---

In the world of programming languages there's a concept of Turing tarpit: a
language that in theory can be used to express any computation — that is, a
Turing-complete (TC) language — but which is utterly unpractical when applied to
real world tasks. Numerous examples can be found: languages which were
explicitly designed to be "minimal" (brainfuck, unlambda), domain-specific
languages which became TC by accident, and even more weird systems which can
hardly be called languages at all.

Perhaps, showing any one of these languages should be enough to prove that TC is
not a *sufficient* condition for language to be suitable for general-purpose
programming. But a lot of people tend to believe that Turing completeness is a
*necessary* condition. This is not quite so, and in this post i'm going to show
why.

<cut/>

First of all, lets start with what TC means — not from a formal standpoint, but
in practice. Informally, Turing machine allows running computations which may
never finish and not only that, you can never tell whether such computation will
at some point finish or not (unless you run it and see that it does halt).

At a first glance, one may think that this ability is completely useless: after
all, why would you want something to be unpredictable as that? But there are two
usecases which seem to require that property: complex (i.e. you don't even know
whether you can find an answer) task solving with infinite codomain (so you
can't even brute-force them) and interactive applications (including servers,
which interact with other software).

Interactive applications are actually quite easy to dismiss: they can easily be
seen as always halting on finite input, if you forget specifics of time and
simply encode all events as "data + time-stamp" list. Then any useful
non-hanging interactive applications can be pure functions with input event list
as domain and output event list as codomain. This is kinda what FRP is about.

So what about the other case? On the first glance, it seems like there is little
way to prove that all useful task-solving can be expressed without TC. But on
the second glance: why would you ever want to run a computation forever? You
simply wouldn't have the time, and at some point you'd likely want to
stop. There is no practical difference between running computation for million
years and for ever. If for some reason after million years there is someone who
wants to continue with it, it suffices to save the results and continue from
that point.

And here we come to another point of view on the problem. Namely, that while
always-terminating language cannot run all TM computations directly, rich enough
language allows for TM emulation. How can this be? Any computation, be it TM or
Lambda Calculus (untyped flavour of which is equivalent model for our purposes),
proceeds in steps. Every step is, of course, terminating. Then so would be
repeating two steps. Or three. Or more; in fact, any finite number of steps
would finish in finite (and bounded) time.

To put it into types, if we cannot express

```
possibly-non-terminating : A
possibly-non-terminating = {!do some TC computation!}
```

we can still express

```
compute-n-steps-of : S → ℕ → S ⊎ A
compute-n-steps-of z n = {!do n steps of TC computation from state z ; return new state or computation result if finished!}
```

where `A` is desired type, `S` is a type of computation state, and `_⊎_` is
Agda's standard notation for what haskellists know as `Either`.

And there you have it: you can run any TC computation for any (finite) number of
steps. There is no practical reason to demand Turing completeness from a
programming language.

Oh, and by the way, after finishing this post i've entered "nobody needs turing
completeness" into search box and surely enough there was (at least) [one
result](https://news.ycombinator.com/item?id=14398615) which said what i wanted
to, though less verbose.
