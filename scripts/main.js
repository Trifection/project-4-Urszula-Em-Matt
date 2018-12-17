$(function () { // start document ready 
  newsApp.init();


}); // end of document ready 


const newsApp = {};
newsApp.apiKey = `4135dcf939eb4bae959a26ff87fedc97`;
// get article based off month and year
newsApp.getArticle = (month, year) => {

  $('#btn-submit').click(function () {
  $('#preloader').removeClass("displayNone")
  });

    $.ajax({
        url: `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json`,
        method: 'GET',
        data: {
            'api-key': newsApp.apiKey,
        },
    }).then(res => {
      $("#preloader").addClass("displayNone")
        const results = res.response.docs; // store results in a variable called results
        newsApp.filterResults(results);
    });
};

newsApp.filterResults = (results, weather) => {

    const filteredByDay = results.filter((article) => {

        const str = article.pub_date.replace(/-/g, ' '); //turn dashes into whitespace
        const splitString = str.split(" "); //splice the pub into array by whitespace
        const sliceString = splitString[2].slice(0, 2); //the date is now in the second object, "slice" just use the first two numbers.

        if ((newsApp.userSelectedDay == sliceString) && (article.snippet !== null)) {
            return newsApp.filterResults;
        }
    });

    // for loop to iterate over filtered array and randomly generate 7 random articles 
    for (let i = 0; i < 7; i++) {
        const randomNumber = Math.floor(Math.random() * filteredByDay.length - 1)
        const randomNewsObject = filteredByDay.splice(randomNumber, 1);
        newsApp.displayResults(randomNewsObject[0], i); //added the index[i] to pass to the displayResults 
    }
}
// function that displays results and appends them to the page
newsApp.displayResults = (newsArticle, indexOf, res) => {
    // empty results
    $(`article[data-location=${indexOf}]`).empty();

    // append headline, a snippet of the article, and a link to read more
    $(`article[data-location=${indexOf}]`).append(`
                <h2>${newsArticle.headline.main}</h2>
                <p> ${newsArticle.snippet}</p>
                <a href =${newsArticle.web_url} $>read more</a>
            `);
};

// unix time converter - number of seconds since January 1, 1970
newsApp.convertToUnix = (year, month, day) => {
    let unixDate = new Date(`${year}-${month}-${day}`);
    const convertedTime = Math.floor(unixDate.getTime() / 1000);
    newsApp.getWeather(convertedTime);
}

// when user clicks submit - date is generated in year-month-day and is then converted to unix
newsApp.listenForChange = function () {
    $('#btn-submit').on('click', function (event) {
        event.preventDefault(); // prevent default on submit

        $('div.website-intro-container').addClass("website-intro-container-fadeout");
        $('main').removeClass('main-opacity'); // removes opacity
        let day, month, year; // variable date declarations
        let date = new Date($('#date').val()); // gets value of date selected from input w/ id of date
        day = date.getDate() + 1; // day variable 
        month = date.getMonth() + 1; // month variable
        year = date.getFullYear(); // year variable 
        newsApp.userSelectedDay = day; // redefined day to make it usable in global scope
        newsApp.getArticle(month, year);
        newsApp.displayUserDate(year, month, day);
        newsApp.convertToUnix(year, month, day);
    });
    newsApp.getArticle();
};

// converts month in integer to string(word)
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
    $('#displayDate').text(`Today is ${monthWord} ${day}, ${year}`) //displays the date on page
}



// init function
newsApp.init = function () {
    newsApp.getArticle();
    newsApp.listenForChange();
    newsApp.getWeather();
    newsApp.todaysDate();
    newsApp.printWeather();
    newsApp.loadSkycons();
};

newsApp.todaysDate = function (){
    let todaysDate = new Date();
    let todayDay = todaysDate.getDate();
    let todayMonth = todaysDate.getMonth();
    let todayYear = todaysDate.getFullYear();
    $('.form-input').val(`${todayYear}-${todayMonth}-${todayDay}`)
}

// WEATHER----------------------------------------------------------------------------------------------
// WEATHER API REQUEST
newsApp.getWeather = (myTime) => {
    const key = `3cfe0fcbefde809eecee7f6244bb8bdf`;
    let lat = 40.712; //set lat and long based of New York City
    let long = -74.006;
    let time = myTime;
    let url = `https://api.darksky.net/forecast/${key}/${lat},${long},${time}`; // time machine request


    // get darksky api data
    $.ajax({
        url: url,
        dataType: 'jsonp',
    }).then((res) => {
        const weatherInfo = {
            icon: res.currently.icon, // icon needed for skycon
            summary: res.hourly.summary, // summary of weather forecast
            temperature: res.currently.temperature // current temperature
        }
        newsApp.printWeather(weatherInfo);
    });
}

// prints weather information (skycon, summary, and temperature) from darksky to the DOM
newsApp.printWeather = (weatherInfo) => {
    $('.weather-results').empty();
    $(".weather-results").append(`
    <canvas id="${weatherInfo.icon}" width="80" height="80"></canvas>
    <h1>${weatherInfo.summary}
    <h2>${weatherInfo.temperature.toFixed(0)} &#8457;
    `);
    newsApp.loadSkycons();
}

// function to hold and run appropriate skycons depending on the weather
newsApp.loadSkycons = () => {
    const icons = new Skycons({ "color": "#232323" });
    icons.set("clear-day", Skycons.CLEAR_DAY);
    icons.set("clear-night", Skycons.CLEAR_NIGHT);
    icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY)
    icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
    icons.set("cloudy", Skycons.CLOUDY);
    icons.set("rain", Skycons.RAIN);
    icons.set("sleet", Skycons.SLEET);
    icons.set("snow", Skycons.SNOW);
    icons.set("wind", Skycons.WIND);
    icons.set("fog", Skycons.FOG);
    icons.play();
}