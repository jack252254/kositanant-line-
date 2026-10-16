const express=require('express');
const line=require('@line/bot-sdk');
require('dotenv').config();
const config={channelAccessToken:process.env.LINE_CHANNEL_ACCESS_TOKEN,channelSecret:process.env.LINE_CHANNEL_SECRET};
const client=new line.Client(config);
const app=express();
app.post('/api/line/webhook',line.middleware(config),async(req,res)=>{
  for(const e of req.body.events){
    if(e.type!=='message'||e.message.type!=='text')continue;
    console.log('ได้ข้อความ:',e.message.text);
  }
  res.status(200).end();
});
app.get('/',(req,res)=>res.send('โฆษิตอนันต์ พร้อมทำงาน 8 คัน'));
app.listen(process.env.PORT||3000,()=>console.log('Running'));
