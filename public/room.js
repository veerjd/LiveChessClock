/* eslint-disable*/
let liveChess

function initialize() {
  const params = new URLSearchParams(window.location.search);

  const username = params.get("name");
  const defaultTime = params.get("baseTime");

  liveChess = {
    gameState: {
      state: "init",
      possibleStates: ["init", "player1", "player2", "done"]
    },
    clockp1: {
      state: "paused",
      time: defaultTime || 60,
      formattedTime: formatTime(defaultTime || 60)
    },
    clockp2: {
      state: "paused",
      time: defaultTime || 60,
      formattedTime: formatTime(defaultTime || 60)
    }
  }

  update()
}

function update(fullReset) {
  document.getElementById("time1").innerText = liveChess.clockp1.formattedTime
  document.getElementById("time2").innerText = liveChess.clockp2.formattedTime
  document.getElementById("p1").innerText = "DISABLED"
  document.getElementById("p2").innerText = "DISABLED"
}

function formatTime(timestamp) {
  const minutes = Math.floor(timestamp / 60);
  const seconds = Math.floor(timestamp) - (minutes * 60);

  return `${minutes > 0 ? `${minutes}m` : ""}${seconds < 10 ? `0${seconds}` : `${seconds}`}s`
}

const params = new URLSearchParams(window.location.search);

const username = params.get("name");

let room = window.location.pathname.split('/')[1]
document.getElementsByTagName('h1')[0].innerText = `Welcome to room ${room}${username ? `, ${username}` : ''}`

const socket = io({
  query: {
    room: room
  }
});

socket.on('message', (msg) => {
  console.log(JSON.stringify(msg));
  return msg
});

function start() {

}

function player1next() {

}

function player2next() {

}

function emitp1() {
  socket.emit('message', {
    message: 'message',
    room: room,
    player: 1
  });
}

function emitp2() {
  socket.emit('message', {
    message: 'message',
    room: room,
    player: 2
  });
}