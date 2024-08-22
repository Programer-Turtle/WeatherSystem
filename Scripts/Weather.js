async function GetForecast(CountyCode) {
    console.log(`https://api.weather.gov/zones/forecast/${CountyCode}/forecast`)
    let Forecast = await fetch(`https://api.weather.gov/zones/forecast/${CountyCode}/forecast`, {
        method: 'Get',
    })
    let data = await Forecast.json()
    data = data.properties.periods
    return `${data[0].name}\n${data[0].detailedForecast}\n\n${data[1].name}\n${data[1].detailedForecast}` 
}

async function MainForecast() {
    let WeatherText = document.getElementById("Weather")
    let link = location.href
    if (link.includes("?")){
        countyCode = link.split("?")[1]
        console.log("Valid Page")
        dictionary = await GetForecast(countyCode)
        console.log(dictionary)
        WeatherText.innerText = dictionary
    }
    else
    {
        WeatherText.innerText = "Not a valid County Code." 
    }
}