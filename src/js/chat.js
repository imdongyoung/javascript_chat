"use strict";
const socket = io();
const nickname = document.querySelector("#nickname");
const chatLsit = document.querySelector(".chatting-list");
const chatInpit = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatInpit.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    send();
  }
});

function send() {
  const param = {
    name: nickname.value,
    msg: chatInpit.value,
  };
  socket.emit("chatting", param);
  chatInpit.value = "";
}

sendButton.addEventListener("click", send);

socket.on("chatting", (data) => {
  const { name, msg, time } = data;
  const item = new LiMedel(name, msg, time);
  item.makeLi();
  displayContainer.scrollTo(0, displayContainer.scrollHeight);
});

function LiMedel(name, msg, time) {
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = () => {
    const li = document.createElement("li");
    li.classList.add(nickname.value === this.name ? "sent" : "recived");
    const dom = `<span class="profile">
    <span class="user">${this.name}</span>
    <img src="https://placeimg.com/50/50/any" alt="" class="image" />
  </span>
  <span class="message">${this.msg}</span>
  <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatLsit.appendChild(li);
  };
}
