// Dark mode support
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}

// Quiz questions
const quizData = [
  { question: "What is the capital of Japan?", answers: ["Tokyo","Kyoto","Osaka","Hiroshima"], correct: 0 },
  { question: "Which planet is known as the Red Planet?", answers: ["Venus","Mars","Jupiter","Saturn"], correct: 1 },
  { question: "What is the largest mammal in the world?", answers: ["Elephant","Blue Whale","Giraffe","Hippo"], correct: 1 },
  { question: "In which year did World War II end?", answers: ["1944","1945","1946","1947"], correct: 1 },
  { question: "What is the chemical symbol for gold?", answers: ["Go","Gd","Au","Ag"], correct: 2 },
  { question: "Who wrote 'Pride and Prejudice'?", answers: ["Brontë","Jane Austen","Dickinson","Woolf"], correct: 1 },
  { question: "What is the smallest prime number?", answers: ["0","1","2","3"], correct: 2 },
  { question: "Which ocean is the largest?", answers: ["Atlantic","Indian","Arctic","Pacific"], correct: 3 },
  { question: "What is the hardest natural substance?", answers: ["Gold","Iron","Diamond","Quartz"], correct: 2 },
  { question: "Who painted the Mona Lisa?", answers: ["Van Gogh","Picasso","Da Vinci","Michelangelo"], correct: 2 },
  { question: "What is the fastest land animal?", answers: ["Lion","Cheetah","Leopard","Gazelle"], correct: 1 },
  { question: "Which gas is 78% of Earth’s atmosphere?", answers: ["Oxygen","CO₂","Nitrogen","Hydrogen"], correct: 2 }
];

// State
let currentQuestion = 0, score = 0, timer, timeLeft, quizStart;

// Elements
const startScreen = document.getElementById("startScreen");
const quizInterface = document.getElementById("quizInterface");
const resultsScreen = document.getElementById("resultsScreen");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answersContainer");
const feedback = document.getElementById("feedback");
const currentScore = document.getElementById("currentScore");
const nextBtn = document.getElementById("nextBtn");
const progressFill = document.getElementById("progressFill");
const questionProgress = document.getElementById("questionProgress");
const timeLeftEl = document.getElementById("timeLeft");

function startQuiz() {
  currentQuestion = 0; score = 0;
  startScreen.classList.add("hidden");
  quizInterface.classList.remove("hidden");
  resultsScreen.classList.add("hidden");
  quizStart = Date.now();
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  const q = quizData[currentQuestion];
  questionText.textContent = q.question;
  answersContainer.innerHTML = "";
  q.answers.forEach((ans,i)=>{
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = ans;
    btn.onclick = ()=>selectAnswer(i);
    answersContainer.appendChild(btn);
  });
  questionProgress.textContent = `Question ${currentQuestion+1} of ${quizData.length}`;
  progressFill.style.width = `${(currentQuestion/quizData.length)*100}%`;
  feedback.classList.remove("show");
  nextBtn.disabled = true;
  startTimer();
}

function startTimer() {
  timeLeft = 15;
  timeLeftEl.textContent = timeLeft;
  timer = setInterval(()=>{
    timeLeft--; timeLeftEl.textContent = timeLeft;
    if (timeLeft <= 0){ clearInterval(timer); selectAnswer(-1); }
  },1000);
}

function selectAnswer(i) {
  clearInterval(timer);
  const q = quizData[currentQuestion];
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(b=>b.disabled=true);
  const correct = q.correct;
  let isCorrect = i===correct;
  if (i>=0) buttons[i].classList.add(isCorrect?"correct":"incorrect");
  buttons[correct].classList.add("correct");
  if (isCorrect){ score++; currentScore.textContent=score; }
  feedback.textContent = isCorrect ? "🎉 Correct!" : (i===-1?"⏰ Time's up!":"❌ Incorrect");
  feedback.classList.add("show", isCorrect?"correct":"incorrect");
  nextBtn.disabled = false;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion<quizData.length) loadQuestion();
  else showResults();
}

function showResults() {
  quizInterface.classList.add("hidden");
  resultsScreen.classList.remove("hidden");
  const percent = Math.round((score/quizData.length)*100);
  document.getElementById("finalScore").textContent = `${percent}%`;
  document.getElementById("correctAnswers").textContent = score;
  document.getElementById("incorrectAnswers").textContent = quizData.length-score;
  document.getElementById("accuracy").textContent = `${percent}%`;
  const timeTaken = Math.floor((Date.now()-quizStart)/1000);
  document.getElementById("timeSpent").textContent = `${Math.floor(timeTaken/60)}:${(timeTaken%60).toString().padStart(2,"0")}`;
  checkHighScore(percent);
  progressFill.style.width="100%";
}

function checkHighScore(p) {
  let hs = localStorage.getItem("quizHighScore")||0;
  if (p>hs){ localStorage.setItem("quizHighScore",p); document.getElementById("newHighScore").classList.remove("hidden"); }
  document.getElementById("highScoreDisplay").textContent = `${localStorage.getItem("quizHighScore")||0}%`;
}

function restartQuiz(){ startQuiz(); }
function goToStart(){
  resultsScreen.classList.add("hidden");
  quizInterface.classList.add("hidden");
  startScreen.classList.remove("hidden");
  document.getElementById("newHighScore").classList.add("hidden");
}
