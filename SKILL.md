---
name: gif
description: Search and send GIFs using Giphy API, react to GIFs with matching responses
metadata: {"openclaw": {"emoji": "🎬", "requires": {"env": ["GIPHY_API_KEY"]}, "primaryEnv": "GIPHY_API_KEY"}}
allowed-tools: ["message", "web_fetch", "image", "exec"]
---

# GIF Skill

Search and send GIFs using Giphy API, and respond to GIFs with matching reactions.

## When to Use This Skill

Use this skill when:
- Someone posts a GIF in Discord (detect via giphy.com or tenor.com embeds)
- Someone uses celebration words and a GIF would fit
- You want to react or respond with a GIF

## Tools

### Sending GIFs

Use the `message` tool with `action: send`. Discord supports GIFs via the media parameter:

```json
{
  "action": "send",
  "channel": "discord",
  "to": "channel:<channel_id>",
  "message": "Your message here",
  "media": "https://media.giphy.com/media/xxx/giphy.gif"
}
```

For best results:
- Use Giphy's direct GIF URLs (ends in .gif)
- Keep messages short, let the GIF speak
- Use `silent: true` to avoid ping notifications

### Analyzing GIFs (IMPORTANT)

When someone posts a GIF, you MUST analyze it first before responding:

1. **Extract the GIF ID** from the URL (e.g., from `giphy.com/gifs/NAME-ID`, the ID is after the last dash)

2. **Get smaller version via Giphy API**:
   ```
   curl -s "https://api.giphy.com/v1/gifs/ID?api_key=$GIPHY_API_KEY"
   ```
   Look for `fixed_width_small` (100px wide, ~286KB) or `downsized` in the response.

3. **Download the small version**:
   Try these in order (larger = more detail):
   - `downsized_medium` (~1-2MB, best quality)
   - `fixed_width` (200px wide)
   - `fixed_width_small` (100px wide, most compressed)
   - `downsized` (Giphy's auto-sized version)

   Get URL from API response like:
   ```
   curl -s "https://api.giphy.com/v1/gifs/ID?api_key=$GIPHY_API_KEY" | jq '.data.images.downsized_medium.url'
   ```

4. **Analyze with image tool**:
   ```json
   {
     "action": "image",
     "image": "~/.openclaw/media/inbound/gif_analysis.gif",
     "prompt": "Describe what's happening in this GIF. What scene is it from? What emotion or reaction does it convey?"
   }
   ```

5. **Then respond** with an appropriate GIF based on what you actually saw.
   - Think about how you would NATURALLY RESPOND if the person had just SAID what the GIF conveys
   - Example: If the GIF shows "doubt/skepticism" → a natural response would be "you sure?" or "really?" 
   - Then find a GIF that matches YOUR response, not just the original emotion
   - Search Giphy for your response:
     ```
     curl -s "https://api.giphy.com/v1/gifs/search?api_key=$GIPHY_API_KEY&q=YOUR_RESPONSE+reaction&limit=3"
     ```
   - **Don't analyze every result** - just pick the first one that looks relevant and send it
   - Don't overthink it - speed matters

If the GIF is too large (>6MB), get the `fixed_width_small` or `downsized` version from the API - these are usually small enough.

## Triggers

### 1. React to GIFs
When someone posts a GIF in the channel:
- Use the workflow above to analyze it
- Send a matching response GIF based on what you saw
- Keep it brief - "Mood" type responses work well

### 2. Celebrate
Send GIFs when someone uses celebration words:
- "nice", "well done", "gg", "good game", "congrats", "wp", "pog"
- "lol", "lmao", "haha", "rofl"  
- "happy", "excited", "woohoo", "awesome"
- "rip", "oof"

## Tips

- Giphy URLs: `https://media.giphy.com/media/[ID]/giphy.gif`
- Tenor URLs: `https://media.tenor.com/[ID]/tenor.gif`
- Always analyze before responding - don't just guess from the URL title
- Match the vibe - don't overdo it
- Note: Fast-moving GIFs (fist pumps, yelling reactions) may not analyze well from compressed previews - the model sees only a static frame. Do your best with what you have.
