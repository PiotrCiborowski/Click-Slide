class Game
{
    boxSize: number
    tab = []
    tab2 = []
    liczba: number
    temp: any
    tempArray: any
    text = "Image1.gif"
    bool: boolean = false
    randomize: number
    timing: number

    myTimer: number
    victory: number
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
        for (let y = 0; y < (this.boxSize + 2); y++)
        {
            for (let x = 0; x < (this.boxSize + 2); x++)
            {
                this.tab.splice(0, (this.boxSize + 2))
            }
        }
        for (let i = 0; i < (this.boxSize * this.boxSize); i++)
        {
            delete this.tab2[i]
        }
    }

    getSliced(n: number)
    {
        this.deletingArrays()
        document.getElementById("plansza").innerHTML = null
        document.getElementById("blokada").style.zIndex = "-1"
        /*delete this.tab
        delete this.tab2*/
        this.victory = 0
        this.bool = true
        this.boxSize = n
        this.randomize = n * n * 10
        for (let y = 1; y < (n + 1); y++)
        {
            for (let x = 1; x < (n + 1); x++)
            {
                 document.getElementById("plansza").innerHTML += '<div class="klocek" id="k' + x + y + '" style="width: ' + (600 / n) +'px; height: ' + (600 / n) + 'px;" value="' + x + ' ' + y + ' ' + n + '">'/*<img class="klocek_i" id="i' + x + y +'" src="Image1.jpg" alt="" width="600px" height="600px"/></div>'*/
                 document.getElementById("k" + x + y).style.backgroundImage = "url('assets/" + this.text + "')"
            }
        }
        
        /*for (let y = 0; y < n; y++)
        {
            for (let x = 0; x < n; x++)
            {
                 let top = y * (598 / n)
                 let right = (x + 1) * (598 / n)
                 let bot = (y + 1) * (598 / n)
                 let left = x * (598 / n)
                 document.getElementById("i" + x + y).style.clip = "rect(" + top + "px, " + right + "px, " + bot + "px, " + left + "px)"
            }
        }*/
        
        for (let y = 1; y < (n + 1); y++)
        {
            for (let x = 1; x < (n + 1); x++)
            {
                 let top = (y - 1) * (600 / n)
                 let left = (x - 1) * (600 / n)
                 document.getElementById("k" + x + y).style.backgroundPosition = "-" + left + "px -" + top + "px"
            }
        }
        
        //this.tab = []

        for (let y = 0; y < (n + 2); y++)
        {
            this.tab[y] = []
            for (let x = 0; x < (n + 2); x++)
            {
                this.tab[y][x] = -1
            }
        }
        
        this.liczba = (n * n) - 1
        
        for (let y = 1; y < (n + 1); y++)
        {
            for (let x = 1; x < (n + 1); x++)
            {
                this.tab[y][x] = this.liczba
                //console.log(this.tab[y][x])
                this.liczba--
            }
        }
        
        for (let y = 1; y < (n + 1); y++)
        {
            for (let x = 1; x < (n + 1); x++)
            {
                document.getElementById("k" + x + y).setAttribute("onclick", "clickPiece(this.getAttribute('value'))")
            }
        }
        
        this.eraseZero(n)
        
        /*for (; randomize > 0;)
        {
            randomPieces()
        }*/
        this.myTimer = setInterval(() => {this.randomPieces()}, 5)
    }

    randomPieces()
    {
        document.getElementById("blokadaTrzy").style.zIndex = "5"
        document.getElementById("blokadaCztery").style.zIndex = "5"
        document.getElementById("blokadaPiec").style.zIndex = "5"
        document.getElementById("blokadaSzesc").style.zIndex = "5"
        document.getElementById("blokadaLeft").style.zIndex = "5"
        document.getElementById("blokadaRight").style.zIndex = "5"
        //document.getElementById("blokadaImg3").style.zIndex = "5"
        
        let direction = Math.floor((Math.random() * 10) % 4)
        //console.log("Direction: " + direction)
        /*let clickRandomX = Math.floor((Math.random() * 10) % (boxSize - 1))
        let clickRandomY = Math.floor((Math.random() * 10) % (boxSize - 1))
        console.log("Ta liczba to: " + clickRandomX + " i " + clickRandomY)*/
        
        while(this.lastDirection == direction)
        {
            direction = Math.floor((Math.random() * 10) % 4)
        }
        for (let y = 1; y < (this.boxSize + 1); y++)
        {
            if(this.wasHere != 0)
            {
                this.wasHere = 0
                break
            }
            for (let x = 1; x < (this.boxSize + 1); x++)
            {
                if(this.tab[y][x] == 0)
                {
                    //randomTemp = "tab[" + y + "][" + x + "]"
                    
                    //console.log(x + "; " + y)
                    
                    if(direction == 0)
                    {
                        //let swappingDirection = tab[cy][cx - 1]
                        if(this.tab[y - 1][x] > 0)
                        {
                            this.lastDirection = 2
                            this.wasHere = 1
                            this.swapPieces(x, (y - 1), this.boxSize)
                            break
                        }
                    }
                    if(direction == 1)
                    {
                        if(this.tab[y][x + 1] > 0)
                        {
                            this.lastDirection = 3
                            this.wasHere = 1
                            this.swapPieces((x + 1), y, this.boxSize)
                            break
                        }
                    }
                    if(direction == 2)
                    {
                        if(this.tab[y + 1][x] > 0)
                        {
                            this.lastDirection = 0
                            this.wasHere = 1
                            this.swapPieces(x, (y + 1), this.boxSize)
                            break
                        }
                    }
                    if(direction == 3)
                    {
                        if(this.tab[y][x - 1] > 0)
                        {
                            this.lastDirection = 1
                            this.wasHere = 1
                            this.swapPieces((x - 1), y, this.boxSize)
                            break
                        }
                    }
                }
            }
        }
        
        //let valueRandom = clickRandomX + " " + clickRandomY + " " + this.boxSize
        
        //clickPiece(valueRandom)
    }

    eraseZero(n: number)
    {
        let erase = n
        
        document.getElementById("k" + erase + erase).style.backgroundImage = null
    }

    swapPieces(cx: number, cy: number, n: number)
    {
        this.tempArray = this.tab[cy][cx]
        this.temp = document.getElementById("k" + cx + cy).style.backgroundPosition
        //alert("Done")
        for (let y = 1; y < (n + 1); y++)
        {
            for (let x = 1; x < (n + 1); x++)
            {
                if(this.tab[y][x] == 0)
                {
                    this.tab[y][x] = this.tempArray
                    document.getElementById("k" + x + y).style.backgroundImage = "url('assets/" + this.text + "')"
                    document.getElementById("k" + x + y).style.backgroundPosition = this.temp
                }
            }
        }
        this.tab[cy][cx] = 0
        document.getElementById("k" + cx + cy).style.backgroundImage = null
        //alert("Done?")				
        if(this.randomize == 0)
        {
            clearInterval(this.myTimer)
            document.getElementById("blokadaTrzy").style.zIndex = "-1"
            document.getElementById("blokadaCztery").style.zIndex = "-1"
            document.getElementById("blokadaPiec").style.zIndex = "-1"
            document.getElementById("blokadaSzesc").style.zIndex = "-1"
            document.getElementById("blokadaLeft").style.zIndex = "-1"
            document.getElementById("blokadaRight").style.zIndex = "-1"
            //document.getElementById("blokadaImg3").style.zIndex = "-1"
            //document.getElementById("blokadaImg" + picture).style.zIndex = "5"
            setTimeout(() => {this.winning()}, 25)
        }
        if(this.randomize != 0)
        {
            this.randomize--
        }
    }

    winning()
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
                    this.tab2[testing] = this.tab[y][x]
                    testing++
                }
            }
            console.log(this.tab2)
            
            let checking = ((this.boxSize * this.boxSize) - 1)
            for (let i = 0; i < (this.boxSize * this.boxSize); i++)
            {
                if(this.tab2[i] == checking && checking != 0)
                {
                    checking--
                }
                else if(this.tab2[i] == checking && checking == 0)
                {
                    //this.win()
                }
            }
            
            /*let checking = 1
            for (let y = 1; y < (boxSize + 1); y++) {
                for (let x = 1; x < (boxSize + 1); x++) {
                    if(tab[y][x] == ((boxSize * boxSize) - checking))
                    {
                        if(x == boxSize && y == boxSize)
                        {
                            alert("Ułożyłeś!")
                            document.getElementById("blokada").style.zIndex = "5"
                        }
                        else
                        {
                            checking++
                        }
                    }
                }
            }*/
        }
    }
    
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
        this.text = "Image" + this.picture + ".gif"
        
        if (this.bool == false)
        {
        
        }
        if (this.bool == true)
        {
            for (let y = 1; y < (this.boxSize + 1); y++)
            {
                for (let x = 1; x < (this.boxSize + 1); x++)
                {
                    if(this.tab[y][x] != 0)
                    {								
                        document.getElementById("k" + x + y).style.backgroundImage = "url('assets/" + this.text + "')"
                    }
                }
            }
        }
    }
}

new Game()