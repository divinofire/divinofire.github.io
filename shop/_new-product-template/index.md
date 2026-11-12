---
# HOW TO ADD A PRODUCT
# 1. Copy this whole folder and rename the copy, lowercase words joined by hyphens,
#    e.g. shop/arduino-starter-guide/  ->  enowdivine.com/shop/arduino-starter-guide/
#    (Folders starting with "_" like this one are never published.)
# 2. Put the product pictures in the same folder.
# 3. Fill in the lines below, write the description, commit and push.
# Prices are hidden on the whole site while shop_show_prices is false in _config.yml.

layout: product
title: Product name
kind: Project files                 # small label on the card and page, e.g. Project files, Guide, Template
order: 2                            # position in the shop, 1 = first
description: "One or two sentences under the title on the product page and in link previews."
summary: "Shorter line for the product card in the shop."
buy_url: https://selar.com/your-link
buy_label: Buy on Selar             # optional, e.g. "Get it free on Selar"
price: "$0.00"                      # or "Free"
price_note: one-time · instant download
cover: cover.jpg                    # picture for the shop card and link previews (landscape, about 1200 x 750)
images:                             # gallery on the product page, first one shows first
  - picture-1.jpg
  - picture-2.jpg
image_alts:                         # short descriptions, same order as images
  - What picture 1 shows
  - What picture 2 shows
facts:                              # short lines under the buy button
  - Card, PayPal or Mobile Money
  - Download link sent by email right after payment
# notice: "**Something buyers must know.** Shown in a yellow box above the description."
# related_post: /posts/some-post/   # adds a "Read the post" box at the end
---

## What it is

Describe the product here in Markdown, like a post.

## What you get

- First thing included
- Second thing included
{: .included}
