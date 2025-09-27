const questions=[{
    question: "Which planet is known as the Red Planet?" ,
    answers:[
        {text:"a) Venus",correct:false},
        {text:"b) Jupiter", correct:false},
        {text:"c) Mars", correct:true}, 
        {text:"d) Saturn", correct:false}

    ]},
    {
        question: "Who wrote the novel Harry Potter?",
        answers:[
            
                {text:"a) Stephen King",correct:false},
                {text:"b) J.K. Rowling",correct:true},
                {text:"c) George Orwell",correct:false},
                {text:"d) Jane Austen",correct:false},
            
        ]
    },
    {
        question: "What is the capital city of France?",
        answers:[
            
                {text:"a) Berlin",correct:false},
                {text:"b) Rome",correct:false},
                {text:"c) London",correct:false},
                {text:"d) Paris",correct:true},
            
        ]
    },
    {
        question: "Which of these is a gas absorbed by plants for photosynthesis?",
        answers:[
            
                {text:"a) Oxygen",correct:false},
                {text:"b) Carbon Dioxide",correct:true},
                {text:"c) Nitrogen",correct:false},
                {text:"d) Hydrogen",correct:false},
            
        ]
    },
    {
        question: "What is the largest continent in the world by land area? ",
        answers:[
            
                {text:"a) Africa",correct:false},
                {text:"b) Asia",correct:true},
                {text:"c) Europe",correct:false},
                {text:"d) North America",correct:false},
            
        ]
    },

];

const questionElement= document.getElementById("ques");
const ansButton= document.getElementById("ans-button");
const nextButton= document.getElementById("next-button");

let currentquestionindex=0;
let score=0;

function startquiz(){
    currentquestionindex=0;
    score=0;
    nextButton.innerHTML="Next";
    showquestion();
}
function showquestion(){
    resestState();
    let currentquestion= questions[currentquestionindex];
    let quesnumber= currentquestionindex + 1;
    questionElement.innerHTML=quesnumber+"."+currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button= document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
    });   
}
