class Game
{
    boxSize: number
    tab = []
    text = "Image1.gif"
    bool = false
    timing: number

    picture = 1
    sliderPos = 1

    constructor()
    {
        let buttonLeft = document.getElementById("left");
        let buttonRight = document.getElementById("right");

        buttonLeft.addEventListener("click", (e:Event) => this.changePhoto("left"))
        buttonRight.addEventListener("click", (e:Event) => this.changePhoto("right"))
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
                    //this.pictureDoer()
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
                    //this.pictureDoer()
                }
            }, 7)
        }
    }

    /*pictureDoer()
    {
        this.text = "Image" + this.picture + ".gif"
        
        if (this.bool == false)
        {
        
        }
        if (this.bool == true)
        {
            for (let y = 1; y < (this.boxSize + 1); y++) {
                for (let x = 1; x < (this.boxSize + 1); x++) {
                    if(this.tab[y][x] != 0)
                    {								
                        document.getElementById("k" + x + y).style.backgroundImage = "url('" + this.text + "')"
                    }
                }
            }
        }
    }*/
}

new Game()