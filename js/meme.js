'use strict';



var gMeme = {
    selectedImgId: null,
    txts: [
        {
            line: 'Line 1',
            size: 20,
            align: 'left',
            color: 'red',
            fontFamily: 'ariel',
            coord: { x: 150, y: 70 }
        },
        {
            line: 'Line 2',
            size: 20,
            align: 'left',
            color: 'red',
            fontFamily: 'ariel',
            coord: { x: 150, y: 300 }
        }
    ]
};
var gCtx;
var gImgObj;

function initImgCanvas(imgId) {
    var canvas;
    gMeme.selectedImgId = imgId;

    canvas = document.getElementById('myCanvas');
    gCtx = canvas.getContext('2d');

    gImgObj = new Image();
    gImgObj.onload = function () {
        canvas.width = gImgObj.width;
        canvas.height = gImgObj.height;
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
        gCtx.font = line.size + 'px' + ' ' + gMeme.txts.fontFamily;
        gCtx.fillStyle = line.color;
        gCtx.textAlign = line.align;
        gCtx.fillText(line.line, line.coord.x,  line.coord.y);
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



function changeTxt(eltxt, lineNum) {
    var txtIdx = lineNum - 1;
    
    gMeme.txts[txtIdx].line=eltxt.value;
    drawCanvas();
}