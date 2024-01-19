const canvas = document.getElementById("graph"),
    ctx = canvas.getContext("2d");
canvas.width = canvas.clientWidth;
canvas.height = canvas.width;
let w = canvas.width, h = canvas.height;

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "rgb(185,121,231)");

let rValue;
let lineLength;
window.redrawGraph = drawGraph;
window.redrawPoints = redrawPoint;

function drawGraph(rValueFun) {
    ctx.clearRect(0, 0, w, h);
    let r = (w - w / 6.4) / 2;
    lineLength = w / 30;
    ctx.lineWidth = w / 300;
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 - 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 + 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 - 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 + 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(0, h / 2);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(w / 2 - lineLength, h / 2 + r);
    ctx.lineTo(w / 2 + lineLength, h / 2 + r);
    ctx.moveTo(w / 2 - lineLength, h / 2 + r / 2);
    ctx.lineTo(w / 2 + lineLength, h / 2 + r / 2);
    ctx.moveTo(w / 2 - lineLength, h / 2 - r);
    ctx.lineTo(w / 2 + lineLength, h / 2 - r);
    ctx.moveTo(w / 2 - lineLength, h / 2 - r / 2);
    ctx.lineTo(w / 2 + lineLength, h / 2 - r / 2);

    ctx.moveTo(w / 2 + r, h / 2 - lineLength);
    ctx.lineTo(w / 2 + r, h / 2 + lineLength);
    ctx.moveTo(w / 2 + r / 2, h / 2 - lineLength);
    ctx.lineTo(w / 2 + r / 2, h / 2 + lineLength);
    ctx.moveTo(w / 2 - r, h / 2 - lineLength);
    ctx.lineTo(w / 2 - r, h / 2 + lineLength);
    ctx.moveTo(w / 2 - r / 2, h / 2 - lineLength);
    ctx.lineTo(w / 2 - r / 2, h / 2 + lineLength);
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(w / 2, h / 2);
    ctx.arc(w / 2, h / 2, r / 2, 1 / 2 * Math.PI, Math.PI, false);
    ctx.lineTo(w / 2 - r, h / 2);
    ctx.lineTo(w / 2 - r, h / 2 - r / 2);
    ctx.lineTo(w / 2, h / 2 - r / 2);
    ctx.lineTo(w / 2, h / 2);
    ctx.lineTo(w / 2 + r / 2, h / 2);
    ctx.lineTo(w / 2, h / 2 + r);
    ctx.lineTo(w / 2, h / 2 + r / 2);
    ctx.fill();
    ctx.moveTo(w / 2, h / 2);
    ctx.lineTo(w / 2 - r / 2, h / 2);
    ctx.stroke();
    ctx.closePath();

    let label1, label2;
    if (isNaN(rValueFun)) {
        label1 = rValueFun
        label2 = rValueFun + '/2'
    } else {
        label1 = rValueFun
        label2 = rValueFun / 2
    }
    const fontSize = w / 40;
    ctx.fillStyle = 'black'

    ctx.font = `500 ${fontSize * 1.4}px sans-serif`;
    ctx.fillText('y', w / 2 + lineLength, 15)
    ctx.fillText('x', w - 20, h / 2 - lineLength)

    ctx.fillText('-' + label2, w / 2 + lineLength, h / 2 + r / 2);
    ctx.fillText('-' + label1, w / 2 + lineLength, h / 2 + r);
    ctx.fillText(label2, w / 2 + lineLength, h / 2 - r / 2);
    ctx.fillText(label1, w / 2 + lineLength, h / 2 - r);

    ctx.fillText(label1, w / 2 + r - lineLength, h / 2 - lineLength);
    ctx.fillText(label2, w / 2 + r / 2 - lineLength, h / 2 - lineLength);
    ctx.fillText('-' + label1, w / 2 - r - lineLength, h / 2 - lineLength);
    ctx.fillText('-' + label2, w / 2 - r / 2 - lineLength, h / 2 - lineLength);
}

console.log(h)
let xCoordinate;
let yCoordinate;
document.querySelector('#graph').onmousemove = function (event) {
    xCoordinate = ((event.offsetX - w / 2) / ((w - w / 6.4) / 2) * rValue).toFixed(2)
    yCoordinate = ((h / 2 - event.offsetY) / ((w - w / 6.4) / 2) * rValue).toFixed(2)
    document.querySelector('#inputText').placeholder = yCoordinate
    document.querySelector('#x').innerHTML = xCoordinate
}
document.querySelector('#graph').onclick = function () {
    // if (xCoordinate === undefined || yCoordinate === undefined) {
    //     alert("select the radius")
    // } else {
    console.log(xCoordinate);
    console.log(yCoordinate);
    send(xCoordinate, yCoordinate, rValue)
    // }
}

function drawPoint(x, y, result) {
    console.log(rValue)
    ctx.fillStyle = Boolean(result) ? "green" : "red"
    ctx.beginPath();
    ctx.arc(x * ((w - w / 6.4) / 2) / rValue + w / 2, -y * ((w - w / 6.4) / 2) / rValue + h / 2, 5, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function redrawPoint() {
    const table = document.getElementById("result_data");
    if (table) {
        for (let item of table.rows) {
            const x = parseFloat(item.children[0].innerText.trim().replace(",", "."));
            const y = parseFloat(item.children[1].innerText.trim().replace(",", "."));
            const r = parseFloat(item.children[2].innerText.trim().replace(",", "."));

            if (isNaN(x) || isNaN(y) || isNaN(r)) continue;
            drawPoint(x, y, rValue);
        }
    }
}