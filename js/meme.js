'use strict';



var gMeme;
var gCtx;
var gImgObj;
var UP_ARROW='▲';
var DOWN_ARROW='▼';

function resetgMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        txts: [
            {
                line: 'Line 1',
                size: 40,
                align: 'left',
                color: '#000000',
                fontFamily: 'Segoe UI',
                shadow: false,
                coord: { x: 150, y: 70 }
            },
            {
                line: 'Line 2',
                size: 40,
                align: 'left',
                color: '#000000',
                fontFamily: 'Segoe UI',
                shadow: false,
                coord: { x: 150, y: 300 }
            }
        ]
    };
}

function initImgCanvas(imgId) {
    toggleView();
    resetgMeme(imgId);
    renderLines();

    var canvas = document.getElementById('memeCanvas');
    gCtx = canvas.getContext('2d');

    gImgObj = new Image();
    gImgObj.onload = function () {
        canvas.width = gImgObj.width;
        canvas.height = gImgObj.height;
        gMeme.txts[1].coord.y = gImgObj.height - 70;

        drawCanvas();
    };

    var imgIdx = gImgs.findIndex(function (img) {
        return imgId === img.id;
    });

    gImgObj.src = gImgs[imgIdx].url;
}

function drawCanvas() {
    drawImg(gImgObj);

    gMeme.txts.forEach(txt => {
        gCtx.font = txt.size + 'px' + ' ' + txt.fontFamily;
        gCtx.fillStyle = txt.color;
        gCtx.textAlign = txt.align;
        toggleShadow(txt);

        gCtx.fillText(txt.line, txt.coord.x, txt.coord.y);
    });

}

function toggleShadow(txt) {

    if (txt.shadow) {
        gCtx.shadowOffsetX = 3;
        gCtx.shadowOffsetY = 3;
        gCtx.shadowColor = "rgba(0,0,0,0.3)";
    } else {
        gCtx.shadowOffsetX = 0;
        gCtx.shadowOffsetY = 0;
    }

}


function drawImg(imageObj) {
    var x = 0;
    var y = 0;

    gCtx.drawImage(imageObj, x, y);

    var imageData = gCtx.getImageData(x, y, imageObj.width, imageObj.height);

    // overwrite original image
    gCtx.putImageData(imageData, x, y);
}


// function editTxt(value, lineNum , property) {
//     gMeme.txts[lineNum][property] = value;
// }
function editTxt(elinput, txtIdx) {

    var property = elinput.id;

    if (elinput.type === 'select-one') {
        gMeme.txts[txtIdx][property] = elinput.options[elinput.selectedIndex].value;
    } else if (elinput.type === 'checkbox') {
        gMeme.txts[txtIdx][property] = elinput.checked;
    } else {
        gMeme.txts[txtIdx][property] = elinput.value;
    }

    drawCanvas();
}

// function moveX(txtIdx, direction) {
//     gMeme.txts[txtIdx].coord.y = (direction==='UP') ? gMeme.txts[txtIdx].coord.y +=10 :  gMeme.txts[txtIdx].coord.y -=10;
   
//     drawCanvas();
// }


/* REGISTER DOWNLOAD HANDLER */
function dlCanvas(eldllink) {
    var canvas = document.getElementById('memeCanvas');

    var dt = canvas.toDataURL('image/png');
    /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
    dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

    /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
    dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

    eldllink.href = dt;
}

function toggleView() {
    document.querySelector('.meme-container').classList.toggle('hidden');
    document.querySelector('.gallery').classList.toggle('hidden');
}

function renderLines() {
    var strHtml = gMeme.txts.map(function (txt, idx) {
        return `
        <div>
                    <input type="text" id="line" placeholder="${txt.line}"  oninput="editTxt(this,${idx})">
                    <button onclick="moveX(${idx},'UP')">${UP_ARROW}</button>
                    <button onclick="moveX(${idx},'DOWN')">${DOWN_ARROW}</button>
                    <input type="number" value="${txt.size}" step="2" id="size" oninput="editTxt(this ,${idx})">
                    <select id="fontFamily" oninput="editTxt(this,${idx})">
                        <option value="${txt.fontFamily}">Segoe UI</option>
                        <option value="Tahoma">Tahoma</option>
                        <option value="Geneva">Geneva</option>
                        <option value="Verdana">Verdana</option>
                    </select>
                    <select id="align" oninput="editTxt(this,${idx})">
                            <option value="left">left</option>
                            <option value="center">center</option>
                            <option value="right">right</option>
                    </select>
                    <input type="color" value="${txt.color}" id="color" oninput="editTxt(this,${idx})">
                    <input type="checkbox" id="shadow" name="shadow" value="shadow" onclick="editTxt(this,${idx})">
                    <label for="shadow">shadow</label>
                   
                </div>
        `
    })
        .join(' ');

    document.querySelector('.lines-list').innerHTML = strHtml;
}