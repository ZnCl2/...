---
layout: post
title: "Typelevel addition"
date: 2018-08-26 09:39:09
categories: programming
---

Consider the following canonical natural number addition:

```
data Nat := Z | S Nat

plus : Nat -> Nat -> Nat
plus Z y := y
plus (S x) y := S (plus x y)
```

It can be also rewritten to recourse on y instead of x, or even to return `(plus
x (S y))`. But can we make it more interesting?

<cut/>

Turns out we can if we look at it from "types as propositions" point of
view. The canonical `plus` we've just written states "if we have two nats, we
can have another one", which isn't very informative; indeed, taking either of
nats, their product or even plain 0 would also suffice this signature. Perhaps,
we need to make a stronger statement?

```
plus' : (x : Nat) -> (y : Nat) ->
  (z : Nat,
    (x = Z, z = y) |
    (x' : Nat, z' : Nat,
     x = S x',
     z = S z',
     z' = plus x' y))
```

Oh well. That was quite a long one. You may even wonder whether it's actually a
valid type. Lets take it apart.

```
plus' : (x : Nat) -> (y : Nat) ->
  (z : Nat,
```

First two lines are obvious: we're just stating inputs and assigning variables
to them. Then we return some z and scary proof about it.

```
    (x = Z, z = y) |
```

We may either return a proof that x is 0 and z is y..

```
    (x' : Nat, z' : Nat,
```

..or, that there exist x' and z' in Nat, such that..

```
     x = S x',
     z = S z',
```

and

```
     z' = plus x' y))
```

Now, for implementation. Manually written one would look somewhat like this:

```
plus' Z y := y, inl (refl Z, refl y)
plus' (S x') y :=
  let z' := (plus' x' y)
  in S z',
     inr (x', z',
       refl (S x'),
       refl (S z'),
       refl z')
```

Admittedly, this becomes more and more messy, especially without any syntax
highlighting. But it can also be easily seen that our definition is pretty
mechanical; and indeed, type of `plus'` already contains enough information to
uniquely pick out addition operation on nats.

Which means that:

- smart compiler should be able to generate function body for us

- if there is an alternative (with better performance, possibly) implementation,
smart compiler can opt to use it

Hopefully, using old good Peano arithmetic wasn't too boring of an example. The
central idea here is much more general though: **if you know what you want to get,
you can describe it in a type**.

P.S. Provided with some trivial type inference, we can actually write plus as

```
plus'' :
  (x : Nat, y : Nat) ->
  ( z : Nat
  , ( x = Z
    , z = y
    )
  | ( S x' = x
    , z' = plus'' x' y
    , z = S z'
    )
  )
```

Which looks almost like a regular function definition with pattern matching. But
this shouldn't deceive you: all these equalities are types (propositions), not
assignment operators.
