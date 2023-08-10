const socketIO=require("socket.io");
const app=require("./app");
const http=require("http");

const server=http.createServer(app);
const io=socketIO(server);

const activeUsers=[];
const pendingMessages=[];

io.on("connection",(socket)=>{
      
      //data must include reciever-username, message and sender-name
      socket.on("message",(data)=>{
          if(activeUsers.includes(data.receiver)){
              const sender=activeUsers.find((user)=>user.id===socket.id);
              const messageData={
                 sender:sender,
                 message:data.message
              }
              io.to(data.receiver.id).emit("message",messageData);
          }else{
            pendingMessages.push(data);
          }
      });
});

module.exports=io;