const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "views");

// Khi có người kết nối
io.on("connection", function (client) {
  console.log("Có người vừa kết nối: " + client.id);

  // Phòng chat
  var room;

  // Tham gia chat
  client.on("join", function (data) {
    room = data;
    client.join(room);
  });

  // Khi client gửi tin nhắn -> server nhận được -> gửi lại cho tất cả mọi người trong room
  client.on("message", function (data) {
    io.to(room).emit("thread", data);
  });
});

app.get("/chat", (req, res) => {
  return res.render("chat");
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
