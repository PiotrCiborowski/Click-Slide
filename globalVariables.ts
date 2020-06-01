let boxSize: number
let tab = []
let tab2 = []
let temp: any
let tempArray: any
let text = "Image1.gif"
let bool: boolean = false
let randomize: number

let myTimer: number
let victory: number

export function swapPieces(cx: number, cy: number, n: number)
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
        clearInterval(myTimer)
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
}

export function winning()
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

export function win()
{
    this.victory = 1
    alert("SOLVED!")
    document.getElementById("k" + this.boxSize + this.boxSize).style.backgroundImage = "url('assets/" + this.text + "')"
    document.getElementById("k" + this.boxSize + this.boxSize).style.backgroundPosition = "-" + ((this.boxSize - 1) * (600 / this.boxSize)) + "px -" + ((this.boxSize - 1) * (600 / this.boxSize)) + "px"
    document.getElementById("blokada").style.zIndex = "5"
    this.bool = false
}

export function changeVictory(n: number)
{
    victory = n
}

export function changeBoxSize(n: number)
{
    boxSize = n
}

export function changeRandomize(n: number)
{
    randomize = n
}

export function changeText(d: string)
{
    text = d
    console.log(text)
}

export function changeBool(b: boolean)
{
    bool = b
}

export function changeTimer(n: number)
{
    myTimer = n
}

export { boxSize, tab, tab2, temp, tempArray, text, bool, randomize, victory }