const btnBegin = document.getElementById('btnBegin')
const blue = document.getElementById('blue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const LAST_LEVEL = 10
let countDownTime = 3
let actual_level = document.getElementById('actual_level')


class Game {
    constructor () {
        this.countDown()
    }

    countDown() {
        btnBegin.textContent = countDownTime;

        if(countDownTime == 0){
            this.begin()
            this.generateSequence()
            setTimeout(() => this.nextLevel(), 500)
        }
        else{
            countDownTime -= 1;
            setTimeout(() => this.countDown(),1000);
        }
    }


    begin() {
     
        this.choseColor = this.choseColor.bind(this)
        
        this.toggleBtnBegin()

        this.level = 1
        this.showActualLevel(this.level)
        
 
        this.colors = {
            blue,
            violet,
            orange,
            green
        }
    }

    toggleBtnBegin () {
        if (btnBegin.classList.contains('hide')){
            btnBegin.classList.remove('hide')
            btnBegin.textContent = "Start Game!"
        }
        else {
            btnBegin.classList.add('hide')
        }
    }


    generateSequence() {
   
        this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }


    nextLevel() {
        this.correctAnswers = 0
        this.illuminateSequence()
        this.addClickEvents()
    }


    transformNumberToColor(number) {
        switch(number) {
            case 0:
                return 'blue'
            case 1:
                return 'violet'
            case 2:
                return 'orange'
            case 3:
                return 'green'
        }
    }


    transformColorToNumber(color) {
        switch(color) {
            case 'blue':
                return 0
            case 'violet':
                return 1
            case 'orange':
                return 2
            case 'green':
                return 3
        }
    }


    illuminateSequence() {
        for (let i = 0; i < this.level; i++){
            const color = this.transformNumberToColor(this.sequence[i])
            setTimeout(() => this.illuminateColor(color), 1000 * i)
        }
    }


    illuminateColor(color) {
        this.colors[color].classList.add('light')
        setTimeout(() => this.turnOffColor(color), 350)
    }


    turnOffColor(color) {
        this.colors[color].classList.remove('light')
    }


    addClickEvents() {
       
        this.colors.blue.addEventListener('click', this.choseColor) 
        this.colors.violet.addEventListener('click', this.choseColor)
        this.colors.green.addEventListener('click', this.choseColor)
        this.colors.orange.addEventListener('click', this.choseColor)
    }


    eliminateClickEvents() {
        this.colors.blue.removeEventListener('click', this.choseColor) 
        this.colors.violet.removeEventListener('click', this.choseColor)
        this.colors.green.removeEventListener('click', this.choseColor)
        this.colors.orange.removeEventListener('click', this.choseColor)
    }


    choseColor(ev) {
        const colorName = ev.target.dataset.color
        const colorNumber = this.transformColorToNumber(colorName)
        
        this.illuminateColor(colorName)

        if (colorNumber === this.sequence[this.correctAnswers]) {
            this.correctAnswers++
            if (this.correctAnswers === this.level) {
                this.level++
                this.showActualLevel(this.level)
                this.eliminateClickEvents()
                if (this.level === (LAST_LEVEL + 1)) {
                    this.winGame()
                }
                else {
                    setTimeout(() => {
                        this.nextLevel()
                    }, 1200)
                }
            }
        }
        else {
            this.gameOver()
        }
    }

    showActualLevel (level) {
        if (level != (LAST_LEVEL + 1)){
            actual_level.textContent = `Level: ${level}`;
        }
    }

    winGame() {
      
        swal("Juego simón dice.","Felicidades! Has ganado !", "success")
            .then(() => this.begin())
    }

    gameOver() {
        
        swal("Juego simón dice.","Has perdido! :(", "error")
            .then(() => {
                this.eliminateClickEvents()
                this.begin()
            })
    }

}


function beginGame () {
    window.game = new Game()
}