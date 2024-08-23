async function GetForecast(CountyCode, Lat, Long) {
    //Short Forecast
    let ShortForecast = await fetch(`https://api.weather.gov/zones/forecast/${CountyCode}/forecast`, {
        method: 'Get'
    })
    let data = await ShortForecast.json()
    data = data.properties.periods

    //Hourly Forecast
    let HourlyForecastLink = await fetch(`https://api.weather.gov/points/${Lat},${Long}`, {
        method: 'Get'
    })
    let HourlyLink = await HourlyForecastLink.json()
    HourlyLink = HourlyLink.properties.forecastHourly

    let HourlyForecast = await fetch(HourlyLink, {
        method: 'Get'
    })
    let HourlyForecastData = await HourlyForecast.json()
    HourlyForecastData = HourlyForecastData.properties.periods
    HourlyConditions = []

    for(let i = 0; i<12; i++){
        HourlyConditions.push(HourlyForecastData[i])
    }

    //Returns Data
    return {'ShortForecast':`${data[0].name}\n${data[0].detailedForecast}\n\n${data[1].name}\n${data[1].detailedForecast}`, 'HourlyForecast':HourlyConditions}
}

async function MainForecast() {
    let WeatherText = document.getElementById("Weather")
    let link = location.href
    if (link.includes("?")){
        let CountyNameData = link.split("?")[1]
        CountyNameData = CountyNameData.split(",")
        let State = CountyNameData[0]
        let County = CountyNameData[1].replace("-", " ")
        let CountyData = GetCountyData(State, County)
        let CountyCode = CountyData.CountyCode
        let CountyLat = CountyData.Latitude
        let CountyLong = CountyData.Longitude
        console.log("Valid Page")
        dictionary = await GetForecast(CountyCode, CountyLat, CountyLong)
        console.log(dictionary)
        WeatherText.innerText = dictionary.ShortForecast
    }
    else
    {
        WeatherText.innerText = "Not a valid County Code." 
    }
}