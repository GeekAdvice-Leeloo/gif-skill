---
name: gif
description: Search and send GIFs using Giphy API
metadata: {"openclaw": {"requires": {"env": ["GIPHY_API_KEY"]}}}
---

# GIF Skill

Search and send GIFs using Giphy API, and respond to GIFs with matching reactions.

## When to Send GIFs

### 1. React to GIFs
When someone posts a GIF in the channel, respond with a matching GIF that fits the vibe. Look at what they posted - if it's funny, send a funny GIF back. If it's cool/dramatic, match that energy.

Detect GIFs by looking for Discord embeds from giphy.com or tenor.com.

### 2. Celebrate
Send GIFs when someone uses celebration words:
- "nice", "well done", "gg", "good game", "congrats", "wp", "pog"
- "lol", "lmao", "haha", "rofl"
- "happy", "excited", "woohoo", "awesome"
- "rip", "oof"

## How to Search GIFs

Use curl with the Giphy API:

```bash
curl -s "https://api.giphy.com/v1/gifs/search?api_key=$GIPHY_API_KEY&q=SEARCH_TERM&limit=5&rating=pg-13"
```

Parse JSON response - get `data[].images.fixed_height.url`.
