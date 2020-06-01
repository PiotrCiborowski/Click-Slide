import * as globalVariables from './globalVariables'

export function clickPiece(i)
{
    let tabClick = i.split(" ")
    this.cx = Number(tabClick[0])
    this.cy = Number(tabClick[1])
    this.t = Number(tabClick[2])
    
    if(this.cx == 0 && this.cy == 0)
    {
        if(globalVariables.tab[this.cy][this.cx + 1] == 0 || globalVariables.tab[this.cy + 1][this.cx] == 0)
        {
            globalVariables.swapPieces(this.cx, this.cy, (this.t + 1))
            //true
        }
    }
    if(this.cx > 0 && this.cx < this.t && this.cy == 0)
    {
        if(globalVariables.tab[this.cy][this.cx - 1] == 0 || globalVariables.tab[this.cy][this.cx + 1] == 0 || globalVariables.tab[this.cy + 1][this.cx] == 0)
        {
            globalVariables.swapPieces(this.cx, this.cy, (this.t + 1))
            //true
        }
    }
    if(this.cx == this.t && this.cy == 0)
    {
        if(globalVariables.tab[this.cy][this.cx - 1] == 0 || globalVariables.tab[this.cy + 1][this.cx] == 0)
        {
            globalVariables.swapPieces(this.cx, this.cy, (this.t + 1))
            //true
        }
    }
    if(this.cx == 0 && this.cy > 0 && this.cy < this.t)
    {
        if(globalVariables.tab[this.cy][this.cx + 1] == 0 || globalVariables.tab[this.cy - 1][this.cx] == 0 || globalVariables.tab[this.cy + 1][this.cx] == 0)
        {
            globalVariables.swapPieces(this.cx, this.cy, (this.t + 1))
            //true
        }
    }
    if(this.cx > 0 && this.cx < this.t && this.cy > 0 && this.cy < this.t)
    {
        if(globalVariables.tab[this.cy][this.cx - 1] == 0 || globalVariables.tab[this.cy][this.cx + 1] == 0 || globalVariables.tab[this.cy - 1][this.cx] == 0 || globalVariables.tab[this.cy + 1][this.cx] == 0)
        {
            globalVariables.swapPieces(this.cx, this.cy, (this.t + 1))
            //true
        }
    }
    if(this.cx == this.t && this.cy > 0 && this.cy < this.t)
    {
        if(globalVariables.tab[this.cy][this.cx - 1] == 0 || globalVariables.tab[this.cy - 1][this.cx] == 0 || globalVariables.tab[this.cy + 1][this.cx] == 0)
        {
            globalVariables.swapPieces(this.cx, this.cy, (this.t + 1))
            //true
        }
    }
    if(this.cx == 0 && this.cy == this.t)
    {
        if(globalVariables.tab[this.cy][this.cx + 1] == 0 || globalVariables.tab[this.cy - 1][this.cx] == 0)
        {
            globalVariables.swapPieces(this.cx, this.cy, (this.t + 1))
            //true
        }
    }
    if(this.cx > 0 && this.cx < this.t && this.cy == this.t)
    {
        if(globalVariables.tab[this.cy][this.cx - 1] == 0 || globalVariables.tab[this.cy][this.cx + 1] == 0 || globalVariables.tab[this.cy - 1][this.cx] == 0)
        {
            globalVariables.swapPieces(this.cx, this.cy, (this.t + 1))
            //true
        }
    }
    if(this.cx == this.t && this.cy == this.t)
    {
        if(globalVariables.tab[this.cy][this.cx - 1] == 0 || globalVariables.tab[this.cy - 1][this.cx] == 0)
        {
            globalVariables.swapPieces(this.cx, this.cy, (this.t + 1))
            //true
        }
    }
}