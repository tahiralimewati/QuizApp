const quiz = [
  {
    question: 'Which is the largest animal in the world ?',
    answer : [
      {text: 'Shark', currect: false},
      {text: 'Blue Bhale',currect: true},
      {text: 'Elephant', currect: false},
      {text: 'Giraf', currect:false},
    ]
  },
  {
    question: 'Which is the largest tower in the world ?',
    answer : [
      {text: 'Kutub Minar', currect: false},
      {text: 'Mount Abrest',currect: false},
      {text: 'Burj Khalifa', currect: true},
      {text: 'CN Tower', currect:false},
    ]
  },
  {
    question: 'Most ODI Hundred in the cricket ?',
    answer : [
      {text: 'Virat Kohli', currect: true},
      {text: 'Riky Ponting',currect: false},
      {text: 'Sachin Tendulkar', currect: false},
      {text: 'Rohit Sharma', currect:false},
    ]
  },
  {
     question: 'Most ODI wicket  in the world cup for India  ?',
    answer : [
      {text: 'Zaheer Khan', currect: false},
      {text: 'MD Shami',currect: true},
      {text: 'Bumrah', currect: false},
      {text: 'R.Aswin', currect:false},
    ]
  },
]
//  here will be get element 
const quesElement= document.getElementById('Qustison');


const ansButtons = document.querySelector('.answer-buttons');

const nextBtn = document.getElementById('next-btn');

const preBtn = document.getElementById('pre-btn');


//here will be create var index and score

let currentQuesInd = 0;
let score = 0;

function startQuiz() {
  currentQuesInd = 0;
  score = 0;
  nextBtn.innerHTML ='Next';
  preBtn.innerHTML = 'Previous';
  showQues()
 
}

function showQues(){
  resetState()
  let currentQues = quiz[currentQuesInd];
  let quesNumber = currentQuesInd + 1;
  quesElement.innerHTML = quesNumber + '.' + currentQues.question;

  currentQues.answer.forEach( ans =>{
    const button = document.createElement('button');
    button.innerHTML =ans.text;
    button.classList.add('btn');
    ansButtons.appendChild(button);

    if (ans.currect) {
       button.dataset.currect = ans.currect
    }
    button.addEventListener('click',choseAns)
  })
}
 function resetState(){
  preBtn.style.display= 'none'
  nextBtn.style.display = 'block'
  while (ansButtons.firstChild) {
    ansButtons.removeChild(ansButtons.firstChild)
  }
 }

 function choseAns(e){
  const  chooseBtn = e.target;
  const isCorrect = chooseBtn.dataset.currect === 'true'
  if (isCorrect) {
    chooseBtn.classList.add('currect')
    score++;
  }else{
    chooseBtn.classList.add('incurrect')
    
  }
   // only onetime click show the ans
   Array.from(ansButtons.children).forEach(button=>{
    if (button.dataset.currect==='true') {
        button.classList.add('currect')
    } 
    button.disabled =true;
   })
   
   preBtn.style.display = 'block'
   nextBtn.style.display ='block'

 }
  function showScore(){
    resetState();
    quesElement.innerHTML = `You scored ${score} out of ${quiz.length}`
    nextBtn.innerHTML ='Play Again';
    nextBtn.style.display = 'block'
  }
   
  
 function handlePreBtn(){
  currentQuesInd--;
  if (currentQuesInd < quiz.length) {
    showQues()
  }
 } 
 
  preBtn.addEventListener('click',()=>{
    if (currentQuesInd < quiz.length) {
      handlePreBtn();
    }
   }) 


  function handleNextBtn(){
    currentQuesInd++;
    if (currentQuesInd <quiz.length) {
      showQues();
    }else{
      showScore();
    }
  }

 nextBtn.addEventListener('click',()=>{
  if (currentQuesInd < quiz.length) {
    handleNextBtn();
  }else{
    startQuiz();
  }
 })
startQuiz();
