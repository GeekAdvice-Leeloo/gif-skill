const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

// Celebration triggers - phrases that warrant a GIF
const TRIGGERS = {
  celebration: ['nice', 'well done', 'gg', 'good game', 'congrats', 'congratulations', 'wp', 'gg wp', 'pog', 'poggers'],
  laugh: ['lol', 'lmao', 'haha', 'laugh', 'rofl', 'lmfao'],
  happy: ['happy', 'excited', 'woohoo', 'yay', 'awesome', 'amazing', 'great job'],
  burn: ['rip', 'oof', 'owned', 'dead', 'gg ez'],
};

// Rate limiting: last GIF time per channel
const lastGifTime = new Map();
const RATE_LIMIT_MS = 120000; // 120 seconds

// Search Giphy for GIFs
async function searchGifs(query, limit = 5) {
  if (!GIPHY_API_KEY) {
    return { error: 'GIPHY_API_KEY not configured' };
  }

  const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=${limit}&rating=pg-13`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      return {
        results: data.data.map(gif => ({
          id: gif.id,
          title: gif.title,
          url: gif.images.fixed_height.url,
          preview: gif.images.fixed_width_small.url,
        }))
      };
    }
    return { results: [] };
  } catch (err) {
    return { error: err.message };
  }
}

// Check message for triggers
function detectTrigger(messageText) {
  const lower = messageText.toLowerCase();
  
  for (const [type, keywords] of Object.entries(TRIGGERS)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        return type;
      }
    }
  }
  return null;
}

// Map trigger type to search query
const TRIGGER_SEARCH = {
  celebration: 'celebration happy',
  laugh: 'funny laugh',
  happy: 'excited happy',
  burn: 'oops fail',
};

module.exports = {
  name: 'gif',
  version: '1.0.0',
  tools: {
    gif_search: {
      description: 'Search for GIFs using Giphy',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'What to search for' },
          limit: { type: 'number', description: 'Max results (default 5)' },
        },
        required: ['query'],
      },
      execute: async ({ query, limit = 5 }) => {
        return await searchGifs(query, limit);
      },
    },
  },
  // Called on each message for proactive GIFs
  onMessage: async (message, send) => {
    if (!GIPHY_API_KEY) return;
    if (message.author?.bot) return;
    
    const channelId = message.channelId;
    const now = Date.now();
    
    // Check rate limit
    const lastTime = lastGifTime.get(channelId) || 0;
    if (now - lastTime < RATE_LIMIT_MS) return;
    
    const trigger = detectTrigger(message.content);
    if (!trigger) return;
    
    const searchQuery = TRIGGER_SEARCH[trigger];
    const result = await searchGifs(searchQuery, 10);
    
    if (result.results && result.results.length > 0) {
      // Pick a random GIF from results
      const gif = result.results[Math.floor(Math.random() * result.results.length)];
      
      // Send the GIF
      await send(gif.url);
      
      // Update rate limit
      lastGifTime.set(channelId, now);
    }
  },
};
