const {Server}=require("socket.io");
const app=require("./app");
const http=require("http");
const httpServer=http.createServer(app);

const io=new Server(httpServer);

let activeUsers=[];
let pendingMessages=[];
//let messageDB=[];

io.on("connection",(socket)=>{
      //new active user register with their name
      //active fires first before check from client
      socket.on("active",(data)=>{
          const user={
            socket:socket,
            name:data.username
          };
          activeUsers.push(user);
      });
      //when client connects they check for new message
      socket.on("getMessages",(data)=>{
         const user={
            name:data.name,
            socket:socket
         }
         const requiredMessages=pendingMessages.filter((message)=>message.target===user.name);
         const messages=requiredMessages.map((message)=>message.messageData);
         user.socket.emit("allMessages",{messages});
         
      });
      //data must include reciever-username, message and sender-name
      socket.on("message",(data)=>{
              const owner=activeUsers.find((user)=>user.name===data.targ);
              console.log(activeUsers);
              const messageData={
                        message:data.message,
                        receiver:data.targ
                     }
                     console.log("message to :"+messageData.receiver);
              if(owner){   
                    owner.socket.emit("message",{messageData});
              }else{
                const message={
                    messageData,
                    target:data.targ
                }
                pendingMessages.unshift(message);
              }
              
      });
      socket.on("disconnect",()=>{
          activeUsers=activeUsers.filter((user)=>user.id!==socket.id);
      })
});

module.exports={app,httpServer};