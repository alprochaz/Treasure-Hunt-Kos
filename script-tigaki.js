// Script pro hru Tigaki

//Moje reseni s frontendovou kontrolou kodu, coz neni idealni
const allCodes = ["1111", "3333", "5555", "7777", "9999", "3597"]
const GameStartEl = document.querySelector('#game-start')

document.querySelector("#form-check-code").addEventListener("submit", (e) => {     // reaguji na spusteni formulare udalost "submit"
    e.preventDefault()      // zamezi nasledne akci po dokonceni udalosti - tzn. stranka se nenacte znova
    const codeInput = document.querySelector("#code-input").value
    const messageCode = document.querySelector("#message-code-check") 
    
    if(allCodes.includes(codeInput)) {
        messageCode.textContent = "✔ Your code is ok. Let's start!"
        messageCode.style.color = "green" 
        document.querySelector('#button-check-code').style.display = "none"
        // Po zadani spravneho kodu se automaticky spusti hra po 2s
        setTimeout(() => {
           GameStartEl.classList.remove("hide-game") 
           document.querySelector('#section-code').style.display = "none"
        }, 2000);       
        
    } else {
        messageCode.textContent = "✖ Wrong code. Try again."
        messageCode.style.color = "red"    
    }
})
// konec kontroly kodu

const buttonContinue1 = document.querySelector('#button-continue1')

// QUIZ 3 otazky -> odkryvaji mapu **********************************************************************************************************
const questionsTigaki = document.querySelectorAll('.quiz-tigaki__question')
questionsTigaki.forEach((question, index) => {
    const buttons = question.querySelectorAll("button")
    const correct = question.dataset.correct
    const message = question.querySelector(".quiz-tigaki__message");

    let locked = false;

    buttons.forEach(btn=>{

        btn.addEventListener("click", ()=>{
            if(locked) return;

            const answer = btn.textContent.charAt(0);

            if(answer === correct){
                // odkryje správný pruh mapy
                document.getElementById(`tigaki__map-part${index + 1}`)
                .classList.add("quiz-tigaki__revealed");

                // animované zmizení otázky
                question.style.opacity = "0";
                setTimeout(()=> question.style.display="none", 400);

                // Po ziskani vsech kousku mapy - hlaska a button Continue
                if(document.querySelectorAll(".quiz-tigaki__revealed").length === questionsTigaki.length){

                    document.querySelector('#lets-start-title').textContent = "Congratulation. You got the map! 🎉"
                    document.querySelector('#lets-start-info').textContent = "Your treasure hunt starts now. Click continue to uncover the clues."
                    // Odebere buttonu pro pokracovani disabled, aby se na nej mohlo kliknout, pokud zodpovi vsechny otazky spravne
                    buttonContinue1.disabled = false;

                    // scroll nahoru
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }

            } else {
                locked = true;
                let time = 5;
                message.textContent = `Upps. That's wrong. Try again in... (${time}s)`;

                const interval = setInterval(()=>{
                    time--;
                    message.textContent = `Think again... (${time}s)`;

                    if(time === 0){
                        clearInterval(interval);
                        message.textContent = "";
                        locked = false;
                    }
                },1000);
            }
        });
    });
})


// konec quizu ***************************************************************************************************************************


// Button Continue 1 - pokracovani hry po ziskani mapy
buttonContinue1.addEventListener('click', () => {
    document.querySelector('#game-part1').classList.remove('hide-game')
    GameStartEl.classList.add('hide-game')
    // scroll nahoru
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
})


// Otazky k mape
const clueNumbers = document.querySelectorAll('.clue-number')
const clues = document.querySelectorAll('.clue');

clueNumbers.forEach(number => {
    number.addEventListener('click', (e) => {
        console.log(e.target.innerText)
        clues.forEach(clue => clue.classList.add('hide'))        // Skryjeme vsechny clue/otazky, aby se zobrazovala pak jen jedna
        document.querySelector('#clue-number-first').classList.remove('clue-number-first')             // odebereme zvyrazneni prvniho clue

        const selectedClue = `clue-${e.target.innerText}`       // Sestaveni ID otazky: clue-1 -> dle toho se zobrazi otazka k bodu
        document.getElementById(selectedClue).classList.remove('hide')
    })
})


// Tabulka flexbox s abecedou sifrou - 1. otazka
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const numbers = [
4,1,7,3,9,6,0,2,5,8,
1,2,6,9,1,4,7,3,0,2,
1,9,1,4,7,5
];

const table = document.getElementById("tableAbc");

letters.forEach((letter, index) => {

  const column = document.createElement("div");
  column.classList.add("column-abc");

  const topCell = document.createElement("div");
  topCell.classList.add("cell-abc");
  topCell.textContent = letter;

  const bottomCell = document.createElement("div");
  bottomCell.classList.add("cell-abc");
  bottomCell.textContent = numbers[index];

  column.appendChild(topCell);
  column.appendChild(bottomCell);

  table.appendChild(column);

});




// Button Continue 2 - pokracovani hry po vsech clues -> dale na zadani kodu
const buttonContinue2 = document.querySelector('#button-continue2')
buttonContinue2.addEventListener('click', () => {
    document.querySelector('#game-part2').classList.remove('hide-game')
    document.querySelector('#game-part1').classList.add('hide-game')
    // scroll nahoru
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})


// Button Go back to clues
const buttonGoBackToClues = document.querySelector('#go-back-to-clues')
buttonGoBackToClues.addEventListener('click', () => {
    document.querySelector('#game-part1').classList.remove('hide-game')
    document.querySelector('#game-part2').classList.add('hide-game')
})


// Tabulka flexbox konecnou sifrou 
const codeNumbers = [];
const codeLetters = "SMOVAPNOKALIRZET".split("");

const codeTable = document.getElementById("table-game-code");

codeLetters.forEach((letter, index) => {

  const column = document.createElement("div");
  column.classList.add("column-game-code");

  const topCell = document.createElement("div");
  topCell.classList.add("cell-game-code");
  topCell.textContent = index;

  const bottomCell = document.createElement("div");
  bottomCell.classList.add("cell-game-code");
  bottomCell.textContent = letter;

  column.appendChild(topCell);
  column.appendChild(bottomCell);

  codeTable.appendChild(column);

});

// Kontrola zaverecneho kodu 
const allClueCodes = ["E", "V", "A", "P", "O", "R", "A", "T", "I", "O", "N"]

document.querySelector("#form-end-code").addEventListener("submit", (e) => { 
    e.preventDefault()  
    let i = 0
    let rightCode = 0

    const allClueAnswers = document.querySelectorAll('.end-code')

    allClueAnswers.forEach(item => { 
        if (item.value.toUpperCase() === allClueCodes[i]) {
            item.style.background = "#01c001"
            rightCode++
        }
        else {
            // console.log(i + " je spatne")
            item.style.background = "#f32b2b"
        }
        i++
    })

    if (rightCode === allClueCodes.length) {
        // Co se deje, kdyz je kod spravny
        document.querySelector('#treasure-chest').classList.remove('hide')
        document.querySelector('#form-end-code').classList.add('hide')
        document.querySelector('#chifre-end-code').classList.add('hide')
        document.querySelector('#go-back-to-clues').style.display = "none"
        document.querySelector('#title-chest').innerText = "Congratulations! "
        document.querySelector('#message-winner').innerHTML = `
            <p> You solved the secret code and opened the Tigaki treasure chest. </p>
            <p><strong> Your reward code: ALYKES-567 </strong></p>
            <p> Show this code at Alykes Restaurant to claim your treasure reward. </p>
            `
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    } else {
        document.querySelector('#message-end-code').textContent = "Oops! It looks like there's a mistake. Fix the red fields and try again!"
        document.querySelector('#message-end-code').style.color = "red"
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
