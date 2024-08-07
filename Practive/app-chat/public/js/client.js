const ip_name = document.getElementById("name");
const ip_room = document.getElementById("room");
const btn_join = document.getElementById("btn_join");

const ip_message = document.getElementById("ip_message");
const btn_send = document.getElementById("btn_send");

const ul_message = document.getElementById("ul_message");

// Kết nối với socket
var socket = io.connect();

// on - nhận
socket.on("connect", function (data) {
  console.log(data);
});

btn_join.addEventListener("click", function () {
  const room = ip_room.value;

  // emit - gửi đi
  socket.emit("join", room);
});

btn_send.addEventListener("click", function () {
  const name = ip_name.value;
  const message = ip_message.value;
  socket.emit("message", name + ": " + message);
});

socket.on("thread", function (data) {
  const li = document.createElement("li");
  li.innerHTML = data;

  //   console.log(data);

  ul_message.appendChild(li);
});
