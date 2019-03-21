# LangsenseJS

A pretty good utility for detecting the language of a sentence.

## How it works

### Rules

Langsense is based entirely on a set of basic rules that I found on Wikipedia.
_What?!_ I hear you scream. _No cool and complex logic that will blow my mind?_

Most language detection libraries require some form of training, meaning you
need a healthy set of example text with correct annotations up front. This can
be a pain to gather, so why can't we just apply some rules that we know?

It turns out that human language and grammar is also rule-based, so this does
actually make sense.

Langsense uses a list of basic language rules, found in `ruleset.js` , to make a
pretty good guess at which language it is.

Based on each rule, it will tally up a number of points based on each piece of
evidence found, and give you a answer based on these points.

Imagine you are in a cave. There is nobody around and no signal on your mobile
device. You come across a piece of paper with some writing on it, and you wonder
_Which language is this?_ You have only your own brain and experience to draw
upon. How would you detect which language it is?

Personally, I would start begin by looking to see which characters I can
recognise. Is there anything that looks kinda like Russian? Chinese? Any
interesting accents? This won't give us a definite answer, but it will help to
narrow down the possibilities, at least.

Next I would try to find some well-known patterns that I've seen before. Even
though I don't speak Spanish, I know that there is sometimes the occurrence of 
 `ñ` followed by `o` or `a` . I've had some basic Portuguese lessons, so I know
that there is often the sequence `nho` or `nha` at the end of some words.

Wow, already we've narrowed it down quite a lot! 

Next, from movies I know the common articles in German are `der` , `die` , and
 `das` . Can I see those anywhere? They are entire words, really.

Amazing. Even without speaking any of these languages and understanding the
grammar, I've been able to draw upon information easily found on Wikipedia to
make a _pretty decent_ guess at which language it is.

## Languages supported

While the current `ruleset.js` technicall supports a range of languages, it is
only really complete enough for English, German and Spanish right now.

It's super easy to train a new language, though.

## Training a new language

Training a new language takes only a few minutes, and you don't need to speak
the language.

Take a look inside `ruleset.js` and you'll already get a good idea of what to
do.

You can find all information you need with a few Google searches.
