const socketIO=require("socket.io");
const app=require("./app");
const http=require("http");

const server=http.createServer(app);
const io=socketIO(server);

const activeUsers=[];
const pendingMessages=[];

io.on("connection",(socket)=>{
      //new active user register with their name
      //active fires first before check from client
      socket.on("active",(name)=>{
          const user={
            id:socket.id,
            name:name
          };
          activeUsers.push(user);
      });
      //when client connects they check for new message
      socket.on("check",(data)=>{
         if(pendingMessages.includes(data.name)){
            const self=activeUsers.find((user)=>{user.name===data.name});
            io.to(self.id).emit("message",messageData);
         }
      });
      //data must include reciever-username, message and sender-name
      socket.on("message",(data)=>{
              const sender=activeUsers.find((user)=>user.id===socket.id);
              const owner=activeUsers.find((user)=>user.name===data.receiver);
              const messageData={
                 sender:sender,
                 message:data.message,
                 receiver:owner
              }
              if(activeUsers.includes(data.receiver)){
              io.to(data.receiver.id).emit("message",messageData);
          }else{
              pendingMessages.push(messageData);
          }
      });
      socket.on("disconnect",()=>{
          activeUsers=activeUsers.filter((user)=>user.id!==socket.id);
      })
});

module.exports=io;