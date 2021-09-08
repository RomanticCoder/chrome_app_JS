function getQuotes(){
    const quoteContainer = document.querySelector(".js-quote");
    fetch("https://type.fit/api/quotes")
        .then((response) =>{
            return response.json();
        })
        .then((data)=> {
            const index = Math.floor(Math.random() * data.length);
            const quote = data[index];
            console.log(quote);
            quoteContainer.innerHTML = `"${quote.text}" - ${quote.author}`
        });
}

getQuotes();
