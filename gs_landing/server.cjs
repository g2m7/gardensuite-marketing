// Start script for PM2 to wrap the SvelteKit ESM build
// Defaults to port 80 if not specified
process.env.PORT = process.env.PORT || '80';
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

import('./build/index.js').catch(err => {
    console.error('Failed to load SvelteKit app:', err);
    process.exit(1);
});
