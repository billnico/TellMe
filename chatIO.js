const socketIO=require("socket.io");
const app=require("./app");
const http=require("http");

const server=http.createServer(app);
const io=socketIO(server);


io.on("connection",(socket)=>{
      
});

module.exports=io;