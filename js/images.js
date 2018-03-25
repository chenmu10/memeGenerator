'use strict';

/*  
1. images model.
2. render images.
*/

var gNextId = 1;
var gImgs;

function init() {
    gImgs = createImgs();
    renderImgs(gImgs);
}

function createImgs() {
    var imgs = [];

   imgs.push(createImage('./img/gallery/Oprah-You-Get-A.jpg', ['happy']),
        createImage('./img/gallery/One-Does-Not-Simply.jpg', ['fun']),
        createImage('./img/gallery/Ancient-Aliens.jpg', ['happy']),
        createImage('./img/gallery/Batman-Slapping-Robin.jpg', ['happy']),
        createImage('./img/gallery/Mocking-Spongebob.jpg', ['happy']),
         createImage('./img/gallery/success.jpg', ['happy']),
        createImage('./img/gallery/X-Everywhere.jpg', ['sad']));

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
        <img id='${img.id}' src='${img.url}' onclick="initMemeEditor(${img.id},this)" alt='meme picture'/>
        `
    })
        .join(' ')
        
    document.querySelector('.gallery').innerHTML = strHtml;
}

// <div id='${img.id}' class="photo" onclick="initMemeEditor(${img.id},this)" style="background-image: url('${img.url}')">