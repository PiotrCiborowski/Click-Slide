import { clickPiece } from './player'
import * as globalVariables from './globalVariables'

export default class Game
{
    //boxSize: number
    //tab = []
    //tab2 = []
    liczba: number
    //temp: any
    //tempArray: any
    //text = "Image1.gif"
    //bool: boolean = false
    //randomize: number
    randomTemp: number
    cx: number
    cy: number
    t: number
    timing: number

    //myTimer: number
    //victory: number
    picture: number = 1
    sliderPos: number = 1
    lastDirection: number
    wasHere: number = 0

    constructor()
    {
        let buttonLeft = document.getElementById("left");
        let buttonRight = document.getElementById("right");
        let three = document.getElementById("trzy");
        let four = document.getElementById("cztery");
        let five = document.getElementById("piec");
        let six = document.getElementById("szesc");

        buttonLeft.addEventListener("click", (e:Event) => this.changePhoto("left"))
        buttonRight.addEventListener("click", (e:Event) => this.changePhoto("right"))
        three.addEventListener("click", (e:Event) => this.getSliced(3))
        four.addEventListener("click", (e:Event) => this.getSliced(4))
        five.addEventListener("click", (e:Event) => this.getSliced(5))
        six.addEventListener("click", (e:Event) => this.getSliced(6))
    }

    deletingArrays()
    {
        for (let y = 0; y < (globalVariables.boxSize + 2); y++)
        {
            for (let x = 0; x < (globalVariables.boxSize + 2); x++)
            {
                globalVariables.tab.splice(0, (globalVariables.boxSize + 2))
            }
        }
        for (let i = 0; i < (globalVariables.boxSize * globalVariables.boxSize); i++)
        {
            delete globalVariables.tab2[i]
        }
    }

    getSliced(n: number)
    {
        this.deletingArrays()
        document.getElementById("plansza").innerHTML = null
        document.getElementById("blokada").style.zIndex = "-1"
        globalVariables.changeVictory(0)
        globalVariables.changeBool(true)
        globalVariables.changeBoxSize(n)
        globalVariables.changeRandomize(n * n * 10)
        for (let y = 1; y < (n + 1); y++)
        {
            for (let x = 1; x < (n + 1); x++)
            {
                 document.getElementById("plansza").innerHTML += '<div class="klocek" id="k' + x + y + '" style="width: ' + (600 / n) +'px; height: ' + (600 / n) + 'px;" value="' + x + ' ' + y + ' ' + n + '">'
                 document.getElementById("k" + x + y).style.backgroundImage = "url('assets/" + globalVariables.text + "')"
            }
        }
        
        for (let y = 1; y < (n + 1); y++)
        {
            for (let x = 1; x < (n + 1); x++)
            {
                 let top = (y - 1) * (600 / n)
                 let left = (x - 1) * (600 / n)
                 document.getElementById("k" + x + y).style.backgroundPosition = "-" + left + "px -" + top + "px"
            }
        }

        for (let y = 0; y < (n + 2); y++)
        {
            globalVariables.tab[y] = []
            for (let x = 0; x < (n + 2); x++)
            {
                globalVariables.tab[y][x] = -1
            }
        }
        
        this.liczba = (n * n) - 1
        
        for (let y = 1; y < (n + 1); y++)
        {
            for (let x = 1; x < (n + 1); x++)
            {
                globalVariables.tab[y][x] = this.liczba
                this.liczba--
            }
        }
        
        for (let y = 1; y < (n + 1); y++)
        {
            for (let x = 1; x < (n + 1); x++)
            {
                let forClicking = <HTMLInputElement>document.getElementById("k" + x + y)
                document.getElementById("k" + x + y).addEventListener("click", (e:Event) => clickPiece(forClicking.getAttribute('value')))
            }
        }
        
        this.eraseZero(n)
        
        globalVariables.changeTimer(setInterval(() => {this.randomPieces()}, 5))
    }

    randomPieces()
    {
        document.getElementById("blokadaTrzy").style.zIndex = "5"
        document.getElementById("blokadaCztery").style.zIndex = "5"
        document.getElementById("blokadaPiec").style.zIndex = "5"
        document.getElementById("blokadaSzesc").style.zIndex = "5"
        document.getElementById("blokadaLeft").style.zIndex = "5"
        document.getElementById("blokadaRight").style.zIndex = "5"
        
        let direction = Math.floor((Math.random() * 10) % 4)
        
        while(this.lastDirection == direction)
        {
            direction = Math.floor((Math.random() * 10) % 4)
        }
        for (let y = 1; y < (globalVariables.boxSize + 1); y++)
        {
            if(this.wasHere != 0)
            {
                this.wasHere = 0
                break
            }
            for (let x = 1; x < (globalVariables.boxSize + 1); x++)
            {
                if(globalVariables.tab[y][x] == 0)
                {
                    if(direction == 0)
                    {
                        if(globalVariables.tab[y - 1][x] > 0)
                        {
                            this.lastDirection = 2
                            this.wasHere = 1
                            globalVariables.swapPieces(x, (y - 1), globalVariables.boxSize)
                            break
                        }
                    }
                    if(direction == 1)
                    {
                        if(globalVariables.tab[y][x + 1] > 0)
                        {
                            this.lastDirection = 3
                            this.wasHere = 1
                            globalVariables.swapPieces((x + 1), y, globalVariables.boxSize)
                            break
                        }
                    }
                    if(direction == 2)
                    {
                        if(globalVariables.tab[y + 1][x] > 0)
                        {
                            this.lastDirection = 0
                            this.wasHere = 1
                            globalVariables.swapPieces(x, (y + 1), globalVariables.boxSize)
                            break
                        }
                    }
                    if(direction == 3)
                    {
                        if(globalVariables.tab[y][x - 1] > 0)
                        {
                            this.lastDirection = 1
                            this.wasHere = 1
                            globalVariables.swapPieces((x - 1), y, globalVariables.boxSize)
                            break
                        }
                    }
                }
            }
        }
    }

    eraseZero(n: number)
    {
        let erase = n
        
        document.getElementById("k" + erase + erase).style.backgroundImage = null
    }

    /*clickPiece(i)
    {
        let tabClick = i.split(" ")
        this.cx = Number(tabClick[0])
        this.cy = Number(tabClick[1])
        this.t = Number(tabClick[2])
        
        if(this.cx == 0 && this.cy == 0)
        {
            if(tab[this.cy][this.cx + 1] == 0 || tab[this.cy + 1][this.cx] == 0)
            {
                this.swapPieces(this.cx, this.cy, (this.t + 1))
                //true
            }
        }
        if(this.cx > 0 && this.cx < this.t && this.cy == 0)
        {
            if(tab[this.cy][this.cx - 1] == 0 || tab[this.cy][this.cx + 1] == 0 || tab[this.cy + 1][this.cx] == 0)
            {
                this.swapPieces(this.cx, this.cy, (this.t + 1))
                //true
            }
        }
        if(this.cx == this.t && this.cy == 0)
        {
            if(tab[this.cy][this.cx - 1] == 0 || tab[this.cy + 1][this.cx] == 0)
            {
                this.swapPieces(this.cx, this.cy, (this.t + 1))
                //true
            }
        }
        if(this.cx == 0 && this.cy > 0 && this.cy < this.t)
        {
            if(tab[this.cy][this.cx + 1] == 0 || tab[this.cy - 1][this.cx] == 0 || tab[this.cy + 1][this.cx] == 0)
            {
                this.swapPieces(this.cx, this.cy, (this.t + 1))
                //true
            }
        }
        if(this.cx > 0 && this.cx < this.t && this.cy > 0 && this.cy < this.t)
        {
            if(tab[this.cy][this.cx - 1] == 0 || tab[this.cy][this.cx + 1] == 0 || tab[this.cy - 1][this.cx] == 0 || tab[this.cy + 1][this.cx] == 0)
            {
                this.swapPieces(this.cx, this.cy, (this.t + 1))
                //true
            }
        }
        if(this.cx == this.t && this.cy > 0 && this.cy < this.t)
        {
            if(tab[this.cy][this.cx - 1] == 0 || tab[this.cy - 1][this.cx] == 0 || tab[this.cy + 1][this.cx] == 0)
            {
                this.swapPieces(this.cx, this.cy, (this.t + 1))
                //true
            }
        }
        if(this.cx == 0 && this.cy == this.t)
        {
            if(tab[this.cy][this.cx + 1] == 0 || tab[this.cy - 1][this.cx] == 0)
            {
                this.swapPieces(this.cx, this.cy, (this.t + 1))
                //true
            }
        }
        if(this.cx > 0 && this.cx < this.t && this.cy == this.t)
        {
            if(tab[this.cy][this.cx - 1] == 0 || tab[this.cy][this.cx + 1] == 0 || tab[this.cy - 1][this.cx] == 0)
            {
                this.swapPieces(this.cx, this.cy, (this.t + 1))
                //true
            }
        }
        if(this.cx == this.t && this.cy == this.t)
        {
            if(tab[this.cy][this.cx - 1] == 0 || tab[this.cy - 1][this.cx] == 0)
            {
                this.swapPieces(this.cx, this.cy, (this.t + 1))
                //true
            }
        }
    }*/

    /*swapPieces(cx: number, cy: number, n: number)
    {
        this.tempArray = tab[cy][cx]
        this.temp = document.getElementById("k" + cx + cy).style.backgroundPosition
        for (let y = 1; y < (n + 1); y++)
        {
            for (let x = 1; x < (n + 1); x++)
            {
                if(tab[y][x] == 0)
                {
                    tab[y][x] = this.tempArray
                    document.getElementById("k" + x + y).style.backgroundImage = "url('assets/" + this.text + "')"
                    document.getElementById("k" + x + y).style.backgroundPosition = this.temp
                }
            }
        }
        tab[cy][cx] = 0
        document.getElementById("k" + cx + cy).style.backgroundImage = null			
        if(this.randomize == 0)
        {
            clearInterval(this.myTimer)
            document.getElementById("blokadaTrzy").style.zIndex = "-1"
            document.getElementById("blokadaCztery").style.zIndex = "-1"
            document.getElementById("blokadaPiec").style.zIndex = "-1"
            document.getElementById("blokadaSzesc").style.zIndex = "-1"
            document.getElementById("blokadaLeft").style.zIndex = "-1"
            document.getElementById("blokadaRight").style.zIndex = "-1"
            setTimeout(() => {this.winning()}, 25)
        }
        if(this.randomize != 0)
        {
            this.randomize--
        }
    }*/

    /*winning()
    {
        if(this.victory == 1)
        {
            return
        }
        else
        {
            let testing = 0
            for (let y = 1; y < (this.boxSize + 1); y++)
            {
                for (let x = 1; x < (this.boxSize + 1); x++)
                {
                    this.tab2[testing] = globalVariables.tab[y][x]
                    testing++
                }
            }
            
            let checking = ((this.boxSize * this.boxSize) - 1)
            for (let i = 0; i < (this.boxSize * this.boxSize); i++)
            {
                if(this.tab2[i] == checking && checking != 0)
                {
                    checking--
                }
                else if(this.tab2[i] == checking && checking == 0)
                {
                    this.win()
                }
            }
        }
    }
    
    win()
    {
        this.victory = 1
        alert("SOLVED!")
        document.getElementById("k" + this.boxSize + this.boxSize).style.backgroundImage = "url('assets/" + globalVariables.text + "')"
        document.getElementById("k" + this.boxSize + this.boxSize).style.backgroundPosition = "-" + ((this.boxSize - 1) * (600 / this.boxSize)) + "px -" + ((this.boxSize - 1) * (600 / this.boxSize)) + "px"
        document.getElementById("blokada").style.zIndex = "5"
        this.bool = false
    }*/

    changePhoto(d: string)
    {
        this.timing = 0
    
        if (d == "left")
        {
            if (this.sliderPos == 1)
            {
                document.getElementById("imgShower").scrollLeft = 1536
                this.sliderPos = 13
            }
    
            document.getElementById("blokadaLeft").style.zIndex = "5"
            document.getElementById("blokadaRight").style.zIndex = "5"
            let changingTimer: number = setInterval(() => {
                document.getElementById("imgShower").scrollLeft -= 4
                this.timing++
                if (this.timing == 32)
                {
                    clearInterval(changingTimer)
                    document.getElementById("blokadaLeft").style.zIndex = "-1"
                    document.getElementById("blokadaRight").style.zIndex = "-1"
                    this.sliderPos--
                    this.picture = this.sliderPos
                    this.pictureDoer()
                }
            }, 7)
        }
        if (d == "right")
        {
            if (this.sliderPos == 13)
            {
                document.getElementById("imgShower").scrollLeft = 0
                this.sliderPos = 1
            }
            
            document.getElementById("blokadaLeft").style.zIndex = "5"
            document.getElementById("blokadaRight").style.zIndex = "5"
            let changingTimer: number = setInterval(() => {
                document.getElementById("imgShower").scrollLeft += 4
                this.timing++
                if (this.timing == 32)
                {
                    clearInterval(changingTimer)
                    document.getElementById("blokadaLeft").style.zIndex = "-1"
                    document.getElementById("blokadaRight").style.zIndex = "-1"
                    this.sliderPos++
                    if(this.sliderPos == 13)
                        this.picture = 1
                    else
                        this.picture = this.sliderPos
                    this.pictureDoer()
                }
            }, 7)
        }
    }

    pictureDoer()
    {
        globalVariables.changeText("Image" + this.picture + ".gif")
        
        if (globalVariables.bool == false)
        {
        
        }
        if (globalVariables.bool == true)
        {
            for (let y = 1; y < (globalVariables.boxSize + 1); y++)
            {
                for (let x = 1; x < (globalVariables.boxSize + 1); x++)
                {
                    if(globalVariables.tab[y][x] != 0)
                    {								
                        document.getElementById("k" + x + y).style.backgroundImage = "url('assets/" + globalVariables.text + "')"
                    }
                }
            }
        }
    }
}

new Game()