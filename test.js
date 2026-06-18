const assert = require('node:assert');
const test = require('node:test');
const app = require('./index');

test('Express app should start and respond to GET /', async () => {
  // Start server on a random available port
  const server = app.listen(0);
  const port = server.address().port;
  
  try {
    const response = await fetch(`http://localhost:${port}/`);
    const text = await response.text();
    
    assert.strictEqual(response.status, 200);
    assert.strictEqual(text, 'Express is working!');
  } finally {
    // Ensure the server is closed after the test finishes
    server.close();
  }
});
