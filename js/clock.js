const clock = document.querySelector(".js-clock .clock__text");

/**
 * 현재 시간 가져오기
 */
function getTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const time = `${hours < 10 ? `0${hours}` : hours} :
                ${minutes < 10 ? `0${minutes}` : minutes}`;

  clock.innerHTML = time;
  return;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
  return;
}

init();