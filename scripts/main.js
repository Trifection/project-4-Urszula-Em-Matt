
//this is where i tried to structure the request in the same way we did it in class yesteday, however it was giving a "same origin policy" error

const newsApp = {};
newsApp.apiKey = `4135dcf939eb4bae959a26ff87fedc97`;

newsApp.getArticle = (month, year) => {
    $.ajax({
        url: `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`,
        method: 'GET',
        data: {
            'api-key': newsApp.apiKey,
        },
    }).then(res => {
        const results = res.response.docs;
        // console.log(results)
        newsApp.filterResults(results)
    });
};


newsApp.filterResults = (results) => {
    const filteredByDay = results.filter((article) => {

        const str = article.pub_date.replace(/-/g, ' '); //turn dashes into whitespace
        const splitString = str.split(" "); //splice the pub into array by whitespace
        const sliceString = splitString[2].slice(0, 2); //the date is now in the second object, "slice" just use the first two numbers.

        if (newsApp.userSelectedDay == sliceString) {
            return newsApp.filterResults;

        }

    });

    for (let i = 0; i < 5; i++) {
        const randomNumber = Math.floor(Math.random() * filteredByDay.length - 1)
        console.log(randomNumber)

        const randomNewsObject = filteredByDay.splice(randomNumber, 1);
        console.log(randomNewsObject);
    }
}

// NEXT STEPS 
// ffilteredByDay is an ARRAY of article objects. 
// pass data from filter method to displayResults
// for each loop in the display results will append to the dom

newsApp.displayResults = (article) => {
    // console.log(article);
    $('article').append(`
            <div>
            <img src = https://www.nytimes.com/${imagePath}>
            </div>
            <h3>${article.headline.main}</h3>
            <a href =${article.web_url} $>read more</a>
        `);
};

newsApp.listenForChange = function () {
    $('#btn-submit').on('click', function (event) {
        event.preventDefault();
        // getVal();
        // Dont remove the +1 from the month/day, it will break the API call!!!!!!!!
        let day, month, year;
        let date = new Date($('#date').val());
        day = date.getDate() + 1;
        month = date.getMonth() + 1;
        year = date.getFullYear();
        newsApp.userSelectedDay = day;
        console.log(year, month, day)
        newsApp.getArticle(month, year);
    });
    newsApp.getArticle();
};

$(function () { // start document ready 
    newsApp.init();
}); // end of document ready 

newsApp.init = function () {
    newsApp.getArticle();
    newsApp.listenForChange()
    // newsApp.getWeather()
};
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