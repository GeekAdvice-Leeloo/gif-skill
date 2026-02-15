---
name: gif
description: Search and send GIFs using Giphy API
---

# GIF Skill

Search and send GIFs using Giphy API, and respond to GIFs with matching reactions.

## When to Send GIFs

### 1. React to GIFs
When someone posts a GIF (animated image) in the channel, respond with a matching GIF. Detect GIFs by looking for Discord embeds from giphy.com or tenor.com, or messages that are just image URLs.

### 2. Celebrate
Send GIFs when someone uses celebration trigger words:
- "nice", "well done", "gg", "good game", "congrats", "wp", "pog"
- "lol", "lmao", "haha", "rofl"
- "happy", "excited", "woohoo", "awesome", "amazing"
- "rip", "oof"

## How to Search GIFs

Use the Giphy API via curl:

```bash
curl -s "https://api.giphy.com/v1/gifs/search?api_key=$GIPHY_API_KEY&q=SEARCH_TERM&limit=5&rating=pg-13"
```

Parse the JSON response - get `data[].images.fixed_height.url`.

## Sending

Use the message tool to send the GIF URL to the channel.
