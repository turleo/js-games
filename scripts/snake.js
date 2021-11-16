let canvas = null;
let ctx = null;
let boxes = [[2, 2]];
let direction = [0, 1];
const directions = {
    "KeyD": [1, 0],
    "KeyA": [-1, 0],
    "KeyW": [0, -1],
    "KeyS": [0, 1]
}

let lastTime = 0;

let foodPos = [0, 0];
let can_continue = true;

window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    window.onkeydown = changeDirection;
    foodPos[0] = Math.round(Math.random() * 9);
    foodPos[1] = Math.round(Math.random() * 9);
    requestAnimationFrame(draw);
}

function draw(currentTime) {
    if (currentTime >= lastTime + 500) {
        let head = boxes[boxes.length - 1];
        if (0 > head[0] || head[0] >= 10 || 0 > head[1] || head[1] >= 10) {
            can_continue = false;
            return;
        }

        ctx.clearRect(0, 0, 500, 500);

        ctx.strokeRect(0, 0, 500, 500);

        ctx.fillStyle = "red";
        ctx.fillRect(foodPos[0] * 50, foodPos[1] * 50, 50, 50);

        ctx.fillStyle = "green";
        boxes.forEach((i) => {
            ctx.fillRect(i[0] * 50, i[1] * 50, 50, 50);
        })
        let newBox = [boxes[boxes.length - 1][0], boxes[boxes.length - 1][1]];
        newBox[0] += direction[0];
        if (newBox[0] > 9)
            newBox[0] = 0;
        if (newBox[0] < 0)
            newBox[0] = 9;
        newBox[1] += direction[1];
        if (newBox[1] > 9)
            newBox[1] = 0;
        if (newBox[1] < 0)
            newBox[1] = 9;
        boxes.push([newBox[0], newBox[1]]);
        if (newBox[0] === foodPos[0] && newBox[1] === foodPos[1]) {
            foodPos[0] = Math.round(Math.random() * 9);
            foodPos[1] = Math.round(Math.random() * 9);
        } else {
            boxes.shift();
        }
        lastTime = currentTime;
    }
        requestAnimationFrame(draw);
}

function changeDirection(e) {
    if (e.code in directions) {
        direction = directions[e.code];
    }
    console.log(direction, "n");
}

