const watch = document.getElementById("timer");
let timer;
let milliseconds = 60000;
let startButton = document.getElementById("start");
const checkElement = document.querySelector(".check");
const loose = document.querySelector('.loose');
const win = document.querySelector('.win');
const timeElement = document.querySelector(".time");
const checkbtn = document.querySelector("#check");

// sort jquery
$('.sort').sortable({
  connectWith: '#start, #end',
  stop: function(event, ui) {
    console.log(document.querySelector('#end').childNodes.length)

    if(document.querySelector('#end').childNodes.length <= 2 ) {
      startTimer()
    }      
  }
})
// ----


// timer
const startTimer = () => {
  loose.classList.add('hide');
  loose.classList.remove('show');
  startButton.disabled = true;
  startButton.style.opacity = 0.5;
  startButton.style.cursor = "default";

  watch.classList.remove("paused");
  clearInterval(timer);
  timer = setInterval(() => {
    milliseconds -= 10;
    if (milliseconds < 0) {
      clearInterval(timer);
      watch.innerHTML = "01:00";

      checkElement.classList.remove("hide");

      loose.classList.remove('hide');
      loose.classList.add('show');
      document.querySelector('#check').classList.add('hide');
    } else {
      let dateTimer = new Date(milliseconds);
      watch.innerHTML =
        ("0" + dateTimer.getUTCMinutes()).slice(-2) +
        ":" +
        ("0" + dateTimer.getUTCSeconds()).slice(-2);
    }
  }, 10);



};
const resetWatch = () => {
  watch.classList.remove("paused");
  clearInterval(timer);
  milliseconds = 60000;
  watch.innerHTML = "01:00";
};
function pause() {
  watch.classList.add("paused");
  clearInterval(timer);
};
// --------



// check result btn
function checkres() {
  checkElement.classList.remove("hide");
  loose.classList.remove('show');
  win.classList.remove('show');
  loose.classList.add('hide');
  win.classList.add('hide');


  // получаем значение таймера
  const timerElement = document.getElementById("timer");
  const timerValue = timerElement.innerHTML;

  // проверяем, что время таймера не истекло
  if (timerValue !== "00:00") {
    timeElement.classList.remove("hide");
    timeElement.classList.add("show");
    document.querySelector('#check').classList.remove('hide');
  }
}
document.getElementById("checkres").addEventListener("click", checkres);
// ------

// shuffle
shuffleTitles();
function shuffleTitles() {
  var titles = $(".sort .pic");
  titles.each(function() {
    var target = Math.floor(Math.random() * titles.length - 1) + 1;
    var target2 = Math.floor(Math.random() * titles.length - 1) + 1;
    $(this).insertAfter(titles.eq(target));
    $(this).insertBefore(titles.eq(target2));
  });
}
// -------


// проверка пазла-
function checkOrder() {
  timeElement.classList.add("hide");
  timeElement.classList.remove("show");
  // const checkElement = document.querySelector(".check");
  const parentElement = document.querySelector(`#end`);
  const childElements = parentElement.querySelectorAll('div');

  
  const order = Array.from(childElements).map(element => Number(element.className.match(/title(\d+)/)[1]));
  const sortedOrder = order.slice().sort((a, b) => a - b);
  const isCorrectOrder = sortedOrder.every((value, index) => value === order[index]);

  const childElementCount = parentElement.childElementCount;
  if (childElementCount === 16) {
    if (isCorrectOrder) {
      checkElement.classList.remove("hide");
      checkElement.classList.add("show");
      win.classList.remove('hide');
      win.classList.add('show');
      checkbtn.classList.remove('show');
      checkbtn.classList.add('hide');
      pause()
  
  
      // alert('Элементы идут подряд по возрастанию!');
    }
     else {
      checkElement.classList.remove("hide");
      checkElement.classList.add("show");
      loose.classList.remove('hide');
      loose.classList.add('show');
      checkbtn.classList.remove('show');
      checkbtn.classList.add('hide');
      moveElements()
      pause()
  
      // alert('Элементы НЕ идут подряд по возрастанию!');
    }
  }
  else {
    moveElements()
    checkElement.classList.remove("hide");
    checkElement.classList.add("show");
    loose.classList.remove('hide');
    loose.classList.add('show');
    checkbtn.classList.remove('show');
    checkbtn.classList.add('hide');
    pause()
  }

}
// ------


function endgame() {
  const loose = document.querySelector('.loose');
  const win = document.querySelector('.win');  
  if (loose.classList.contains('show') || win.classList.contains('show')) {
    resetWatch();
    loose.classList.remove('show');
    win.classList.remove('show');
    startButton.disabled = false;
    startButton.removeAttribute('style');
  }
}

function close() {
  const checkElement = document.querySelector(".check");
  checkElement.classList.remove("show");
  checkElement.classList.add("hide");
  endgame()
}
function moveElements() {
  const source = document.querySelector('#end');
  const destination = document.querySelector('#x');

  while (source.firstChild) {
    destination.appendChild(source.firstChild);
  }
}

document.getElementById("close").addEventListener("click", close);

document.getElementById("new").addEventListener("click", function() {
  shuffleTitles()
  resetWatch();
  startButton.disabled = false;
  startButton.removeAttribute('style');
  loose.classList.remove('show');
  win.classList.remove('show');
  loose.classList.add('hide');
  win.classList.add('hide');
});