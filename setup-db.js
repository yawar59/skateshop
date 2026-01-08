// Create a mock database setup that returns empty results
const fs = require('fs');

// Update .env with a mock database URL that will be handled gracefully
const envPath = '.env';
const envContent = fs.readFileSync(envPath, 'utf8');

// Use a postgres connection that fails gracefully
const newEnvContent = envContent.replace(
  /DATABASE_URL=.*/,
  'DATABASE_URL="postgresql://demo:demo@localhost:5555/demo"'
);

fs.writeFileSync(envPath, newEnvContent);
console.log('Database configuration updated');
