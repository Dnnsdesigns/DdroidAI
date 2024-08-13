const express = require('express');
const app = express();
const agentController = require('./agentController');

app.use(express.json());

app.post('/api/agents', agentController.createAgent);

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
