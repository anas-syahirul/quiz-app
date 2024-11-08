const questions = [
  {
    question: 'What is the capital of France?',
    answer: [
      { text: 'Berlin', correct: false },
      { text: 'Madrid', correct: false },
      { text: 'Paris', correct: true },
      { text: 'Rome', correct: false },
    ],
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answer: [
      { text: 'Earth', correct: false },
      { text: 'Mars', correct: true },
      { text: 'Jupiter', correct: false },
      { text: 'Saturn', correct: false },
    ],
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answer: [
      { text: 'Mark Twain', correct: false },
      { text: 'William Shakespeare', correct: true },
      { text: 'Charles Dickens', correct: false },
      { text: 'Ernest Hemingway', correct: false },
    ],
  },
  {
    question: 'What is the smallest prime number?',
    answer: [
      { text: '0', correct: false },
      { text: '1', correct: false },
      { text: '2', correct: true },
      { text: '3', correct: false },
    ],
  },
  {
    question: 'Which ocean is the largest?',
    answer: [
      { text: 'Atlantic', correct: false },
      { text: 'Indian', correct: false },
      { text: 'Pacific', correct: true },
      { text: 'Arctic', correct: false },
    ],
  },
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer'); // Element untuk timer

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 7;

function startApp() {
  questionElement.innerHTML = `This quiz consists of ${questions.length} multiple-choice questions. You have a limited
          time of ${timeLeft} seconds per question. Answer as many as you can correctly to
          achieve the highest score. Good luck!`;
  resetState();
  nextButton.innerHTML = 'Start Quiz';
  nextButton.style.display = 'block';
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
  startTimer();
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
  clearInterval(timer);
  timerElement.innerHTML = '';
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
  clearInterval(timer);
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = 'Play Again';
  nextButton.style.display = 'block';
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function startTimer() {
  timeLeft = 7;
  timerElement.innerHTML = `Time left: ${timeLeft} seconds`;
  if (timeLeft > 3) {
    timerElement.style.color = 'green';
  }

  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerHTML = `Time left: ${timeLeft} seconds`;

    if (timeLeft > 3) {
      timerElement.style.color = 'green';
    } else {
      timerElement.style.color = 'red';
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleNextButton();
    }
  }, 1000);
}

nextButton.addEventListener('click', () => {
  if (nextButton.innerHTML === 'Start Quiz') {
    startQuiz();
  } else {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startApp();
    }
  }
});

startApp();
