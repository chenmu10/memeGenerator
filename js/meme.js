'use strict';



var gMeme;
var gCtx;
var gImgObj;

function resetgMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        txts: [
            {
                line: 'Line 1',
                size: 30,
                align: 'left',
                color: 'red',
                fontFamily: 'Segoe UI',
                coord: { x: 150, y: 70 }
            },
            {
                line: 'Line 2',
                size: 30,
                align: 'left',
                color: 'red',
                fontFamily: 'Segoe UI',
                coord: { x: 150, y: 300 }
            }
        ]
    };
}

function initImgCanvas(imgId) {
    toggleView();
    resetgMeme(imgId);


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

    gMeme.txts.forEach(line => {
        gCtx.font = line.size + 'px' + ' ' + line.fontFamily;
        gCtx.fillStyle = line.color;
        gCtx.textAlign = line.align;
        gCtx.fillText(line.line, line.coord.x, line.coord.y);
    });

}


function drawImg(imageObj) {
    var x = 0;
    var y = 0;

    gCtx.drawImage(imageObj, x, y);

    var imageData = gCtx.getImageData(x, y, imageObj.width, imageObj.height);

    // overwrite original image
    gCtx.putImageData(imageData, x, y);
}



function editTxt(elinput, lineNum) {
    var txtIdx = lineNum - 1;
    var property = elinput.id;

    if (elinput.type === 'select-one') {
        gMeme.txts[txtIdx][property] = elinput.options[elinput.selectedIndex].value;
    } else {
        gMeme.txts[txtIdx][property] = elinput.value;
    }


    drawCanvas();
}


/* REGISTER DOWNLOAD HANDLER */
function dlCanvas(eldllink) {
    var canvas = document.getElementById('memeCanvas');

    var dt = canvas.toDataURL('image/png');
    /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
    dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

    /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
    dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

    eldllink.href = dt;
};

function toggleView() {
    document.querySelector('.meme-container').classList.toggle('hidden');
    document.querySelector('.gallery').classList.toggle('hidden');
}