---
name: gif
description: Search and send GIFs using Giphy API
---

# GIF Skill

Search and send GIFs using Giphy API, and respond to GIFs with matching reactions.

## When to Send GIFs

### 1. React to GIFs
When someone posts a GIF in the channel, respond with a matching GIF. Detect GIFs by looking for Discord embeds from giphy.com or tenor.com.

### 2. Celebrate
Send GIFs when someone uses celebration words:
- "nice", "well done", "gg", "good game", "congrats", "wp", "pog"
- "lol", "lmao", "haha", "rofl"
- "happy", "excited", "woohoo", "awesome"
- "rip", "oof"

## How to Search GIFs

Use curl with the Giphy API. The API key comes from skill config (apiKey) or env var GIPHY_API_KEY:

```bash
curl -s "https://api.giphy.com/v1/gifs/search?api_key=$GIPHY_API_KEY&q=SEARCH_TERM&limit=5&rating=pg-13"
```

Parse JSON response - get `data[].images.fixed_height.url`.

## Sending

Use message tool to send the GIF URL to the channel.
