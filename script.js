var time = parseInt(prompt("Please enter the time."));
let timeLimit = time;

document.getElementById("timeShow").innerHTML=time+" s";

let quoteArray=["The greatest glory in living lies not in never falling, but in rising every time we fall.", "Give me a lever long enough and a fulcrum on which to place it, and I shall move the world.", "Three things cannot be long hidden: the sun, the moon, and the truth.", "A life spent making mistakes is not only more honorable, but more useful than a life spent doing nothing.", "The harder life is for a man when he is young, the easier it will be in the future.", "This above all: to thine own self be true.” “Be who you are and say what you feel, because those who mind don't matter and those who matter don't mind.", "A life spent making mistakes is not only more honorable, but more useful than a life spent doing nothing."];

let timerText = document.querySelector(".cur_timer");
let accuracyText = document.querySelector(".cur_accuracy"); 
let errorText = document.querySelector(".cur_errors");
let cpmText = document.querySelector(".cur_cpm");
let wpmText = document.querySelector(".cur_wpm");
let quoteText = document.querySelector(".quote");
let inputArea = document.querySelector(".input_area");
let restartbutton = document.querySelector(".restart_button");

let cpmGroup = document.querySelector(".cpm");
let wpmGroup = document.querySelector(".wpm");
let accuracyGroup = document.querySelector(".accuracy");
let errorGroup = document.querySelector(".errors");
let timerGroup = document.querySelector(".timer");


let timeLeft = timeLimit;
let timeElapsed = 0;
let totalError = 0;
let error = 0;
let accuracy = 0;
let characterType = 0;
let timer = null;
let quoteNumber = 0;
let currentQuote = "";

function updateQuote(){
  quoteText.textContent = null;
  currentQuote = quoteArray[quoteNumber];

  currentQuote.split('').forEach(char=> {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    quoteText.appendChild(charSpan)
  })
  
  if (quoteNumber<quoteArray.length-1){
    quoteNumber++;
  }

  else{
    quoteNumber = 0;
  }
}


function processCurrentText(){
  curInput = inputArea.value;
  curInputArray = curInput.split('');
  characterType++;
  error=0;
  quoteSpanArray= quoteText.querySelectorAll('span');
  quoteSpanArray.forEach((char,index)=>{let typeChar=curInputArray[index]
                                       
        if (typeChar==null){
          char.classList.remove('correctChar');
          char.classList.remove('incorrectChar');
        }

        else if (typeChar === char.innerText){
          char.classList.add('correctChar');
          char.classList.remove('incorrectChar');
        }

        else{
          char.classList.add('incorrectChar');
          char.classList.remove('correctChar');
          error++;
        }
            });

  errorText.textContent = totalError + error;
  let correctCharacter = (characterType-(totalError+error));
  let accuracyValue = ((correctCharacter/characterType)*100);
  accuracyText.textContent = Math.round(accuracyValue);

  if(curInput.length==currentQuote.length)
  {
    updateQuote();
    totalError += error;
    inputArea.value="";
  }

}


function updateTimer(){
  if (timeLeft>0){
    timeLeft--;
    timeElapsed++;
    timerText.textContent = timeLeft + " s";
  }

  else{
    finishGame();
  }
}


function finishGame(){
  
  clearInterval(timer);
  inputArea.disabled = true;
  text.textContent = "Click on the Restart Button to start a new game.";
  restartbutton.style.display = "block";
  cpm = Math.round(((characterType/timeElapsed)*60));
  wpm = Math.round((((characterType/5)/timeElapsed)*60));
  cpmText.textContent = cpm;
  wpmText.textContent = wpm;
  cpmGroup.style.display = "block";
  wpmGroup.style.display = "block";
  
}

function startGame(){
  resetValue();
  updateQuote();
  clearInterval(timer);
  timer= setInterval(updateTimer,1000);
}

function resetValue(){
  
  timeLeft = timeLimit;
  timeElapsed = 0;
  error = 0;
  totalError = 0;
  accuracy = 0;
  characterType = 0;
  quoteNumber = 0;
  inputArea.disabled = false;
  inputArea.value = "";
  quoteText.textContent = "Click on the Area below to start the game.";
  accuracyText.textContent = 100;
  timerText.textContent = timeLeft + " s";
  errorText.textContent = 0;
  
}