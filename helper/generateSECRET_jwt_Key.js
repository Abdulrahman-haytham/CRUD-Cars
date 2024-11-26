const crypto = require('crypto');

// Generate a 32-byte key
const key = crypto.randomBytes(32).toString('hex');

// Print the key in a table format (for debugging purposes, be cautious in production)
console.table({ key });
