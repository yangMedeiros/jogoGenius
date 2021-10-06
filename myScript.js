//Seleciona cada parte do genius, que são as classes definidas no arquivo style.css
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

function resetTab() {
    blue.style.babackgroundColor = '#0000ff'
    red.style.babackgroundColor = '#ff0000'
    green.style.babackgroundColor = '#008000'
    yellow.style.babackgroundColor = '#ffff00'
}

class Game {
    constructor() {
        this.colors = [green, red, yellow, blue];
        this.greetings();
    }

    addStepSeq() {
        resetTab();
        this.seq.push(this.colors[(Math.floor(Math.random() * 4))]);
        this.userSeq = [];
        this.displaySeq();
    }

    displaySeq() {
        this.seq.forEach((step, index) => {
            setTimeout(() => {
                this.displayColor(step, index)
            }, this.timeInterval * index)
        })
    }

    displayColor(color, index) {
        const waitTime = index === -1 ? 200 : this.timeInterval;
        const p1 = new Promise((res, rej) => {
            setTimeout(() => {
                res(color.classList.add('selected'));
            }, 100);
        }).then(
            setTimeout(() => {
                color.classList.remove('selected');
            }, waitTime)
        ).then(
            setTimeout(() => {
                resetTab()
            }, 200)
        )
    }

    greetings() {
        alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
        resetTab();
        this.score = 0;
        this.seq = [];
        this.userSeq = [];
        this.timeInterval = 500;
        this.wantNewGame = true;
        this.addStepSeq();
    }

    userClick(colorIndex) {
        if (this.wantNewGame) {
            this.userSeq.push(this.colors[colorIndex]);
            this.displayColor(this.colors[colorIndex], -1)
            this.checkOrder();
        }

    }

    checkOrder() {
        setTimeout(() => {
            if (this.userSeq.some((el, i) => el != this.seq[i])) {
                this.gameOver();
            }

            if (this.userSeq.length && this.userSeq.length == this.seq.length) {
                alert(`Pontuação: ${this.score}\nVocê acertou! Iniciando próximo nível!`);
                this.nextLevel();
            }
        }, 250);
    }

    nextLevel() {
        this.score++;
        if (!(this.score % 5)) {
            this.timeInterval = Math.floor((this.timeInterval) / 2);
        }
        this.addStepSeq();
    }

    gameOver() {
        this.wantNewGame = false;
        if (confirm(`Pontuação: ${this.score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`)) {
            this.wantNewGame = true;
            this.greetings();
        }
    }
}

const jogo = new Game();


//eventos de clique para as cores
green.onclick = () => jogo.userClick(0);
red.onclick = () => jogo.userClick(1);
yellow.onclick = () => jogo.userClick(2);
blue.onclick = () => jogo.userClick(3);
