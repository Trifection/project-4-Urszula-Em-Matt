
//this is where i tried to structure the request in the same way we did it in class yesteday, however it was giving a "same origin policy" error

const newsApp = {};
newsApp.apiKey = `4135dcf939eb4bae959a26ff87fedc97`;

newsApp.getArticle = function(){
        $.ajax({
            url: `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
            method: 'GET',
            dataType: 'json',
            data: {
                'api-key': newsApp.apiKey,
                'begin_date': `${userDate}`,
                'end_date': `${userDate}`,
            },
        }).then(res => {
            console.log('hello');
            console.log(res) 
        })
}

const userDate = prompt("on what day were you born?");

$(function () { // start document ready 
    newsApp.init();
}); // end of document ready 


newsApp.init = function () {
    newsApp.getArticle();
}






