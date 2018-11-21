
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
            console.log(res.response.docs); 
        })
}

const userDate = prompt("on what day were you born?");

// WEATHER
newsApp.getWeather = () => {
    const key = `3cfe0fcbefde809eecee7f6244bb8bdf`;
    let lat =  40.712;
    let long = -74.006;
    let time = 746236800;
    let unit = "?units=ca";
    // let exclude = "?exclude=currently,flags";
    let url = `https://api.darksky.net/forecast/${key}/${lat},${long},${time}`; // time machine request

    // get darksky api data
    $.ajax({
        url: url,
        dataType: 'jsonp',
    }).then((res) =>{
        console.log(res);
    })
}

$(function () { // start document ready 
    newsApp.init();
}); // end of document ready 


newsApp.init = function () {
    // newsApp.getArticle(); 
    newsApp.getWeather();
}


//console.log(res.response.docs[0].headline.main) 
