const express = require('express');
const { Client, middleware } = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new Client(config);
const app = express();

app.get('/', (req, res) => {
  res.send('Kositanant Bot is Live - OK');
});

app.post('/api/line/webhook', middleware(config), async (req, res) => {
  try {
    const events = req.body.events;
    for (const event of events) {
      if (event.type === 'message' && event.message.type === 'text') {
        const text = event.message.text.toLowerCase();
        let reply = null;

        if (text.includes('ยอดขาย') || text.includes('ขาย')) {
          reply = { type: 'text', text: '📊 รับทราบครับพี่แจ็ค กำลังสรุปยอดขายโฆษิตานันต์ให้ครับ...' };
        } else if (text.includes('สวัสดี') || text.includes('หวัดดี')) {
          reply = { type: 'text', text: 'สวัสดีครับพี่แจ็ค! บอทโฆษิตานันต์พร้อมทำงานแล้วครับ ✅' };
        } else {
          reply = { type: 'text', text: `ได้รับข้อความ: ${event.message.text}\nบอทโฆษิตานันต์พร้อมรับคำสั่งครับ!` };
        }

        if (reply) {
          await client.replyMessage(event.replyToken, reply);
        }
      }
    }
    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(200).send('OK');
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log('Kositanant Bot running on ' + port));
