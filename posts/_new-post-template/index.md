---
# HOW TO USE THIS TEMPLATE
# 1. Copy this whole folder and rename the copy with your post's link name,
#    lowercase words joined by hyphens, e.g. posts/my-first-week-at-eth/
#    The post will live at enowdivine.com/posts/my-first-week-at-eth/
#    (Folders starting with "_" like this one are never published.)
# 2. Put your pictures in the same folder.
# 3. Fill in the lines below. Keep the quotes around the description.
# 4. Delete these comment lines if you like, write the post, commit and push.

layout: post
title: Your post title
date: 2026-12-01                 # YYYY-MM-DD, newest date shows first
description: "One or two sentences. Shown on the post cards and in WhatsApp/LinkedIn previews."
cover: cover.jpg                 # a picture in this folder; landscape works best (about 1200 x 750)
cover_alt: "What the cover picture shows"
tags: [Projects]                 # e.g. [Projects, Embedded systems], [Teaching], [Research]
# video: true                    # uncomment to show a "Video" badge on the post card
---

Start writing here. A blank line starts a new paragraph.

## A heading

Text can be **bold**, *italic*, or a [link](https://example.com).

![Short description of the picture](picture-name.jpg)
*A caption goes on the line right under the picture, in italics.*

- A bullet point
- Another one

To add a YouTube video, paste only the ID (the part after watch?v=):

{% include youtube.html id="VIDEO_ID" title="What the video shows" %}
