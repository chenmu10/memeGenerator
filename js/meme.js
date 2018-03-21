'use strict';


// gMeme - the current image on canvas
var gMeme = {
    selectedImgId: null,
    txts: [
        {
            line: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}


var gCtx;
function sendToCanvas(imgId, elImg) {
    gMeme.selectedImgId= imgId;
    var canvas;

    canvas = document.getElementById('myCanvas');
    gCtx = canvas.getContext('2d');

    var imageObj = new Image();
    imageObj.onload = function () {
        canvas.width = imageObj.width;
        canvas.height = imageObj.height;
        drawImage(this);
    };

    var imgIdx  = gImgs.findIndex(function (img) {
        return imgId === img.id;
    })
    
    imageObj.src = gImgs[imgIdx].url;
}


function drawImage(imageObj) {
    var x = 0;
    var y = 0;

    gCtx.drawImage(imageObj, x, y);

    var imageData = gCtx.getImageData(x, y, imageObj.width, imageObj.height);
    var data = imageData.data;

    // overwrite original image
    gCtx.putImageData(imageData, x, y);
}


// ctx.font = "30px Arial";
// ctx.strokeText("line1",10,50);