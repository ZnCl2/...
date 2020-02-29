---
layout: post
title: "Function category"
date: 2018-08-03 21:00:00
categories: programming
---

There is a long-standing tradition that talks about category theory application
to programming only mention one single category: namely, the category of types
(as objects) and functions (as morphisms) (and of course, it is widely known
that many languages do not in fact correspond to this category). But category
theory is not about single category. On the contrary, most interesting things
happen when many categories are involved.

<cut/>

So here's another (possibly useless) categoric view of functional programming: a
category for single function. It is an extremely simple category that has values
as objects and function application on values as morphisms. This might sound a
bit confusing, so here's an example:

```
0 -> 1 -> 2 -> 3 -> ...
```

This is a category for (+1) function on natural numbers. Of course, there are
also identity morphisms and composed morphisms. But since every "generating"
morphism simply denotes example of single function application, every composed
morphism will simply denote application of (+1) several times.

In fact, every morphism in such category for function f will correspond to f^n
(n >= 0) and if f's domain and codomain have different types, it will be a very
boring category with only identity (f^0) and (f^1) kind of morphisms. E.g.

```
True -> "True"
False -> "False"
```

(which denotes `show :: Bool -> String` function)

What else can we do with these class of categories? We can make functors, of
course! And unlike usual FP-categorical thinking, non-endo functors.

Specifically we can make a functor that maps category for endofunction (is this
really a term?) to monoid of repeated function application.

```
f :: a -> a   ~~~~>   _ A(f)<
                     /  ^ |  \
		  id \_/   \_/ f^1
```

The functor should be quite obvious: it maps

- all values to single object
- all ids to id
- all generating morphisms to f^1 morphism
- all composed morphism to f^n morphisms

And non-endo functions can be mapped into simple category with two objects
(domain and codomain types) and one morphism (function itself).

And, as you might've already guessed, these two categories are subcategories of
Set (or whatever analogy is used in your pl). But now we get an interesting
picture:

```
(f :: a -> a)  ~~~>  A(f)  ~~~>  Set
(g :: a -> b)  ~~~>  B(g)  ~~~>  Set
...            ~~~>  ...   ~~~>  Set
```

Here we have two collections of functors: first maps function categories (with
values & their connections) to individual type/function categories; second one
simply maps those latter categories into Set as is. So we have a collection of
categories and a family of functors which are generated quite
mechanically. Maybe we can make a proper category for that "collection" and a
single functor from it to Set? (in other words, we want and endofunctor in Cat
which would merge our categories and leave the rest as is)

Well, the simplest way of doing this would be to merge all the functions! If we
just take care to distinguish morphisms, this fairly interleaved category will
still preserve all the required information and we can have functor from it to
Set. Depending on amount of functions we want to merge, it can get quite messy,
though.

But one obvious observation would be that this category will be functionally
identical to program definition (in a total PL with proper type/function
category, of course).

Which implies that compiler can be seen as something very similar to
functor. But i guess developing that thought deserves a separate post.
