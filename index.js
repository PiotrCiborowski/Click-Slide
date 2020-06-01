var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.tab = [];
        this.tab2 = [];
        this.text = "Image1.gif";
        this.bool = false;
        this.picture = 1;
        this.sliderPos = 1;
        this.wasHere = 0;
        var buttonLeft = document.getElementById("left");
        var buttonRight = document.getElementById("right");
        var three = document.getElementById("trzy");
        var four = document.getElementById("cztery");
        var five = document.getElementById("piec");
        var six = document.getElementById("szesc");
        buttonLeft.addEventListener("click", function (e) { return _this.changePhoto("left"); });
        buttonRight.addEventListener("click", function (e) { return _this.changePhoto("right"); });
        three.addEventListener("click", function (e) { return _this.getSliced(3); });
        four.addEventListener("click", function (e) { return _this.getSliced(4); });
        five.addEventListener("click", function (e) { return _this.getSliced(5); });
        six.addEventListener("click", function (e) { return _this.getSliced(6); });
    }
    Game.prototype.deletingArrays = function () {
        for (var y = 0; y < (this.boxSize + 2); y++) {
            for (var x = 0; x < (this.boxSize + 2); x++) {
                this.tab.splice(0, (this.boxSize + 2));
            }
        }
        for (var i = 0; i < (this.boxSize * this.boxSize); i++) {
            delete this.tab2[i];
        }
    };
    Game.prototype.getSliced = function (n) {
        var _this = this;
        this.deletingArrays();
        document.getElementById("plansza").innerHTML = null;
        document.getElementById("blokada").style.zIndex = "-1";
        this.victory = 0;
        this.bool = true;
        this.boxSize = n;
        this.randomize = n * n * 10;
        for (var y = 1; y < (n + 1); y++) {
            for (var x = 1; x < (n + 1); x++) {
                document.getElementById("plansza").innerHTML += '<div class="klocek" id="k' + x + y + '" style="width: ' + (600 / n) + 'px; height: ' + (600 / n) + 'px;" value="' + x + ' ' + y + ' ' + n + '">'; /*<img class="klocek_i" id="i' + x + y +'" src="Image1.jpg" alt="" width="600px" height="600px"/></div>'*/
                document.getElementById("k" + x + y).style.backgroundImage = "url('assets/" + this.text + "')";
            }
        }
        for (var y = 1; y < (n + 1); y++) {
            for (var x = 1; x < (n + 1); x++) {
                var top_1 = (y - 1) * (600 / n);
                var left = (x - 1) * (600 / n);
                document.getElementById("k" + x + y).style.backgroundPosition = "-" + left + "px -" + top_1 + "px";
            }
        }
        for (var y = 0; y < (n + 2); y++) {
            this.tab[y] = [];
            for (var x = 0; x < (n + 2); x++) {
                this.tab[y][x] = -1;
            }
        }
        this.liczba = (n * n) - 1;
        for (var y = 1; y < (n + 1); y++) {
            for (var x = 1; x < (n + 1); x++) {
                this.tab[y][x] = this.liczba;
                this.liczba--;
            }
        }
        for (var y = 1; y < (n + 1); y++) {
            var _loop_1 = function (x) {
                var forClicking = document.getElementById("k" + x + y);
                document.getElementById("k" + x + y).addEventListener("click", function (e) { return _this.clickPiece(forClicking.getAttribute('value')); });
            };
            for (var x = 1; x < (n + 1); x++) {
                _loop_1(x);
            }
        }
        this.eraseZero(n);
        this.myTimer = setInterval(function () { _this.randomPieces(); }, 5);
    };
    Game.prototype.randomPieces = function () {
        document.getElementById("blokadaTrzy").style.zIndex = "5";
        document.getElementById("blokadaCztery").style.zIndex = "5";
        document.getElementById("blokadaPiec").style.zIndex = "5";
        document.getElementById("blokadaSzesc").style.zIndex = "5";
        document.getElementById("blokadaLeft").style.zIndex = "5";
        document.getElementById("blokadaRight").style.zIndex = "5";
        var direction = Math.floor((Math.random() * 10) % 4);
        while (this.lastDirection == direction) {
            direction = Math.floor((Math.random() * 10) % 4);
        }
        for (var y = 1; y < (this.boxSize + 1); y++) {
            if (this.wasHere != 0) {
                this.wasHere = 0;
                break;
            }
            for (var x = 1; x < (this.boxSize + 1); x++) {
                if (this.tab[y][x] == 0) {
                    if (direction == 0) {
                        if (this.tab[y - 1][x] > 0) {
                            this.lastDirection = 2;
                            this.wasHere = 1;
                            this.swapPieces(x, (y - 1), this.boxSize);
                            break;
                        }
                    }
                    if (direction == 1) {
                        if (this.tab[y][x + 1] > 0) {
                            this.lastDirection = 3;
                            this.wasHere = 1;
                            this.swapPieces((x + 1), y, this.boxSize);
                            break;
                        }
                    }
                    if (direction == 2) {
                        if (this.tab[y + 1][x] > 0) {
                            this.lastDirection = 0;
                            this.wasHere = 1;
                            this.swapPieces(x, (y + 1), this.boxSize);
                            break;
                        }
                    }
                    if (direction == 3) {
                        if (this.tab[y][x - 1] > 0) {
                            this.lastDirection = 1;
                            this.wasHere = 1;
                            this.swapPieces((x - 1), y, this.boxSize);
                            break;
                        }
                    }
                }
            }
        }
    };
    Game.prototype.eraseZero = function (n) {
        var erase = n;
        document.getElementById("k" + erase + erase).style.backgroundImage = null;
    };
    Game.prototype.clickPiece = function (i) {
        var tabClick = i.split(" ");
        this.cx = Number(tabClick[0]);
        this.cy = Number(tabClick[1]);
        this.t = Number(tabClick[2]);
        if (this.cx == 0 && this.cy == 0) {
            if (this.tab[this.cy][this.cx + 1] == 0 || this.tab[this.cy + 1][this.cx] == 0) {
                this.swapPieces(this.cx, this.cy, (this.t + 1));
                //true
            }
        }
        if (this.cx > 0 && this.cx < this.t && this.cy == 0) {
            if (this.tab[this.cy][this.cx - 1] == 0 || this.tab[this.cy][this.cx + 1] == 0 || this.tab[this.cy + 1][this.cx] == 0) {
                this.swapPieces(this.cx, this.cy, (this.t + 1));
                //true
            }
        }
        if (this.cx == this.t && this.cy == 0) {
            if (this.tab[this.cy][this.cx - 1] == 0 || this.tab[this.cy + 1][this.cx] == 0) {
                this.swapPieces(this.cx, this.cy, (this.t + 1));
                //true
            }
        }
        if (this.cx == 0 && this.cy > 0 && this.cy < this.t) {
            if (this.tab[this.cy][this.cx + 1] == 0 || this.tab[this.cy - 1][this.cx] == 0 || this.tab[this.cy + 1][this.cx] == 0) {
                this.swapPieces(this.cx, this.cy, (this.t + 1));
                //true
            }
        }
        if (this.cx > 0 && this.cx < this.t && this.cy > 0 && this.cy < this.t) {
            if (this.tab[this.cy][this.cx - 1] == 0 || this.tab[this.cy][this.cx + 1] == 0 || this.tab[this.cy - 1][this.cx] == 0 || this.tab[this.cy + 1][this.cx] == 0) {
                this.swapPieces(this.cx, this.cy, (this.t + 1));
                //true
            }
        }
        if (this.cx == this.t && this.cy > 0 && this.cy < this.t) {
            if (this.tab[this.cy][this.cx - 1] == 0 || this.tab[this.cy - 1][this.cx] == 0 || this.tab[this.cy + 1][this.cx] == 0) {
                this.swapPieces(this.cx, this.cy, (this.t + 1));
                //true
            }
        }
        if (this.cx == 0 && this.cy == this.t) {
            if (this.tab[this.cy][this.cx + 1] == 0 || this.tab[this.cy - 1][this.cx] == 0) {
                this.swapPieces(this.cx, this.cy, (this.t + 1));
                //true
            }
        }
        if (this.cx > 0 && this.cx < this.t && this.cy == this.t) {
            if (this.tab[this.cy][this.cx - 1] == 0 || this.tab[this.cy][this.cx + 1] == 0 || this.tab[this.cy - 1][this.cx] == 0) {
                this.swapPieces(this.cx, this.cy, (this.t + 1));
                //true
            }
        }
        if (this.cx == this.t && this.cy == this.t) {
            if (this.tab[this.cy][this.cx - 1] == 0 || this.tab[this.cy - 1][this.cx] == 0) {
                this.swapPieces(this.cx, this.cy, (this.t + 1));
                //true
            }
        }
    };
    Game.prototype.swapPieces = function (cx, cy, n) {
        var _this = this;
        this.tempArray = this.tab[cy][cx];
        this.temp = document.getElementById("k" + cx + cy).style.backgroundPosition;
        for (var y = 1; y < (n + 1); y++) {
            for (var x = 1; x < (n + 1); x++) {
                if (this.tab[y][x] == 0) {
                    this.tab[y][x] = this.tempArray;
                    document.getElementById("k" + x + y).style.backgroundImage = "url('assets/" + this.text + "')";
                    document.getElementById("k" + x + y).style.backgroundPosition = this.temp;
                }
            }
        }
        this.tab[cy][cx] = 0;
        document.getElementById("k" + cx + cy).style.backgroundImage = null;
        if (this.randomize == 0) {
            clearInterval(this.myTimer);
            document.getElementById("blokadaTrzy").style.zIndex = "-1";
            document.getElementById("blokadaCztery").style.zIndex = "-1";
            document.getElementById("blokadaPiec").style.zIndex = "-1";
            document.getElementById("blokadaSzesc").style.zIndex = "-1";
            document.getElementById("blokadaLeft").style.zIndex = "-1";
            document.getElementById("blokadaRight").style.zIndex = "-1";
            setTimeout(function () { _this.winning(); }, 25);
        }
        if (this.randomize != 0) {
            this.randomize--;
        }
    };
    Game.prototype.winning = function () {
        if (this.victory == 1) {
            return;
        }
        else {
            var testing = 0;
            for (var y = 1; y < (this.boxSize + 1); y++) {
                for (var x = 1; x < (this.boxSize + 1); x++) {
                    this.tab2[testing] = this.tab[y][x];
                    testing++;
                }
            }
            var checking = ((this.boxSize * this.boxSize) - 1);
            for (var i = 0; i < (this.boxSize * this.boxSize); i++) {
                if (this.tab2[i] == checking && checking != 0) {
                    checking--;
                }
                else if (this.tab2[i] == checking && checking == 0) {
                    this.win();
                }
            }
        }
    };
    Game.prototype.win = function () {
        this.victory = 1;
        alert("SOLVED!");
        document.getElementById("k" + this.boxSize + this.boxSize).style.backgroundImage = "url('assets/" + this.text + "')";
        document.getElementById("k" + this.boxSize + this.boxSize).style.backgroundPosition = "-" + ((this.boxSize - 1) * (600 / this.boxSize)) + "px -" + ((this.boxSize - 1) * (600 / this.boxSize)) + "px";
        document.getElementById("blokada").style.zIndex = "5";
        this.bool = false;
    };
    Game.prototype.changePhoto = function (d) {
        var _this = this;
        this.timing = 0;
        if (d == "left") {
            if (this.sliderPos == 1) {
                document.getElementById("imgShower").scrollLeft = 1536;
                this.sliderPos = 13;
            }
            document.getElementById("blokadaLeft").style.zIndex = "5";
            document.getElementById("blokadaRight").style.zIndex = "5";
            var changingTimer_1 = setInterval(function () {
                document.getElementById("imgShower").scrollLeft -= 4;
                _this.timing++;
                if (_this.timing == 32) {
                    clearInterval(changingTimer_1);
                    document.getElementById("blokadaLeft").style.zIndex = "-1";
                    document.getElementById("blokadaRight").style.zIndex = "-1";
                    _this.sliderPos--;
                    _this.picture = _this.sliderPos;
                    _this.pictureDoer();
                }
            }, 7);
        }
        if (d == "right") {
            if (this.sliderPos == 13) {
                document.getElementById("imgShower").scrollLeft = 0;
                this.sliderPos = 1;
            }
            document.getElementById("blokadaLeft").style.zIndex = "5";
            document.getElementById("blokadaRight").style.zIndex = "5";
            var changingTimer_2 = setInterval(function () {
                document.getElementById("imgShower").scrollLeft += 4;
                _this.timing++;
                if (_this.timing == 32) {
                    clearInterval(changingTimer_2);
                    document.getElementById("blokadaLeft").style.zIndex = "-1";
                    document.getElementById("blokadaRight").style.zIndex = "-1";
                    _this.sliderPos++;
                    if (_this.sliderPos == 13)
                        _this.picture = 1;
                    else
                        _this.picture = _this.sliderPos;
                    _this.pictureDoer();
                }
            }, 7);
        }
    };
    Game.prototype.pictureDoer = function () {
        this.text = "Image" + this.picture + ".gif";
        if (this.bool == false) {
        }
        if (this.bool == true) {
            for (var y = 1; y < (this.boxSize + 1); y++) {
                for (var x = 1; x < (this.boxSize + 1); x++) {
                    if (this.tab[y][x] != 0) {
                        document.getElementById("k" + x + y).style.backgroundImage = "url('assets/" + this.text + "')";
                    }
                }
            }
        }
    };
    return Game;
}());
new Game();
