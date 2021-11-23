let canvas = null;
let ctx = null;

let continiue = true;

let score = 0;
let scoreOut = null;

let pacman = [5, 5];

let enemy_red = [3, 4];
let enemy_pink = [2, 4];
let enemy_blue = [5, 7];

let direction = [0, 1];

const direction_keys = ["KeyD", "KeyA", "KeyW", "KeyS"]
const directions = {
    "KeyD": [1, 0],
    "KeyA": [-1, 0],
    "KeyW": [0, -1],
    "KeyS": [0, 1]
}

let lastTime = 0;

let wallsHorizontal = [[1, 1], [1, 2], [2, 1], [2, 2], [4, 1], [4, 2], [5, 1], [5, 2], [7, 1], [7, 2], [8, 1], [8, 2],
                        [1, 3], [2, 3], [4, 3], [5, 3], [7, 3], [8, 3],

                        [0, 4], [3, 4], [4, 4], [5, 4], [6, 4], [9, 4],
                        [0, 5], [3, 5], [6, 5], [9, 5],

                        [1, 6], [2, 6], [4, 6], [5, 6], [7, 6], [8, 6],
                        [1, 7], [2, 7], [4, 7], [5, 7], [7, 7], [8, 7],

                        [1, 8], [2, 8], [4, 8], [5, 8], [7, 8], [8, 8],
                        [1, 9], [2, 9], [4, 9], [5, 9], [7, 9], [8, 9]];
let wallsVertical = [[1, 1], [3, 1], [4, 1], [6, 1], [7, 1], [9, 1],
                    [1, 4], [3, 4], [7, 4], [9, 4],
                    [1, 6], [3, 6], [4, 6], [6, 6], [7, 6], [9, 6],
                    [1, 8], [3, 8], [4, 8], [6, 8], [7, 8], [9, 8]];

let horisontalArray = JSON.stringify(wallsHorizontal);
let verticalArray = JSON.stringify(wallsVertical);

let was = [];

window.onload = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    scoreOut = document.getElementById("score")

    requestAnimationFrame(draw);
}

window.onkeydown = (e) => {
    if (e.code in directions) {
        direction = directions[e.code];
    }
}

function check_direction(position, direction) {
    if (direction[0] < 0) {
        if (verticalArray.indexOf(`[${position[0]},${position[1]}]`) == -1) {
            position[0] -= 1;
        }
    } else if (direction[0] > 0) {
        if (verticalArray.indexOf(`[${position[0] + 1},${position[1]}]`) == -1) {
            position[0] += 1;
        }
    }

    if (direction[1] < 0) {
        if (horisontalArray.indexOf(`[${position[0]},${position[1]}]`) == -1) {
            position[1] -= 1;
        }
    } else if (direction[1] > 0) {
        if (horisontalArray.indexOf(`[${position[0]},${position[1] + 1}]`) == -1) {
            position[1] += 1;
        }
    }

    if (position[0] > 9 || position[0] < 0)
        position[0] -= direction[0];
    if (position[1] > 9 || position[1] < 0)
        position[1] -= direction[1];

    return position;
}

function draw(time) {
    if (time >= lastTime + 500) {
        lastTime = time;


        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, 500, 500);

        ctx.lineWidth = 1;

        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        wallsHorizontal.forEach((i) => {
            ctx.beginPath();
            ctx.moveTo(i[0] * 50, i[1]* 50);
            ctx.lineTo(i[0] * 50 + 50, i[1] * 50);
            ctx.stroke();
        });

        wallsVertical.forEach((i) => {
            ctx.beginPath();
            ctx.moveTo(i[0] * 50, i[1] * 50);
            ctx.lineTo(i[0] * 50, i[1] * 50 + 50);
            ctx.stroke();
        });

        ctx.fillStyle = "#493b0a";
        [...Array(11).keys()].forEach((i) => {
            [...Array(11).keys()].forEach((j) => {
                if (JSON.stringify(was).indexOf(`[${i},${j}]`) == -1) {
                    ctx.beginPath();
                    ctx.arc((i + 1) * 50 - 25, (j + 1) * 50 - 25, 5, 0, 2 * Math.PI, false);
                    ctx.fill();
                }
            })
        })

        ctx.fillStyle = "yellow";
        ctx.fillRect(pacman[0] * 50, pacman[1] * 50, 50, 50);

        ctx.fillStyle = "red";
        ctx.fillRect(enemy_red[0] * 50, enemy_red[1] * 50, 50, 50);

        ctx.fillStyle = "pink";
        ctx.fillRect(enemy_pink[0] * 50, enemy_pink[1] * 50, 50, 50);

        ctx.fillStyle = "blue";
        ctx.fillRect(enemy_blue[0] * 50, enemy_blue[1] * 50, 50, 50);

        if ((pacman[0] == enemy_red[0] && pacman[1] == enemy_red[1]) ||
            (pacman[0] == enemy_pink[0] && pacman[1] == enemy_pink[1]) ||
                (pacman[0] == enemy_blue[0] && pacman[1] == enemy_blue[1])) {
            continiue = false;
            scoreOut.innerText = "An enemy decided to eat you 👻"
            return;
        }

        pacman = check_direction(pacman, direction)


        let temp_direction = directions[direction_keys[direction_keys.length * Math.random() << 0]];
        enemy_red = check_direction(enemy_red, temp_direction)

        temp_direction = directions[direction_keys[direction_keys.length * Math.random() << 0]];
        enemy_pink = check_direction(enemy_pink, temp_direction);

        temp_direction = directions[direction_keys[direction_keys.length * Math.random() << 0]];
        enemy_blue = check_direction(enemy_blue, temp_direction);

        if (JSON.stringify(was).indexOf(`[${pacman[0]},${pacman[1]}]`) == -1) {
            score += 1;
            scoreOut.innerText = `Score : ${score}`;
        }
        was.push([pacman[0], pacman[1]])
    }
    if (continiue)
        requestAnimationFrame(draw)
}

