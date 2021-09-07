const body = document.querySelector("body");

const imgs = [
    "https://i.pinimg.com/originals/b1/29/46/b1294600e405a7192b872bd63530b4fd.jpg",
    "https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    "data:image/jpeg;base64,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",
    "https://i.pinimg.com/originals/d4/e3/32/d4e332ab13efbfb8525dbdf1eb2201bb.jpg",
        ];

function getRandInt(){
    const number = Math.floor(Math.random() * imgs.length);
    return number;
}


function paintImage(num){
    const image = new Image();
    image.src = imgs[num];
    image.classList.add("bgImage");
    body.prepend(image);
}

function init(){
    const randInt = getRandInt();
    paintImage(randInt);
}

init();