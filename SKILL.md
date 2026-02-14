---
name: gif
description: Search and send GIFs using Giphy API
metadata: {"openclaw": {"requires": {"env": ["GIPHY_API_KEY"]}, "primaryEnv": "GIPHY_API_KEY"}}
---

# GIF Skill

Search and send GIFs using Giphy API.

## When to Send GIFs

Send GIFs automatically when someone celebrates or reacts positively:

**Trigger phrases:**
- "nice", "well done", "gg", "good game", "congrats", "congratulations", "wp", "pog", "poggers"
- "lol", "lmao", "haha", "laugh", "rofl"
- "happy", "excited", "woohoo", "yay", "awesome", "amazing"
- "rip", "oof", "owned" (for burns)

**Rate limit:** Maximum 1 GIF per 2 minutes per channel.

## How to Search GIFs

Use curl with the Giphy API:

```bash
curl -s "https://api.giphy.com/v1/gifs/search?api_key=$GIPHY_API_KEY&q=SEARCH_TERM&limit=5&rating=pg-13"
```

Parse the JSON response to get `data[].images.fixed_height.url`.

## Example Searches

- Celebration: `curl -s "https://api.giphy.com/v1/gifs/search?api_key=$GIPHY_API_KEY&q=celebration+happy&limit=5&rating=pg-13"`
- Funny/Laugh: `curl -s "https://api.giphy.com/v1/gifs/search?api_key=$GIPHY_API_KEY&q=funny+laugh&limit=5&rating=pg-13"`
- Burn/Fail: `curl -s "https://api.giphy.com/v1/gifs/search?api_key=$GIPHY_API_KEY&q=oops+fail&limit=5&rating=pg-13"`

## Sending

Once you have a GIF URL, use the message tool to send it to the channel.
