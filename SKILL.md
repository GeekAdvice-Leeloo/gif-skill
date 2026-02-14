---
name: gif
description: Search and send GIFs using Giphy API
tools:
  - gif_search
---

# GIF Skill

Search and send GIFs using Giphy API.

## Setup

Get a Giphy API key from https://developers.giphy.com/dashboard

Set the API key:
- Environment variable: `GIPHY_API_KEY`

## Usage

### Tool: gif_search
Search for GIFs by query.

**Parameters:**
- `query` (string): What to search for (required)
- `limit` (number, optional): Max results (default: 5)

**Returns:** Array of GIF objects with url, title

## Example

```
User: find a funny cat gif
Tool: gif_search({query: "funny cat"})
→ Returns GIF URLs
```
