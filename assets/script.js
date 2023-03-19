var startBtn = document.querySelector('#startQuiz');
var time = document.querySelector('#timer');
var mainHeader = document.querySelector('#headerLine');
var lowerHeader = document.querySelector('#headerBody');
var response = document.querySelector('#responseLine');
var gameOverScreen = document.getElementsByName('gameOver');
var btnSub = document.getElementById('submitScore');
var qBtns = document.getElementsByName('qBtn');
var b1 = document.querySelector('#btn1');
var b2 = document.querySelector('#btn2');
var b3 = document.querySelector('#btn3');
var b4 = document.querySelector('#btn4');
var scoreModal = document.querySelector('#scoreModal');
var viewScore = document.querySelector('#highscore');
var empty = document.getElementsByClassName('close')[0];
var hsNameList = document.getElementById('nameList');
var hsScoreList = document.getElementById('scoreList');
var storage;
var i = 0;
var finalScore = 0;

var quizQuestions = [
    {
    question: "Question 1: Which of these examples is the 'OR' operator?",
    answers: [
        {a: "||", correct: true},
        {a: "&&", correct: false},
        {a: "==", correct: false},
        {a: "<>", correct: false}
    ]
  },
    {
    question: "Question 2:  Which of the following would return false if var a = 100 and var b = '100'?",
    answers: [
        {a: "a = b", correct: false},
        {a: "a == b", correct: false},
        {a: "a === b", correct: true},
        {a: "None of the above", correct: false}
    ]
  },
    {
    question: "Question 3:Which of the following would set var x to 'Raphael' from tmntArray = ['Leonardo', 'Donatello', 'Raphael', 'Michelangelo']",
    answers: [
        {a: "var x = tmntArray[3];", correct: false},
        {a: "var x = tmntArray(2);", correct: false},
        {a: "var x = tmntArray[2];", correct: true},
        {a: "var x.equals(tmntArray[3]);", correct: false}
    ]
  },
    {
    question: "Question 4: Which of the following would return an element by id='getID?'",
    answers: [
        {a: "document.querySelector('#getID');", correct: true},
        {a: "document.querySelector('getID');", correct: false},
        {a: "document.querySelector('.getID');", correct: false},
        {a: "document.querySelector(':getID');", correct: false}
    ]
  },
    {
    question: "Question 5: Which 'for loop' would iterate 7 times?",
    answers: [
        {a: "for(var i = 0; i < 7; i++)", correct: false},
        {a: "for(var i = 0; i < 8; i++)", correct: false},
        {a: "for(var i = 0; i <= 7; i++)", correct: false},
        {a: "Both B and C", correct: true}
    ]
  },
    {
    question: "Question 6: Which of the following would invoke the function doWork?",
    answers: [
        {a: "doWork()", correct: true},
        {a: "call doWork", correct: false},
        {a: "f(doWork)", correct: false},
        {a: "call(doWork)", correct: false}
    ]
  },
    {
    question: "Question 7: Which of the following would output Nan?",
    answers: [
        {a: "console.log('1' + 1);", correct: false},
        {a: "console.log('A' - 1);", correct: true},
        {a: "console.log(2 + '-2' + '2');", correct: false},
        {a: "console.log('Hello'+ '78')", correct: false}
    ]
  },
    {
    question: "Question 8: The interpreter of Javascript is:",
    answers: [
        {a: "Object", correct: false},
        {a: "Client", correct: true},
        {a: "Server", correct: false},
        {a: "None of the above", correct: false}
    ]
  },
    {
    question: "Question 9: Which data type is not supported by Javascript?",
    answers: [
        {a: "Float", correct: true},
        {a: "String", correct: false},
        {a: "Boolean", correct: false},
        {a: "Null", correct: false}
    ]
  },
    {
    question: "Question 10: Which of the following will not empty the array, arrayList",
    answers: [
        {a: "arrayList = [];", correct: false},
        {a: "arrayList.length = 0;", correct: false},
        {a: "arrayList[0];", correct: true},
        {a: "arrayList.splice(0, arrayList.length)", correct: false}
    ]
  }];

//start quiz, timer and sets score values
startBtn.addEventListener("click", function(){
    timeLeft = 100;
    finalScore = 0;
    i = 0;
    time.textContent = timeLeft;
    startBtn.classList.add("hide");
    gameOverScreen.forEach(gameOverScreen => gameOverScreen.classList.add('hide'));
    var timeInterval = setInterval(function(){
        if (timeLeft > 0) {
            if (i >= 10) {
                clearInterval(timeInterval);
            }
            timeLeft--;
            time.textContent = timeLeft; 
        } else {
            clearInterval(timeInterval);
            timeLeft = 0;
            finalScore = timeLeft;
            time.textContent = timeLeft;
            highScore(finalScore);
            }
    }, 1000);
    quizFx();
});

//controls which questions and answers are sown
function quizFx (){ 
    lowerHeader.textContent = "";
    response.textContent = "";
    qBtns.forEach(qBtns => qBtns.disabled=false)
    mainHeader.textContent = quizQuestions[i].question;
    b1.dataset.correct = (quizQuestions[i].answers[0].correct);
    b2.dataset.correct = (quizQuestions[i].answers[1].correct);
    b3.dataset.correct = (quizQuestions[i].answers[2].correct);
    b4.dataset.correct = (quizQuestions[i].answers[3].correct);
    b1.textContent = (quizQuestions[i].answers[0].a);
    b2.textContent = (quizQuestions[i].answers[1].a);
    b3.textContent = (quizQuestions[i].answers[2].a);
    b4.textContent = (quizQuestions[i].answers[3].a);
    b1.classList.remove('hide');
    b2.classList.remove('hide');
    b3.classList.remove('hide');
    b4.classList.remove('hide');
    b1.addEventListener('click', answerSubmit);
    b2.addEventListener('click', answerSubmit);
    b3.addEventListener('click', answerSubmit);
    b4.addEventListener('click', answerSubmit);
};

//checks if the answer is correct/incorrect and iterates question number by 1
function answerSubmit (){ 
    i+=1;
    if (this.dataset.correct === 'true') { 
        response.textContent = 'Correct!';
        nextQuestion();
    } else {
        timeLeft -= 10;
        time.textContent = timeLeft;
        response.textContent = "Incorrect!";
        nextQuestion();
    }
};

//decides if the quiz moves to the next question or ends game based on iterator and time remaining
function nextQuestion(){ 
    qBtns.forEach(qBtns => qBtns.disabled=true)
    setTimeout(function(){
        if (i <= 9 && timeLeft > 0) {
            quizFx();
        } else {
            finalScore = timeLeft;
            highScore(finalScore);           
        }
    }, 1000);
};

//displays high score form and restart quiz button
function highScore(finalScore) {
    b1.classList.add('hide');
    b2.classList.add('hide');
    b3.classList.add('hide');
    b4.classList.add('hide');
    response.textContent = "";
    startBtn.classList.remove('hide');
    startBtn.textContent = "Restart Quiz";
    mainHeader.textContent = "Game Over!"
    lowerHeader.textContent = "Your final score is " + finalScore;
    gameOverScreen.forEach(gameOverScreen => gameOverScreen.classList.remove('hide'));
    btnSub.addEventListener('click', logScores);
};

//saves scores to local storage
function logScores (){
    var moreScores = JSON.parse(localStorage.getItem('highScores'));
    if (gameOverScreen[1].value === ''){
        alert("Please enter a valid entry.")
        return;
    } else {
        var finalInitials = JSON.stringify(gameOverScreen[1].value);
        var storedValues = {
            names: finalInitials,
            scores: finalScore
        };
        console.log(storedValues)
        if (moreScores === null) {
            localStorage.setItem("highScores", JSON.stringify([storedValues]));
        } else {
            moreScores.push(storedValues);
            localStorage.setItem("highScores", JSON.stringify(moreScores));
        }
    gameOverScreen[1].value = ' Thanks for playing! ';
    gameOverScreen[2].value = 'Submitted!';
    gameOverScreen[1].disabled=true;
    gameOverScreen[2].disabled=true;
    setTimeout(function(){
        gameOverScreen[1].value = '';
        gameOverScreen[2].value = 'Submit';
        gameOverScreen[1].disabled=false;
        gameOverScreen[2].disabled=false;
        gameOverScreen.forEach(gameOverScreen => gameOverScreen.classList.add('hide'));
        }, 2000);
    }
};

// ----------------------------------------MODAL CODE-----------------------------------------------------

//opens highscore modal
viewScore.onclick = function(event) {
    event.preventDefault();
    scoreModal.style.display = "block";
    storage = JSON.parse(localStorage.getItem('highScores'));
    for (var x = 0; x < storage.length; x++){
        var listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(storage[x].names))
        console.log(listItem);
        hsNameList.appendChild(listItem);
    };
    for (var x = 0; x < storage.length; x++){
        var listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(storage[x].scores))
        console.log(listItem);
        hsScoreList.appendChild(listItem);
    };
};

//exits highscore modal when "x" is clicked 
empty.onclick = function() {
    scoreModal.style.display = "none";
};

//exits high scoremodal when area outside the modal is clicked
window.onclick = function(event) {
    if (event.target == scoreModal) {
        scoreModal.style.display = "none";
    }
};

// ----------------------------------------MODAL CODE-----------------------------------------------------











