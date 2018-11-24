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
        newsApp.filterResults(results)
    });
};


newsApp.filterResults = (results, weather) => {

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

newsApp.displayResults = (newsArticle, indexOf, res) => {
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

newsApp.convertToUnix = (year, month, day) => {
newsApp.unixDate = `${year}-${month}-${day}`;
console.log("here", newsApp.unixDate);
 const convertedTime = newsApp.unixDate.getTime()/1000;
 console.log(convertedTime)
 newsApp.getWeather(convertedTime);
}

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
        newsApp.convertToUnix(year, month, day);
    });
    newsApp.getArticle();
};

newsApp.displayUserDate = function (year, month, day) {
    const months = [];
    months[1] = "January";
    months[2] = "February";
    months[3] = "March";
    months[4] = "April";
    months[5] = "May";
    months[6] = "June";
    months[7] = "July";
    months[8] = "August";
    months[9] = "September";
    months[10] = "October";
    months[11] = "November";
    months[12] = "December";

    monthWord = months[month];
    $('#displayDate').text(`Today is ${monthWord} ${day}, ${year}`)
}

newsApp.convertWeather = function(weatherDate){
    weatherDate.getTime();
    console.log(weatherDate)
}

$(function () { // start document ready 
    newsApp.init();
}); // end of document ready 

newsApp.init = function () {
    newsApp.getArticle();
    newsApp.listenForChange();
};

// WEATHER
newsApp.getWeather = async (myTime) => {
    const key = `3cfe0fcbefde809eecee7f6244bb8bdf`;
    let lat =  40.712;
    let long = -74.006;
    let time = myTime;
    let unit = "?units=ca";
    // let exclude = "?exclude=currently,flags";
    let url = `https://api.darksky.net/forecast/${key}/${lat},${long},${time}`; // time machine request

    // get darksky api data
    $.ajax({
        url: url,
        dataType: 'jsonp',
    }).then((res) => {
        $('.weather-results').append(`<h1>${res.hourly.summary}</h1>`);
    })
}
