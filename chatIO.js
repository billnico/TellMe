const {Server}=require("socket.io");
const app=require("./app");
const http=require("http");
const httpServer=http.createServer(app);

const io=new Server(httpServer);

let activeUsers=[];
let pendingMessages=[];

io.on("connection",(socket)=>{
      //new active user register with their name
      //active fires first before check from client
      socket.on("active",(name)=>{
          const user={
            socket:socket,
            name:name
          };
          activeUsers.push(user);
      });
      //when client connects they check for new message
      socket.on("check",(data)=>{
         const user={
            name:data.name,
            socket:socket
         }
         const message=pendingMessages.find((message)=>message.target===user.name);
         if(message){
            user.socket.emit("message",message.messageData);
         }
      });
      //data must include reciever-username, message and sender-name
      socket.on("message",(data)=>{
              const owner=activeUsers.find((user)=>user.name===data.targ);
              const messageData={
                        message:data.message,
                        receiver:data.targ
                     }
              if(owner){   
                    owner.socket.emit("message",messageData);
              }else{
                const message={
                    messageData,
                    target:data.targ
                }
                pendingMessages.push(message);
              }
              
      });
      socket.on("disconnect",()=>{
          activeUsers=activeUsers.filter((user)=>user.id!==socket.id);
      })
});

module.exports={app,httpServer};