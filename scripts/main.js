
//this is where i tried to structure the request in the same way we did it in class yesteday, however it was giving a "same origin policy" error

const newsApp = {};
newsApp.apiKey = `4135dcf939eb4bae959a26ff87fedc97`;

const year = 2016 // will turn this into a value from the user input button 
const month = 05 // same as above
const imagePath = `images/2016/05/01/fashion/weddings/01BARNETTjpg/01BARNETTjpg-articleLarge-v2.jpg`

newsApp.getArticle = $.ajax({
    url: `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`,
    method: 'GET',
    data: {
        'api-key': newsApp.apiKey,
    },
})
    .then(res =>  { 
    const results = res.response.docs[4];
    newsApp.displayResults(results); // if we pass an index to the docs[0] we can target a specific article

    // console.log(res.response.docs[0].multimedia[1].legacy.xlarge) // this is the path for the image 
    // console.log(res.response.docs[0].web_url) // this is the image path for the article 
    // console.log(res.response.docs[0].pub_date) // this is the exact date of this article pub_date is the key on the object article. 

});

newsApp.displayResults = (article) => {
    console.log(article);

        $('article').append(`
        <img src = https://www.nytimes.com/${imagePath}>
        <h2> </h2>
        <a href = $>read more</a>
        `);

}






const pubDate = //input from user's form

// pub_date is equal to the exact date of the article published, could do it. 


    // .then(result1 => { 
    //     console.log('result1', result1);
        // console.log(res.response.docs[0].multimedia[1].legacy.xlarge);
// newsApp.getArticle2 = $.ajax({
//     url: `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
//     method: 'GET',
//     dataType: 'json',
//     data: {
//         'api-key': newsApp.apiKey,
//         'begin_date': `${userDate}`,
//         'end_date': `${userDate}`,
//         'fl': `news_desk,web_url,headline,multimedia`,
//         'page': 1
//     },
// });

// $.when(newsApp.getArticle)
//     .then((...res) => {
//         console.log(res);
//     })

            // console.log(res.response.docs[3].web_url);
            //image --> res.response.docs[0].multimedia[0]
            // web url [read more] --> res.response.docs[0].web_url;
            //title
            //abstract 
             // $('.main-article-image img').attr('src', '');   

    
    // newsApp.showArticle = function (article) {
    //     article.forEach((news) => {

    //     });
    // }


// WEATHER
// newsApp.getWeather = () => {
//     const key = `3cfe0fcbefde809eecee7f6244bb8bdf`;
//     let lat =  40.712;
//     let long = -74.006;
//     let time = 746236800;
//     let unit = "?units=ca";
//     // let exclude = "?exclude=currently,flags";
//     let url = `https://api.darksky.net/forecast/${key}/${lat},${long},${time}`; // time machine request

//     // get darksky api data
//     $.ajax({
//         url: url,
//         dataType: 'jsonp',
//     }).then((res) =>{
//         console.log(res);
//     })
// }

$(function() { // start document ready 
    newsApp.init();
}); // end of document ready 

newsApp.init = function() {
    newsApp.getArticle;
    newsApp.getArticle2;
    // newsApp.getWeather()
};