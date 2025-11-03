---
title: "Training Character LoRAs for Stable Diffusion"
pubDate: 2025-01-01
description: "A step-by-step guide to training character LoRAs for Stable Diffusion models using a bootstrap approach"
author: "Manut"
tags: ["stable-diffusion", "ai", "lora", "training"]
draft: false
---

![Bootstrap Method for Character LoRAs: From 4 Images to 40](/images/00001_vul.jpeg)
# Training Character LoRAs for Stable Diffusion

I never trained character LoRAs before!

## The Fucking Problem

It's very hard to train character LoRAs for Stable Diffusion models because I didn't know how to train them properly. It's very easy to train style LoRAs because you can use some auto tagger like Danbooru tags - it will tag for you automatically.

When you train styles, you make sure the model understands the concept of the image without specifying the style, so the style will go to the training token.

But on the other hand, when you try to remove some features of a character and keep only the character, it cannot create a good LoRA from character images.

## Why Character Training Sucks

Because the dataset is never complete. So you either have your own images or just really love to copy from the internet. You get like 10 images, and now you train. The result is yes, your girl can be created.

But if you move backward - from behind, from above - your character is bye bye because the dataset is not enough and not all contexts can be fixed in one image with fucking different styles and everything.

## The Bootstrap Solution

So? How to fix this? Here's my method:

### Step 1: Start with 4 Images

You can copy just 1 image from somewhere and crop it somehow into 4 pieces.

Those fucking small 4 images can't train a character LoRA, but they can train for style.

### Step 2: Create Detailed Tags

You can use existing prompts to help this. Like your character is a fucking fox ears girl. How about we add:

* 1girl, solo, fox ears, fox tail, blonde hair, yellow ears

Everything that you think your character has as tags.

### Step 3: Train Style First

Like when you train for "eiei21girl" you train this. Now "eiei21girl" is your style.

### Step 4: Bootstrap with Style LoRA

After you train from just ground up like 4 images, you need to use this fucking style to do bootstrap. Use this LoRA to create images with all the features that you created:

* 1girl, solo, fox ears, fox tail, blonde hair, yellow ears

Use this as the prompt to generate images to get more of this character. Now you can create from side, from above, from below, or something like that.

### Step 5: Expand Your Dataset

When you do this to get 16 images, you train style again. Now it's more easy to upgrade from 16 to 40.

### Step 6: Train Character LoRA

When you got 40 images, you just change back to train character images with those 40 images - fucking all about that character that you selected, edited each image by yourself.

And now you train again. You will get the best result.

## The Remaining Problem

But there's a problem with this, and I cannot find the way to fix it: it doesn't match with other styles. Look like other style LoRAs can override this character.

That's how I first created a good LoRA for character models. Maybe I'll try to look at concept backgrounds to see if we can create the best LoRA model to achieve my goal to create some game.
