---
layout: post
title: "Symmetric Peano addition"
date: 2018-08-29 16:55:00
categories: programming
---

Given natural numbers defined by

```
data N = Z | S N
```

the typical way of defining addition is asymmetrical

```
x + Z = x
x + (S y) = S (x + y)
```

(or its opposite, recursing on first argument instead)

If you have sense for mathematical beauty, you should be annoyed by this
asymmetry. Furthermore, if you're doing proofs about addition (e.g. x+y = y+x)
or want to play with non-total lazy infinity (inf = S inf) and bottoms, this
asymmetry is going to haunt you whenever you do that.

<cut/>

But guess what, a very straightforward solution exists:

```
Z + x = x
(S x) + (S y) = S (S (x + y))
x + Z = x
```

The order here is strictly irrelevant, unless you somehow care whether `Z+x` or
`x+Z` rule applies in `Z+Z` case. In particular, in non-total lazy languages
like Haskell, you can work with infinity just fine, regardless whether it
happens to be on the left or on the right side of the cross. Same goes for
`undefined`: unlike asymmetric version, `S undefined + Z` has the same meaning
as `Z + S undefined`; you can easily check that by substituting `undefined` to
left and right sides, at desired level of nesting.

Perhaps the only disappointment (for perverts who enjoy playing with bottom) is
that SSSZ + S⊥ > SSZ ≡ ⊥ (in contrast with SSZ + SS⊥ > SSZ). But since there is no
way to pattern-match on bottom, you'll have to live with that.

I could probably accompany this post with formal type-theoretic proofs of usual
addition properties in order to bloat this trivial post even more, but i'm just
a bit too lazy to setup proof checker environment just now.
