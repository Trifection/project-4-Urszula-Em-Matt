
//this is where i tried to structure the request in the same way we did it in class yesteday, however it was giving a "same origin policy" error       
// const newsApp = {}
// newsApp.apiKey = "4135dcf939eb4bae959a26ff87fedc97"
// newsApp.getArticle = function(){
//     $.ajax({
//         url: "https://api.nytimes.com/svc/topstories/v2/home.jsonp",
//         method: "GET",
//         data: {
//             api-key: newsApp.apiKey
//         }
//     }).then(res => {
//         console.log("success")
//     })
// }


// this section i took directly from the nyt documentation here: https://developer.nytimes.com/top_stories_v2.json# 
let url = "https://api.nytimes.com/svc/topstories/v2/home.json";
url += '?' + $.param({
    'api-key': "4135dcf939eb4bae959a26ff87fedc97"
});
$.ajax({
    url: url,
    method: 'GET',
}).then(function (result) {
    console.log(result);
});




// $(function () {
//     newsApp.init();
// });

// newsApp.init = function () {
//     console.log("start");
// }
