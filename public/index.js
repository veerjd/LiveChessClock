/* eslint-disable*/
async function joinRoom() {
  const response = await fetch('/joinroom', { method: 'POST' })
  const room = (await response.json(response)).room
  const name = document.getElementById('name')
  const time = document.getElementById('time')
  console.log(name.value, room)
  window.location.href = `/${room}?name=${name.value}&baseTime=${time.value}`;
}