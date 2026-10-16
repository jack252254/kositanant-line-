const express = require('express');
const app = express();
app.get('/', (req,res)=>res.send('OK - Kositanant Bot Ready'));
app.post('/api/line/webhook', (req,res)=>res.send('OK'));
app.listen(10000, ()=>console.log('running'));
