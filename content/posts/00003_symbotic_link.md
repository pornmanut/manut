---
title: "Symbolic link in Linux and Windows"
date: "2024-05-11"
description: "How to create symbolic links in Linux and Windows"
author: ["Vanilas", "GitHub Copilot"]
tags: ["Python", "Ubuntu", "Window"]
draft: false
cover:
  image: images/00003_symbolic_link.jpeg
  caption: "Image created by AI through stable diffusion"
---

## Dual Booting Windows and Linux: Sharing AI Models

I've been using both Windows and Linux for a long time, with a dual boot system that includes Windows 10 and Ubuntu 22.04. I use ComfyUI to generate AI images for my blog posts. Each AI model used by ComfyUI contains around 6 GB of data. To avoid having multiple copies of the same model in both operating systems, I've decided to create a shared partition and use symbolic links to point to the model in both OS.

## Creating Symbolic Links

### In Linux

In Linux, you can create symbolic links using the `ln -s` command. The syntax is as follows:

```bash
ln -s [target] [link]
```

For example, to link the model from a shared partition to the ComfyUI directory, you would use:

```bash
ln -s /mnt/shared/model /home/vanilas/ComfyUI/model
```

### In Windows

In Windows, you can create symbolic links using the `mklink` command. The syntax is as follows:

```bash
mklink /D [link] [target]
```

For example, to link the model from a shared partition to the ComfyUI directory, you would use:

```bash
mklink /D C:\Users\Vanilas\ComfyUI\model D:\shared\model
```

By using this method, you can use the same model in both operating systems without having to store multiple copies.
