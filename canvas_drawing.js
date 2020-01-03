const canvas = document.getElementById("canvasDraw");

// need to draw some lines
function degToRad(degrees) {
    return degrees * Math.PI / 180;
};

// create canvas
canvas.width = 400;
canvas.height = 400;

// what type of canvas we want
const ctx = canvas.getContext('2d');


// this hole eats balls
class BlackHole {
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;
        this.rad = rad;
    }

    drawBlackHole() {
        ctx.fillStyle = `rgb(0, 0, 0)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, degToRad(0), degToRad(360), false);
        ctx.fill();
    }
}


class Ball {
    constructor(x, y, r, g, b, xdirection, ydirection, id) {
        this.x = x;
        this.y = y;
        this.rad = 10;
        this.color = `rgb(${r}, ${g}, ${b})`;
        this.xdirection = xdirection;
        this.ydirection = ydirection;
        this._otherBalls = new Array();  // to store information about other balls location
        this.id = id;
    }

    drawBall() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, degToRad(0), degToRad(360), false);
        ctx.fill();
    }

    updateBallLocation() {
        this.x += this.xdirection;
        this.y += this.ydirection;
    }

    collisionWithWallDetect() {
        if(this.x >= (canvas.width - this.rad) | (this.x <= this.rad)){
            this.xdirection *= -1;
        }
        if(this.y >= (canvas.width - this.rad) | (this.y <= this.rad)){
            this.ydirection *= -1;
        }
    }

    collisionWithAnotherBallDetect() {
        for(let b = 0; b < this._otherBalls.length; b++) {
            if(this.id !== this._otherBalls[b].id) {
                if(( Math.abs(this.x - this._otherBalls[b].x) < this.rad) & (Math.abs(this.y - this._otherBalls[b].y) < this.rad)){
                    if(this.color !== this._otherBalls[b].color) {
                        if(Math.floor(Math.random() * 2) === 0) {
                            this.color = this._otherBalls[b].color;
                        }
                        else {
                            this._otherBalls[b].color = this.color;
                        }
                    }
                }
            }
        }
    }

    checkIfBallInsideBlackHole(Bx, By, Brad=12) {
        if( (Math.abs(Bx - this.x) <= 0.7 * Brad) & (Math.abs(By - this.y) <= 0.7 * Brad) ) {
            return true;
        }
        return false;
    }

    set otherBalls(otherBallsArray) {
        this._otherBalls = otherBallsArray;
    }

    get otherBalls() {
        return this._otherBalls;
    }
}


function randomIntegerBetweenMinMax(minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue +1)) + minValue;
}

function createBalls(number) {
    let balls = new Array();
    for(let i=0; i<=number; i++) {
        let xCoordinate = randomIntegerBetweenMinMax(10 + 1 , 400 - 10 - 1); //
        let yCoordinate = randomIntegerBetweenMinMax(10 + 1 , 400 - 10 - 1);
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let xdirection = randomIntegerBetweenMinMax(2, 5);
        let ydirection = randomIntegerBetweenMinMax(2, 5);
        if(xCoordinate >= 200) {
            xdirection *= -1;
        }
        if(yCoordinate >= 200) {
            ydirection *= -1;
        }

        balls.push(new Ball(xCoordinate, yCoordinate, r, g, b, xdirection, ydirection, i));
    }
    return balls;
}

// main program

const blackRadTextBox = document.getElementById('blackRad');
const ballsNumberTextBox = document.getElementById('ballsNumber');
const startButton = document.querySelector('input[type=button]')
const errorMessageP = document.querySelector('.errorParagraph')

startButton.onclick = function () {
    let blackRad = Number(blackRadTextBox.value);
    let ballsNumber = Number(ballsNumberTextBox.value);
    try {
        if (!blackRad) {
            throw 'Радиус Лунки должен быть числом !';
        };
        if (!ballsNumber) {
            throw 'Количество шаров должно быть числом !';
        };
        if (!Number.isInteger(blackRad)) {
            throw 'Радиус лунки должен быть целым числом !'
        }
        if (!Number.isInteger(ballsNumber)) {
            throw 'Количество шаров должно быть целым числом !'
        }
        if ((blackRad > 40) | (blackRad < 12)) {
            throw 'Радиус Лунки должен быть числом больше или равно 12 и меньше или равно 40 !';
        };
        if ((ballsNumber > 40 ) | (ballsNumber < 1)) {
            throw 'Число шаров Лунки должен быть числом больше или равно 1 и меньше или равно 40 !';
        };

        errorMessageP.innerText = "";

        let blackX = randomIntegerBetweenMinMax(blackRad + 1, 400 - blackRad - 1);
        let blackY = randomIntegerBetweenMinMax(blackRad + 1, 400 - blackRad - 1);
        let hole = new BlackHole(blackX, blackY, blackRad);

        let balls = createBalls(ballsNumber - 1);

        for (let i = 0; i < balls.length; i++) {
            balls[i].otherBalls = balls;
        }

        let ballsToRemove = new Array();

        function loop() {
            //draw rectangle
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'rgb(0, 0, 0)';
            ctx.strokeRect(0, 0, 400, 400);
            ctx.lineWidth = 1;
            hole.drawBlackHole();

            for (let i = 0; i < ballsToRemove.length; i++) {
                for (let j = 0; j < balls.length; j++) {
                    if (ballsToRemove[i].id === balls[j].id) {
                        balls.splice(j, 1);
                        break;
                    }
                }
            }
            // do not need to remove balls from ballsToRemove

            for (let i = 0; i < balls.length; i++) {
                if (!(balls[i].checkIfBallInsideBlackHole(blackX, blackY, blackRad))) {
                    balls[i].drawBall();
                    balls[i].updateBallLocation();
                    balls[i].collisionWithAnotherBallDetect();
                    balls[i].collisionWithWallDetect();
                } else {
                    ballsToRemove.push(balls[i])
                }
            }
            requestAnimationFrame(loop);  // to create animation we need infinite loop which changes images
        }

        loop();
    }
    catch (e) {
        errorMessageP.innerText = e;
    }
}

