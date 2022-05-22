const quizData = [
    {
        question : 'Inside which HTML element do we put the JavaScript?',
        a : '<scripting>',
        b : '<javascript>',
        c : '<js>',
        d : '<script>',
        correct : 'b'
    }, {
        question : 'Which of the following will write the message “Hello DataFlair!” in an alert box?',
        a : 'alertBox(“Hello DataFlair!”);',
        b : 'alert(Hello DataFlair!);',
        c : 'msgAlert(“Hello DataFlair!”);',
        d : 'alert(“Hello DataFlair!”);',
        correct : 'd' 
    }, {
        question : 'How do you find the minimum of x and y using JavaScript?',
        a : 'min(x,y)',
        b : 'Math.min(x,y)',
        c : 'Math.min(xy)',
        d : 'min(xy)',
        correct : 'b' 

    }, {
        question : 'Which are the correct “if” statements to execute certain code if “x” is equal to 2?',
        a : 'if(x 2)',
        b : 'if(x = 2)',
        c : 'if(x == 2)',
        d : 'if(x != 2 )',
        correct : 'c' 

    }, {
        question : `What will the code return?
        Boolean(3 < 7)`,
        a : 'true',
        b : 'false',
        c : 'NaN',
        d : 'SyntaxError',
        correct : 'a' 

    }
]
const questionEl = document.querySelector('#question');
const a_text = document.querySelector('#a_text');
const b_text = document.querySelector('#b_text');
const c_text = document.querySelector('#c_text');
const d_text = document.querySelector('#d_text');
const submitBtn = document.querySelector('#submit');
const quizContainer = document.querySelector('#quiz');
const answersEl = document.querySelectorAll('.answer');

let currentQuiz = 0;
let score = 0;

const loadQuiz = () => {
    
    desectAnswer();

    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

const desectAnswer = () => {
    answersEl.forEach(answerEl => {
        answerEl.checked = false;
    });
}

const getSelected = () => {
    let answer = undefined;

    answersEl.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });

    return answer;
}

submitBtn.addEventListener('click',event => {
    const answer = getSelected();

    if(answer) {

        if(answer === quizData[currentQuiz].correct){
            score ++ ;
        }

        currentQuiz++;
        if(currentQuiz < quizData.length) {
            loadQuiz();
        }else{

            quizContainer.innerHTML = `<h2>Congratulations,
            You have completed quiz successfully!!!</h2>
            
            <h2>You have correctly replied ${score} out of ${quizData.length}</h2>`;
            quizContainer.insertAdjacentHTML('beforeend',`<button onclick="location.reload()">Reload</button>`);
        }  
    }else{
        const errorDiv = document.createElement('div');  
        errorDiv.classList.add('error');
        errorDiv.innerText = 'Please select answer!';
        questionEl.before(errorDiv);
        submitBtn.disabled = true;
        setTimeout(() => {
            errorDiv.remove();
            submitBtn.disabled = false;
        },3000);
    }
})

loadQuiz();