"use strict";
const socket = io();
const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInpit = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");
const goChat = document.querySelector("#goChat");
const nameInput = document.querySelector("#name");
const loginWrap = document.querySelector(".login");

goChat.addEventListener("click", login);
nameInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    login();
  }
});

function login() {
  nickname.innerText = nameInput.value;
  loginWrap.style.display = "none";
  const param = {
    name: nameInput.value,
  };
  socket.emit("chatStart", param);
}

socket.on("chatStart", (data) => {
  const { name } = data;
  const item = new chatPlay(name);
  item.printName();
});

function chatPlay(name) {
  this.name = name;
  this.printName = () => {
    const li = document.createElement("li");
    li.classList.add("chatLog");
    const dom = `<span class="goChatLog">${this.name}님이 입장하셨습니다.</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);
  };
}

chatInpit.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    send();
  }
});

sendButton.addEventListener("click", send);

function send() {
  if (chatInpit.value == "") return;
  const param = {
    name: nickname.innerText,
    msg: chatInpit.value,
  };
  socket.emit("chatting", param);
  chatInpit.value = "";
}

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
    li.classList.add(nickname.innerText === this.name ? "sent" : "recived");
    const dom = `<span class="profile">
    <span class="user">${this.name}</span>
  </span>
  <span class="message">${this.msg}</span>
  <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);
  };
}
