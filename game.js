function moo () {
  let playMoo = new Audio ('moo.mp3');
  playMoo.play();
}

function closeInstruction () {
  document.getElementById('instruction').style.display = 'none';
}

function openInstruction () {
  document.getElementById('instruction').style.display = 'flex';
}

function closeRecords () {
  document.getElementById('records').style.display = 'none';
}

function openRecords () {
  document.getElementById('records').style.display = 'flex';
}

function getRandom ()
{
  let randomNumber = Math.trunc(((Math.random() * (9999-1000)) + 1000));
  for (let i = 0; i < 4; i++) {
    if (String(randomNumber).indexOf(String(randomNumber)[i]) != i) {
      return getRandom ();
    }
  }
  return randomNumber;
}

let number = getRandom();
let attempt = 0;
let repeat = [];
let memory = [0,0,0,0,0,0,0,0,0,0];

function setMemory (saveRecord = 0) {
  if(localStorage.getItem('memory') == null) {
    localStorage.setItem('memory', memory);
  }
  memory = localStorage.getItem('memory').split(',');

  for (let i = 0; i < 10; i++) {
     if (saveRecord != 0 && ((memory[i] == 0) || saveRecord < memory[i])) {
      memory.splice(i, 0, saveRecord);
      memory.pop();
      break;
    }
  }
  localStorage.setItem('memory', memory);
}

function getMemory () {
  for (let i = 0; i < 10; i++) {
    let index = 'records__p' + i;
    document.getElementById(index).innerHTML = memory[i];
  }
}

function checkNumber () {
  let inputNumber = document.getElementById('number').value;
  document.getElementById('gameText').style.color = 'black';
  document.getElementById('gameText').innerHTML = '';
  if (inputNumber.length == 0) {
    alert('Вы не ввели число');
    return null;
  }

  if (inputNumber.length != 4) {
    alert('Число должно быть четырёхзначным');
    return null;
  }

  if (inputNumber.match(/\D/g) == true) {
    alert('Вы ввели не числовое значение');
    return null;
  }

  let blows = 0;
  let cows = 0;

  for (let i = 0; i < 4; i++) {
    if (String(number).includes(inputNumber[i])
    && String(number).indexOf(inputNumber[i]) == i) {
      blows++;
    } else if (String(number).includes(inputNumber[i])) {
      cows++;
    }
  }
  attempt++;

  if (blows == 4) {
    document.getElementById('gameText').innerHTML = 
    `Поздравляю!!! Вы выиграли!!!. А теперь... Скажи муу... Ну давай, помычи!!!`;
    document.getElementById('gameText').style.color = '#ff4a00';
    number = getRandom();

    for (let i = 0; i < attempt-1; i++) {
      repeat[i].parentNode.removeChild(repeat[i]);
    }
    setMemory (attempt);
    getMemory ();
    attempt = 0;
    repeat = [];
    return null;
  }
  
  repeat.push(document.getElementById('gameText').cloneNode());
  repeat[attempt-1].innerHTML = `${attempt}) Быков: ${blows}, Коров: ${cows}`;
  document.getElementById('game').appendChild(repeat[attempt-1]);
}