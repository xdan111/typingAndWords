var alphabet = "abcdefghijklmnopqrstuvwxyz";
var enabledLetters = true;
var enabledNumbers = false;
var enabledCharacters = false;
var timerIsOn = false;
var bugs = false;

var timerInterval;

var output = "";
var score = 0;

var highestScore = 0;
if (getCookie("highestScore") != 0) { highestScore = getCookie("highestScore"); }

var outputHTML = "";
var scoreHTML = document.getElementById("score");
var highestScoreHTML = document.getElementById("highestScore");

highestScoreHTML.innerHTML = "Your highest score: " + highestScore;

var seconds = 0;
var minutes = 0;

generateText();

function generateText() {
  output = "";
  resetTimer();

  if (score > highestScore) {
    highestScore = score;
    setCookie("highestScore", highestScore, 30);
  }

  score = 0;
  outputHTML = "";
  document.getElementById("text").innerHTML = "";
  scoreHTML.innerHTML = "Score: " + score;

  if (alphabet == "") { return; }

  randomInt = Math.floor(Math.random() * alphabet.length);

  output = output + alphabet[randomInt];
  outputHTML = "<span id=\"firstChar\">" + output[0] + "</span>" + output.slice(1);

  for (var i = 0; i <= 19; i++) {
    randomInt = Math.floor(Math.random() * alphabet.length);

    output = output + alphabet[randomInt];
    outputHTML = outputHTML + alphabet[randomInt];
  }

  document.getElementById("text").innerHTML = outputHTML;
}


function enableNumbers() {
  if (!enabledNumbers) {
    alphabet += "1234567890";
    enabledNumbers = true;
  } else {
    alphabet = alphabet.replace("1234567890", "");
    enabledNumbers = false;
  }
  document.getElementById("userInput").value = "";
  generateText();
}

function enableCharacters() {
  if (!enabledCharacters) {
    alphabet += "!@#$%^&*()";
    enabledCharacters = true;
  } else {
    alphabet = alphabet.replace("!@#$%^&*()", "");
    enabledCharacters = false;
  }
  document.getElementById("userInput").value = "";
  generateText();
}

function enableLetters() {
  if (!enabledLetters) {
    alphabet += "abcdefghijklmnopqrstuvwxyz";
    enabledLetters = true;
  } else {
    alphabet = alphabet.replace("abcdefghijklmnopqrstuvwxyz", "");
    enabledLetters = false;
  }
  document.getElementById("userInput").value = "";
  generateText();
}

function disableAnim() {
  // console.log(document.body);
  // document.body.innerHTML = "";
  //document.body.innerHTML.animation.pause();
  var animatedBack = document.getElementById("animatedBack");
  if (!bugs) {
    animatedBack.style.animationPlayState='paused';
    spiders = new SpiderController({'minBugs':20, 'maxBugs':35});
    number = spiders.bugs.length - 1;
    bugs = true;
  } else {
    spiders.end();
    animatedBack.style.animationPlayState='running';
    bugs = false;
  }


  console.log(spiders.bugs);
}

function trackChange(value, thisElement) {
  if (!timerIsOn) { 
    timerInterval = setInterval(timer, 1000);
    timerIsOn = true;
  }

  if (alphabet == "") { return; }

  if (value[value.length - 1] == output[0]) {

    // randomInt = Math.floor(Math.random() * spiders.bugs.length);
    if (bugs && number >= 0) {
      spiders.bugs[number].die();
      number--;
    } else if (bugs) {
      spiders.reset();
      number = spiders.bugs.length - 1;
    }

    /*
    
    
    var fristChar = document.getElementById("firstChar");

    if (fristChar.style.webkitAnimationName !== 'dissapear') {
      fristChar.style.webkitAnimationName = 'dissapear';
      fristChar.style.webkitAnimationDuration = '300ms';

      setTimeout(function () {
        fristChar.style.webkitAnimationName = '';
      }, 300);
    }
    */

    if (thisElement.style.webkitAnimationName !== 'colorchange') {
      thisElement.style.webkitAnimationName = 'colorchange';
      thisElement.style.webkitAnimationDuration = '250ms';

      setTimeout(function () {
        thisElement.style.webkitAnimationName = '';
      }, 250);
    }

    score++;
    scoreHTML.innerHTML = "Score: " + score;

    if (highestScore < score) {
      highestScore = score;
      highestScoreHTML.innerHTML = "Your highest score: " + highestScore;
      setCookie("highestScore", highestScore, 30);
    }

    randomInt = Math.floor(Math.random() * alphabet.length);

    output = output.slice(1) + alphabet[randomInt];

    outputHTML = "<span id=\"firstChar\">" + output[0] + "</span>" + output.slice(1);

    document.getElementById("text").innerHTML = outputHTML;
  }
  /* 
  else {
    if (e.style.webkitAnimationName !== 'colorchangered') {
    e.style.webkitAnimationName = 'colorchangered';
    e.style.webkitAnimationDuration = '250ms';

    // make sure to reset the name after 4 seconds, otherwise another call to colorchange wont have any effect
    setTimeout(function () {
      e.style.webkitAnimationName = '';
    }, 250);
    }
      
    score--;
    document.getElementById("score").innerHTML = "Score: " + score;
  }
   */

}

function timer() {
  seconds++;
  if (seconds == 60) {
    minutes++;
    seconds = 0;
  }
  document.getElementById("timer").innerHTML = minutes + "m:" + seconds + "s";
}

function resetTimer() {
  clearInterval(timerInterval);
  timerIsOn = false;
  minutes = seconds = 0;
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}