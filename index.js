var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.tab = [];
        this.text = "Image1.gif";
        this.bool = false;
        this.picture = 1;
        this.sliderPos = 1;
        var buttonLeft = document.getElementById("left");
        var buttonRight = document.getElementById("right");
        buttonLeft.addEventListener("click", function (e) { return _this.changePhoto("left"); });
        buttonRight.addEventListener("click", function (e) { return _this.changePhoto("right"); });
    }
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
                    //this.pictureDoer()
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
                    //this.pictureDoer()
                }
            }, 7);
        }
    };
    return Game;
}());
new Game();
