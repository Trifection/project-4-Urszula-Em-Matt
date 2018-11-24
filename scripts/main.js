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
        console.log(results)
        newsApp.filterResults(results)
    });
};


newsApp.filterResults = (results) => {


    const filteredByDay = results.filter((article) => {

        const str = article.pub_date.replace(/-/g, ' '); //turn dashes into whitespace
        const splitString = str.split(" "); //splice the pub into array by whitespace
        const sliceString = splitString[2].slice(0, 2); //the date is now in the second object, "slice" just use the first two numbers.

        if ((newsApp.userSelectedDay == sliceString) && (results.snippet !== null)) {
            console.log("good job");
            return newsApp.filterResults;
        }
    });

    for (let i = 0; i < 5; i++) {
        const randomNumber = Math.floor(Math.random() * filteredByDay.length - 1)

        const randomNewsObject = filteredByDay.splice(randomNumber, 1);
        // console.log(randomNewsObject);
        newsApp.displayResults(randomNewsObject[0], i); //added the index to pass to the displayResults 
    }
}

newsApp.displayResults = (newsArticle, indexOf) => {
    // console.log(randomNewsObject)
    // console.log(`https://www.nytimes.com/${newsArticle.multimedia[0].url}`)

        $(`article[data-location=${indexOf}]`).empty();

        let userContent = newsArticle.snippet;

        $(`article[data-location=${indexOf}]`).append(`
                <div>
                <p> ${userContent}</p>
                </div>
                <h3>${newsArticle.headline.main}</h3>
                <a href =${newsArticle.web_url} $>read more</a>
            `);
   
};

// <img src = https://www.nytimes.com/${newsArticle.multimedia[0].url}>
// Date.prototype.toDateInputValue = (function () {
//     var local = new Date(this);
//     local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
//     return local.toJSON().slice(0, 10);
// });

// document.getElementById('datePicker').value = new Date().toDateInputValue();



// document.getElementById('datePicker').valueAsDate = new Date();

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
        console.log(year, month, day);
        newsApp.getArticle(month, year);
        newsApp.displayUserDate(year, month, day);
    });
    newsApp.getArticle();
};

newsApp.displayUserDate = function (year, month, day) {
    $('#displayDate').text(`Today is ${month} ${day}, ${year}`)
    // console.log(`Today is ${year}${month}${day}`);
}


$(function () { // start document ready 
    newsApp.init();
}); // end of document ready 

newsApp.init = function () {
    newsApp.getArticle();
    newsApp.listenForChange();
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