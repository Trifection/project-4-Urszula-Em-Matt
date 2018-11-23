
//this is where i tried to structure the request in the same way we did it in class yesteday, however it was giving a "same origin policy" error

const newsApp = {};
newsApp.apiKey = `4135dcf939eb4bae959a26ff87fedc97`;

// const year = 2016 // will turn this into a value from the user input button 
const month = 05 // same as above
const imagePath = `images/2016/05/01/fashion/weddings/01BARNETTjpg/01BARNETTjpg-articleLarge-v2.jpg`
const articleTitle = 'a perfect title';
const targetDate = 20140608;

newsApp.getArticle = (month, year) => {
    $.ajax({
        url: `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`,
        method: 'GET',
        data: {
            'api-key': newsApp.apiKey,
        },
    }).then(res => {
        const results = res.response.docs;
        console.log(results)
        newsApp.filterResults(results)
    });
}

// $.ajax({
//     url: `https://api.nytimes.com/svc/archive/v1/2016/05.json`,
//     method: 'GET',
//     data: {
//         'api-key': newsApp.apiKey,
//     },
// }).then(res => {
//     const results = res.response.docs;
//     console.log(results)
//     newsApp.slicedDate = results.pub_date.slice(0, 10);
//     newsApp.filteredResults(results)
// });

newsApp.filterResults = (results) => {
    const filteredByDay = results.filter((article) => {
        console.log(article)
        // (\A[^ -] + -[^ -] + -[^ -])
        if (['pub_date'].includes('22')) { //trying to filter by day
            return true;
        }

        //     //pub_date: "2018-10-02T22:53:47+0000"
    }
    )

    console.log(filteredByDay)

    // NEXT STEPS 
    // figure out how to filter by day
    //pass data from filter method to displayResults
    // for each loop in the display results will append to the dom
}

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
    // console.log(nuserDate);
};




// pub_date is equal to the exact date of the article published, could do it. 





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

$(function () { // start document ready 
    newsApp.init();
}); // end of document ready 

newsApp.init = function () {
    newsApp.getArticle();
    newsApp.listenForChange()
    // newsApp.getWeather()
}; 