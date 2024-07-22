const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "javascript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
    {
        question: "What vitamin is given by the sun?",
        a: "Vitamin C",
        b: "Vitamin D",
        c: "Vitamin K",
        d: "Vitamin A",
        correct: "b",
    }
    
];
const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionTextEl = document.getElementById('question-text')
const questionCountEl = document.getElementById('question-count');
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
const icons = {
    a: document.getElementById('a_icon'),
    b: document.getElementById('b_icon'),
    c: document.getElementById('c_icon'),
    d: document.getElementById('d_icon')
};
let currentQuiz = 0
let score = 0
loadQuiz()
function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    questionTextEl.innerText = currentQuizData.question
    questionCountEl.innerText = `Question ${currentQuiz + 1} of ${quizData.length}`;
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
    resetIcons();
}
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}
function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}
function resetIcons() {
    Object.keys(icons).forEach(key => {
        icons[key].innerHTML = '';
    });
}

function showIcons(correctAnswer, selectedAnswer) {
    Object.keys(icons).forEach(key => {
        if (key === correctAnswer) {
            icons[key].innerHTML = '✔'; // Correct icon (check mark)
        } else if (key === selectedAnswer) {
            icons[key].innerHTML = '✘'; // Incorrect icon (cross mark)
        }
    });
}
submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        const correctAnswer = quizData[currentQuiz].correct;
        showIcons(correctAnswer, answer);

        if (answer === correctAnswer) {
            score++;
        }

        setTimeout(() => {
            currentQuiz++;
            if (currentQuiz < quizData.length) {
                loadQuiz();
            } else {
                quiz.innerHTML = `
                    <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                    <button onclick="location.reload()">Reload</button>
                `;
            }
        }, 1000); // Wait for 1 second before loading the next question
    } else {
        alert('Please select an answer before submitting.');
    }
});
