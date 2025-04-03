// Script pro hru Marmari

//Moje reseni s frontendovou kontrolou kodu, coz neni idealni
const allCodes = ["1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888"]
const GameStartEl = document.querySelector('#game-start')

document.querySelector("#form-check-code").addEventListener("submit", (e) => {     // reaguji na spusteni formulare udalost "submit"
    e.preventDefault()      // zamezi nasledne akci po dokonceni udalosti - tzn. stranka se nenacte znova
    const codeInput = document.querySelector("#code-input").value
    const messageCode = document.querySelector("#message-code-check") 
    
    if(allCodes.includes(codeInput)) {
        messageCode.textContent = "✔ Your code is ok. Let's start!"
        messageCode.style.color = "green" 
        // Po zadani spravneho kodu se automaticky spusti hra po 1,5s
        setTimeout(() => {
           GameStartEl.classList.remove("hide-game") 
           document.querySelector('#section-code').style.display = "none"
        //   document.querySelector('#form-check-code').style.display = "none"
        //   document.querySelector('h1').style.display = "none"
        }, 2000);       
        
    } else {
        messageCode.textContent = "✖ Wrong code. Try again."
        messageCode.style.color = "red"    }

    console.log(`Vas zadany kod: ${codeInput}`)
})
// konec kontroly kodu

const buttonContinue1 = document.querySelector('#button-continue1')

// quiz 4 otazky -> odkryvaji mapu **********************************************************************************************************
const quizData = [
    {
        question: "Which of the villages is NOT located on the island of Kos?",
        options: ["Tigaki", "Mastichari", "Faliraki", "Kardamena"],
        answer: "Faliraki"
    },
    {
        question: "What doesn't belong in a Greek salad?",
        options: ["Tomato", "Onion", "Potato", "Feta"],
        answer: "Potato"
    },
    {
        question: "Which animal can you see while swimming in Marmari?",
        options: ["Whale", "Turtle", "Penguin", "Lobster"],
        answer: "Turtle"
    },
    {
        question: "Which island you can see from Marmari?",
        options: ["Rhodos", "Naxos", "Kalymnos", "Crete"],
        answer: "Kalymnos"
    },

];
  
const questionElement = document.getElementById("quiz-question");
const optionsElement = document.getElementById("quiz-options");
const submitButton = document.getElementById("submit-button");
const messageElement = document.getElementById("quiz__message");


let currentQuestion = 0;
let selectedAnswer = null
  
function showQuestion() {
    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;

    optionsElement.innerHTML = "";
    messageElement.innerText = ""; // Reset zprávy

    // Vytvoreni buttonu s odpovedmi
    question.options.forEach(option => {
      const button = document.createElement("button");
      button.innerText = option;
      button.classList.add("quiz__option"); // Přidáme třídu pro styling
      button.addEventListener("click", selectAnswer);      
      optionsElement.appendChild(button);      
    });
}
 
function selectAnswer(e) {
    // Reset barev všech tlačítek
    Array.from(optionsElement.children).forEach(btn => btn.style.backgroundColor = "");

    selectedAnswer = e.target;

}

function checkAnswer() {
    if (!selectedAnswer) return; // Pokud není odpověď vybraná, nic nedělej

    const corectAnswer = quizData[currentQuestion].answer;  
    if (selectedAnswer.innerText === corectAnswer) {
        const partId = `map-part${currentQuestion + 1}`;    // Sestavení ID části mapy napr. map-part1 👀👀
        document.getElementById(partId).classList.remove('hide-map');      

        messageElement.innerText = "Great, you got a part of the map!"; // Hláška při správné odpovědi
        messageElement.style.color = "green";

        currentQuestion++;
    
        setTimeout(() => {
            if (currentQuestion < quizData.length) {
                showQuestion();
            } else {
                showResult();
            }
        }, 1200); // Po 1.5s přejde na další otázku

    } else {
        console.log("wrong answer")
        selectedAnswer.style.backgroundColor = "red"; // Podbarvení špatné odpovědi
        messageElement.innerText = "Wrong answer, try again!";
        messageElement.style.color = "red";
    }
}
 
function showResult() {
    document.querySelector('#quiz-title').innerHTML = "Well played"
    questionElement.innerHTML = `
        <p>You got now your map and you can continue.</p>
        `;
    document.querySelector('#lets-start').style.display = "none"
    optionsElement.innerHTML = "";  // Vyčistíme možnosti
    submitButton.style.display = "none";  // Skryjeme tlačítko po dokončení
    messageElement.innerHTML = "";
    buttonContinue1.disabled = false;       // Odebere buttonu pro pokracovani disabled, aby se na nej mohlo kliknout
}
 
submitButton.addEventListener('click', checkAnswer);
showQuestion();
// konec kvizu ***************************************************************************************************************************

// Mapa - odkryvani - moje
// document.querySelectorAll('.show-map').forEach(btn => {
//     btn.addEventListener('click', (e) => {
//         const partId = `map-${e.target.id}`;    // Sestavení ID části mapy napr. map-part1 👀👀
//         console.log(partId)
//         document.getElementById(partId).classList.remove('hide-map');
//     });
// });


// Button Continue 1 - pokracovani hry po ziskani mapy
buttonContinue1.addEventListener('click', () => {
    document.querySelector('#game-part1').classList.remove('hide-game')
    GameStartEl.classList.add('hide-game')
})


// Otazky k mape
const clueNumbers = document.querySelectorAll('.clue-number')
const clues = document.querySelectorAll('.clue');

clueNumbers.forEach(number => {
    number.addEventListener('click', (e) => {
        console.log(e.target.innerText)
        clues.forEach(clue => clue.classList.add('hide'));        // Skryjeme vsechny clue/otazky, aby se zobrazovala pak jen jedna

        const selectedClue = `clue-${e.target.innerText}`       // Sestaveni ID otazky: clue-1 -> dle toho se zobrazi otazka k bodu
        document.getElementById(selectedClue).classList.remove('hide')
    })
})


// Button Continue 2 - pokracovani hry po vsech clues
const buttonContinue2 = document.querySelector('#button-continue2')
buttonContinue2.addEventListener('click', () => {
    document.querySelector('#game-part2').classList.remove('hide-game')
    document.querySelector('#game-part1').classList.add('hide-game')
})


// Kontrola zaverecneho kodu - jeste provizovni 👀
const allClueCodes = ["A", "B", "C", "D", "E" ]

document.querySelector("#form-end-code").addEventListener("submit", (e) => { 
    e.preventDefault()  
    let i = 0
    let rightCode = 0

    const allClueAnswers = document.querySelectorAll('.end-code')

    allClueAnswers.forEach(item => { 
        if (item.value.toUpperCase() === allClueCodes[i]) {
            item.style.backgroundColor = "green"
            rightCode++
        }
        else {
            console.log(i + " je spatne")
            item.style.backgroundColor = "red"
        }
        i++
    })

    if (rightCode === allClueCodes.length) {
        console.log("Vyhral jsi")
        document.querySelector('#treasure-chest').classList.remove('hide')
        document.querySelector('#form-end-code').classList.add('hide')
        document.querySelector('#title-chest').innerText = 'You are a winner!'
    }
    
})










// // BACKEND RESENI
// // Kontrola vstupniho kodu - s timhle mi pomahala AI - komunikace s backendem ? Jak nasadit na hosting - zeptat se Chat GPT 👀
// // platne kody jsou vypsane v souboru server.js
// // dalsi alternativa by bylo Firebase

// // document.querySelector("#form-check-code").addEventListener("submit", async (e) => {     
// //     e.preventDefault();
// //     const codeInput = document.querySelector("#code-input").value;

// //     // Pošleme kód na server
// //     const response = await fetch("http://localhost:4000/check-code", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ code: codeInput }),
// //     });

// //     const result = await response.json();

// //     if (result.valid) {
// //         document.querySelector("#message-code-check").textContent = "Kod OK";
// //         document.querySelector("#start-game").classList.remove("hide-game");
// //     } else {
// //         document.querySelector("#message-code-check").textContent = "Neplatný nebo použitý kód!";
// //     }
// // });
