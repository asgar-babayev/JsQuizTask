

let count = 0;


function GetFirstQuestion() {
    fetch("https://restcountries.com/v3.1/subregion/europe")
        .then(response => response.json())
        .then(data => {
            let index = Math.floor(Math.random() * data.length);
            let src = data[index].flags.png;
            document.querySelector("img").setAttribute("src", src);
            let btns = document.querySelectorAll(".btns");
            let btnCount = Math.floor(Math.random() * btns.length);
            btns[btnCount].innerText = data[index].name.common;
            for (let i = 0; i < btns.length; i++) {
                if (btns[btnCount] == btns[i]) {
                    continue;
                }
                let rnum = Math.floor(Math.random() * data.length);
                btns[i].innerText = data[rnum].name.common;
            }
            let isTrue = data[index].name.common.toLowerCase();
            data.splice(index, 1);
            btns.forEach(x => {
                x.addEventListener("click", function () {
                    console.log(data[index].name.common.toLowerCase());
                    if (this.innerText.toLowerCase() == isTrue) {
                        swal("Good job!", "Skip to the next question!", "success");
                        count++;
                        document.querySelector("h4").innerText = `Score: ${count}`;
                        document.querySelectorAll(".btns").forEach(x => x.disabled = true);
                    }
                    else {
                        swal(`This answer is wrong. The correct answer was this: ${isTrue.toUpperCase()}!`, "Skip to the next question", "error");
                        document.querySelectorAll(".btns").forEach(x => x.disabled = true);
                    }
                })
            })
        })
}

checkQuestion();
checkCount();

function checkQuestion() {
    if (!localStorage.getItem("question")) {
        localStorage.setItem("question", JSON.stringify([]))
    }
}
function checkCount() {
    if (!localStorage.getItem("count")) {
        localStorage.setItem("count", JSON.stringify([]))
    }
}

let btnStart = document.getElementById("btnStart");
let btnNext = document.getElementById("btnNext");


function TimeUp() {
    let count = (document.querySelector(".second").value * document.querySelector(".ques").value);

    x = setInterval(() => {
        localStorage.setItem("count", JSON.stringify(count));
        let countl = JSON.parse(localStorage.getItem("count"));
        if (count > 0) {
            --count;
            countl--;
        }
        let data = {
            score: document.querySelector("h4").innerText.substring(7, document.querySelector("h4").innerText.length),
            img: document.querySelector("img").getAttribute("src"),
            input1: document.querySelector(".second").value,
            input2: document.querySelector(".ques").value,
            btna: btnA.innerText,
            btnb: btnB.innerText,
            btnc: btnC.innerText,
            btnd: btnD.innerText
        }
        localStorage.setItem("question", JSON.stringify(data));
        let localcount = JSON.parse(localStorage.getItem("count"));
        document.querySelector("span").innerText = `Secondary: ${localcount}`;
        if (localcount == 0) {
            count = 0;
            btnStart.disabled = false;
            btnNext.disabled = true;
            btnSubmit.disabled = true;
            clearInterval(x);
            document.querySelectorAll(".btns").forEach(x => x.disabled = true);
            swal(`Time is up`, "info");
        }
        document.querySelectorAll(".btns").forEach(y => {
            y.addEventListener("click", function () {
                btnNext.disabled = false;
                btnSubmit.disabled = false;
            })
        });
        btnSubmit.addEventListener("click", function () {
            let yourscore = document.querySelector("h4").innerText;
            if (yourscore.substring(7, yourscore.length) <= 1) {
                count = 0;
                localStorage.setItem("count", JSON.stringify(count));
                btnSubmit.disabled = true;
                btnStart.disabled = false;
                swal(`${yourscore}`, "Your score is bad!", "error");
                clearInterval(x);
            }
            else {
                count = 0;
                localStorage.setItem("count", JSON.stringify(count));
                btnSubmit.disabled = true;
                btnStart.disabled = false;
                swal(`${yourscore}`, "Your score is good!", "success");
                clearInterval(x);
            }
        })
    }, 1000);
}

let nextCount = 0;

btnStart.addEventListener("click", function () {
    btnNext.classList.remove("d-none");
    btnSubmit.classList.add("d-none");
    document.querySelectorAll(".btns").forEach(x => x.disabled = false);
    btnNext.disabled = true;
    let second = document.querySelector(".second").value;
    let question = document.querySelector(".ques").value;
    if (second.trim() != "" && question.trim() != "") {
        count = 0;
        document.querySelector("h4").innerText = `Score: ${count}`;
        this.disabled = true;
        nextCount = document.querySelector(".ques").value;
        GetFirstQuestion();
        let x;
        TimeUp(x);
    }
    else
        swal(`Inputs cannot be left blank`, "Enter value please", "error");
})


btnNext.addEventListener("click", function () {
    --nextCount;
    if (nextCount == 1) {
        btnNext.classList.add("d-none");
        btnSubmit.classList.remove("d-none");
    }
    document.querySelectorAll(".btns").forEach(x => x.disabled = false);
    this.disabled = true;
    GetFirstQuestion();
})



disabledeveryting();
function disabledeveryting() {
    document.querySelectorAll(".btns").forEach(x => x.disabled = true);
    btnNext.disabled = true;
    btnSubmit.disabled = true;
}

let input = document.querySelectorAll("input");


input.forEach(x => {
    x.onkeydown = function () {
        if (this.value.trim() < 1) {
            this.value = "";
        }
    }
})

input.forEach(x => {
    x.onkeyup = function () {
        if (this.value.trim() < 1) {
            this.value = "";
        }
    }
})