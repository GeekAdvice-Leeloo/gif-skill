---
name: gif
description: Search and send GIFs using Giphy API
metadata: {"openclaw": {"requires": {}}}
---

# GIF Skill

Search and send GIFs using Giphy API, and respond to GIFs with matching reactions.

## Configuration

Set the Giphy Api key via skill config:

```json
"skills": {
  "entries": {
    "gif": {
      "enabled": true,
      "apiKey": "YOUR_GIPHY_API_KEY"
    }
  }
}
```

Or via environment variable: `GIPHY_API_KEY`

## When to Send GIFs

### 1. React to GIFs
When someone posts a GIF (animated image) in the channel, respond with a matching GIF:

- Detect GIFs: Look for messages containing animated images (Discord embeds with .gif format or images from known GIF sources like Giphy, Tenor)
- If the message is ONLY a GIF (no text), respond with a relevant GIF
- If the message text describes the GIF, match the sentiment

### 2. Celebrate
Send GIFs automatically when someone celebrates:

**Trigger phrases:**
- "nice", "well done", "gg", "good game", "congrats", "congratulations", "wp", "pog", "poggers"
- "lol", "lmao", "haha", "laugh", "rofl"
- "happy", "excited", "woohoo", "yay", "awesome", "amazing"
- "rip", "oof", "owned" (for burns)

## How to Search GIFs

Use curl with the Giphy API (prefers apiKey from config, falls back to GIPHY_API_KEY env):

```bash
curl -s "https://api.giphy.com/v1/gifs/search?api_key=$GIPHY_API_KEY&q=SEARCH_TERM&limit=5&rating=pg-13"
```

Parse the JSON response to get `data[].images.fixed_height.url`.

## Example Searches

- React to GIF: `curl -s "https://api.giphy.com/v1/gifs/search?api_key=$GIPHY_API_KEY&q=wow+reaction&limit=5&rating=pg-13"`
- Celebration: `curl -s "https://api.giphy.com/v1/gifs/search?api_key=$GIPHY_API_KEY&q=celebration+happy&limit=5&rating=pg-13"`
- Funny/Laugh: `curl -s "https://api.giphy.com/v1/gifs/search?api_key=$GIPHY_API_KEY&q=funny+laugh&limit=5&rating=pg-13"`
- Burn/Fail: `curl -s "https://api.giphy.com/v1/gifs/search?api_key=$GIPHY_API_KEY&q=oops+fail&limit=5&rating=pg-13"`

## Sending

Once you have a GIF URL, use the message tool to send it to the channel.
