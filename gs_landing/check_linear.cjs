const https = require('https');

https.get('https://linear.app', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const matches = data.match(/max-w-[a-zA-Z0-9-\[\]]+/g) || [];
    console.log("Tailwind max-w classes:", [...new Set(matches)]);
    
    // Check for inline max-widths or other common patterns
    const mwMatches = data.match(/max-width:\s*([^;>"]+)/g) || [];
    console.log("Inline max-widths:", [...new Set(mwMatches)]);
  });
});
