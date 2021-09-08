const body = document.querySelector("body");

function setBackgroundImage(){
    fetch(`https://source.unsplash.com/1600x900/?beach`).then((response) => {   
        const image = new Image();
        image.src = response.url
        image.classList.add("bgImage");
        body.prepend(image);
    }) 
  }

  
  setBackgroundImage();
