# GIF Skill

Search and send GIFs using Giphy API.

## Setup

Get a Giphy API key from https://developers.giphy.com/dashboard

Set the API key:
- Environment variable: `GIPHY_API_KEY`
- Or in config: `skills.gif.apiKey`

## Usage

### Tool: `gif_search`
Search for GIFs by query.

**Parameters:**
- `query` (string): What to search for
- `limit` (number, optional): Max results (default: 5)

**Returns:** Array of GIF objects with url, title

### Proactive GIFs

The skill watches for celebration moments and sends appropriate GIFs:

**Trigger phrases:**
- "nice", "well done", "gg", "good game", "congrats", "congratulations"
- "lol", "lmao", "laugh"
- "happy", "excited", "woohoo"
- Burns/roasts: "rip", "oof", "owned"

**How it works:**
- On each message, check for trigger phrases
- If match found, search Giphy for related GIF
- Send the GIF to the channel
- Rate limited: max 1 GIF per 120 seconds per channel

## Example

```
User: "nice one!"
→ Skill detects "nice"
→ Searches Giphy for "celebration"
→ Sends a GIF
```
