import express from "express";
import http, { request } from "http";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { Server } from "socket.io";
import { join } from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const _dirname = dirname(fileURLToPath(import.meta.url));

console.log("Directory name:", _dirname); // This should print the directory name
app.get("/", (req, res) => {
  res.sendFile(join(_dirname, "index.html"));
});
io.on("connection",(client)=>{
    console.log("user connected");
    client.emit("message","welcome to the server")
    client.on("disconnect",()=>{console.log("client disconnetect");
    })
    
})
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
