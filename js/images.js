'use strict';

/*  
1. images model.
2. render images.
*/

var gNextId = 1;
var gImgs;

function init() {
   gImgs= createImgs();
   renderImgs(gImgs);
}

function createImgs() {
    var imgs = [];

    imgs.push(createImage('../img/Oprah-You-Get-A.jpg', ['happy']));
    imgs.push(createImage('../img/X-Everywhere.jpg', ['sad']));

    return imgs;
}

function createImage(url, keywords) {
    return {
        id: gNextId++,
        url: url,
        keywords: keywords
    };
}

function renderImgs(imgs) {
    var strHtml = imgs.map(function (img, idx) {
        return `
        <div class="img"><img id='${img.id}' src='${img.url}' onclick="sendToCanvas(${img.id},this)" alt='meme picture'/></div>
        `
    });

    document.querySelector('.gallery').innerHTML= strHtml.join('');
  

}
