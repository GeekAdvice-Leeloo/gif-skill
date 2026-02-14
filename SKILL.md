---
name: gif
description: Search and send GIFs using Giphy API
---

# GIF Skill

Search and send GIFs using Giphy API.

## Setup

Get a Giphy API key from https://developers.giphy.com/dashboard

Set the environment variable `GIPHY_API_KEY` in your Docker `.env` file.

## How to Search GIFs

When a user asks for a GIF, use exec to call the Giphy API:

```bash
curl -s "https://api.giphy.com/v1/gifs/search?api_key=$GIPHY_API_KEY&q=SEARCH_TERM&limit=5&rating=pg-13"
```

Then extract the `url` from the first result in the `images.fixed_height` object.

## Examples

Search for "funny cat":
```bash
curl -s "https://api.giphy.com/v1/gifs/search?api_key=$GIPHY_API_KEY&q=funny+cat&limit=5&rating=pg-13"
```

## Sending GIFs

Once you have a GIF URL, use the message tool to send it to the channel.
