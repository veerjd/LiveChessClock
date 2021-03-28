/* eslint-disable*/
const params = new URLSearchParams(window.location.search);

const username = params.get("name");
const defaultTime = params.get("baseTime");

let liveChess = {
  gameState: {
    state: "init",
    possibleStates: ["init", "player1", "player2", "done"]
  },
  player1: {
    state: "paused",
    socket: undefined,
    baseTime: defaultTime || 60,
    time: defaultTime || 60,
    formattedTime: formatTime(defaultTime || 60),
    interval: undefined
  },
  player2: {
    state: "paused",
    socket: undefined,
    baseTime: defaultTime || 60,
    time: defaultTime || 60,
    formattedTime: formatTime(defaultTime || 60),
    interval: undefined
  },
  moderators: []
}

function initialize() {
  liveChess = {
    gameState: {
      state: "init",
      possibleStates: ["init", "player1", "player2", "done"]
    },
    player1: {
      state: "paused",
      socket: undefined,
      baseTime: defaultTime || 60,
      time: defaultTime || 60,
      formattedTime: formatTime(defaultTime || 60),
      interval: undefined
    },
    player2: {
      state: "paused",
      socket: undefined,
      baseTime: defaultTime || 60,
      time: defaultTime || 60,
      formattedTime: formatTime(defaultTime || 60),
      interval: undefined
    },
    moderators: []
  }

  update()
}

function update() {
  document.getElementById("time1").innerText = liveChess.player1.formattedTime
  document.getElementById("time2").innerText = liveChess.player2.formattedTime
  document.getElementById("p1").innerText = "DISABLED"
  document.getElementById("p2").innerText = "DISABLED"

  if (liveChess.player1.time < 1 || liveChess.player2.time < 1) {
    console.log(1, liveChess.player1.interval, liveChess.player2.interval)
    clearInterval(liveChess.player1.interval)
    clearInterval(liveChess.player2.interval)
    console.log(2, liveChess.player1.interval, liveChess.player2.interval)

    if (liveChess.player1.time < 1) {
      document.getElementById("time1").innerText = 'DEAD'
      document.getElementById("time2").innerText = 'WIN'
    }
    if (liveChess.player2.time < 1) {
      document.getElementById("time1").innerText = 'WIN'
      document.getElementById("time2").innerText = 'DEAD'
    }
  }

}

function formatTime(timestamp) {
  const minutes = Math.floor(timestamp / 60);
  const seconds = Math.floor(timestamp) - (minutes * 60);

  return `${minutes > 0 ? `${minutes}m` : ""}${seconds < 10 ? `0${seconds}` : `${seconds}`}s`
}

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
  startCounting("player1")
}

function startCounting(player) {
  liveChess[player].interval = setInterval(() => {
    console.log(liveChess)
    liveChess[player].state = "counting"
    liveChess[player].time = liveChess[player].time - 1
    liveChess[player].formattedTime = formatTime(liveChess[player].time)
    update()
  }, 1000)
}

function stopCounting(player) {
  clearInterval(liveChess[player].interval)
  liveChess[player].state = "waiting"
}

function flip(id) {
  if (id === "p1") {
    stopCounting("player1")
    startCounting("player2")
  } else {
    startCounting("player1")
    stopCounting("player2")
  }
}

// function emitp1() {
//   socket.emit('message', {
//     message: 'message',
//     room: room,
//     player: 1
//   });
// }

// function emitp2() {
//   socket.emit('message', {
//     message: 'message',
//     room: room,
//     player: 2
//   });
// }