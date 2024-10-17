async function GetForecast(CountyCode, ForecastCode, Lat, Long) {
    //Short Forecast
    let ShortForecast = await fetch(`https://api.weather.gov/zones/forecast/${ForecastCode}/forecast`, {
        method: 'Get'
    })
    if (!ShortForecast.ok){
        console.log("Connecting to NWS API failed. Reloading")
        location.reload()
    }
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

    let AlertsRequest = await fetch(`https://api.weather.gov/alerts/active/zone/${CountyCode}`, {
        method: 'Get'
    })
    let AlertData = await AlertsRequest.json()
    let Alerts = []

    for(let i = 0; i<AlertData["features"].length; i++){
        Alerts.push(AlertData["features"][i])
    }

    for(let i = 0; i<12; i++){
        HourlyConditions.push(HourlyForecastData[i])
    }

    //Returns Data
    return {'ShortForecast':`${data[0].name}\n${data[0].detailedForecast}\n\n${data[1].name}\n${data[1].detailedForecast}`, 'HourlyForecast':HourlyConditions, 'Alerts':Alerts}
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
        let ForecastCode = CountyData.ForecastCode
        let CountyLat = CountyData.Latitude
        let CountyLong = CountyData.Longitude
        let ReflectivityURL = CountyData.ReflectivityRadar
        console.log(ReflectivityURL)
        let VelocityURL = CountyData.VelocityRadar
        console.log("Valid Page")
        document.getElementById("CountyHeader").innerText = `${County} County Forecast`
        try{
            dictionary = await GetForecast(CountyCode, ForecastCode, CountyLat, CountyLong)
        }
        catch{
            console.log("Error Occured")
            location.reload()
        }
        console.log(dictionary)
        WeatherText.innerText = dictionary.ShortForecast

        //Add Radars
        let ReflectivityView = document.getElementById("ReflectivityView")
        let VelocityView = document.getElementById("VelocityView")

        ReflectivityView.src = ReflectivityURL
        VelocityView.src = VelocityURL

        //Show Alerts
        let Alerts = dictionary.Alerts
        let AlertList = document.getElementById("AlertsList")
        if(! Alerts.length == 0){
            for(let i = 0; i<Alerts.length; i++){
                //Set Alert Text
                let AlertHeadline = ""
                let AlertText = ""
                currentAlert = Alerts[i]
                if(!["", "null", null].includes(currentAlert['properties']['parameters']['NWSheadline'])){
                    AlertHeadline=`${currentAlert['properties']['parameters']['NWSheadline'][0]}\n`
                }
                else{
                    AlertHeadline=`${currentAlert['properties']['event']}\n`
                }
    
                AlertText += `<span style='font-weight: bold;'>${currentAlert['properties']['headline']}</span>\n\n<span style='font-weight: bold;'>Severity</span>\n${currentAlert['properties']['severity']}`

                if(! ["", "null", null].includes(currentAlert['properties']['certainty'])){
                    AlertText+=`\n\n<span style='font-weight: bold;'>Certainty</span>\n${currentAlert['properties']['certainty']}`
                }

                AlertText+=`\n\n<span style='font-weight: bold;'>Description</span>\n${currentAlert['properties']['description']}`
                
                if (! ["", "null", null].includes(currentAlert['properties']['instruction'])){
                    AlertText+=`\n\n<span style='font-weight: bold;'>Instruction</span>\n${currentAlert['properties']['instruction']}`
                }
    
                //Creat Text Box
                let AlertBox = document.createElement("div")
                AlertBox.className = "AlertBox"
    
                let AlertHeadlineHeader = document.createElement("h1")
                AlertHeadlineHeader.innerText = AlertHeadline
                AlertHeadlineHeader.style = "text-align: left;font-size: 25px;"

                AlertText = AlertText.replaceAll("\n", "<br>")
                let AlertTextParagraph = document.createElement("p")
                AlertTextParagraph.innerHTML = AlertText

                AlertBox.appendChild(AlertHeadlineHeader)
                AlertBox.appendChild(AlertTextParagraph)
                AlertList.appendChild(AlertBox)
            }
        }
        else{
            //Creat Text Box
            let AlertBox = document.createElement("div")
            AlertBox.className = "AlertBox"

            let AlertTextParagraph = document.createElement("h1")
            AlertTextParagraph.innerText = "No Active Alerts"

            AlertBox.appendChild(AlertTextParagraph)
            AlertList.appendChild(AlertBox)
        }
    }
    else
    {
        //Creat New Weather Text
        let NewWeatherText = document.createElement("h1")
        NewWeatherText.innerText = "No County Selected"
        WeatherText.parentNode.replaceChild(NewWeatherText, WeatherText)

        //Creat Alert Box
        let AlertList = document.getElementById("AlertsList")
        let AlertBox = document.createElement("div")
        AlertBox.className = "AlertBox"

        let AlertTextParagraph = document.createElement("h1")
        AlertTextParagraph.innerText = "No Active Alerts"

        AlertBox.appendChild(AlertTextParagraph)
        AlertList.appendChild(AlertBox)
    }
}

async function GetActiveAlert(AlertID) {
    console.log("Getting Alerts")
    let AlertsRequest = await fetch('https://api.weather.gov/alerts/active/', {
        method:'Get'
    })
    if(!AlertsRequest.ok){
        location.reload()
    }
    console.log(AlertsRequest)

    let Alerts = await AlertsRequest.json()
    let AlertsList = Alerts['features']
    
    for(let i = 0; i<AlertsList.length; i++){
        if(AlertsList[i]['properties']['id'] == AlertID){
            console.log(AlertsList[i])
            return AlertsList[i]
        }
    }
    return false
    
}

async function GetPastAlerts(AlertID) {
    console.log("Getting Alerts")
    let AlertsRequest = await fetch('https://api.weather.gov/alerts/', {
        method:'Get'
    })
    if(!AlertsRequest.ok){
        location.reload()
    }
    console.log(AlertsRequest)

    let Alerts = await AlertsRequest.json()
    let AlertsList = Alerts['features']
    
    for(let i = 0; i<AlertsList.length; i++){
        if(AlertsList[i]['properties']['id'] == AlertID){
            console.log(AlertsList[i])
            return AlertsList[i]
        }
    }
    return false
}

async function AlertLoad() {
    let link = location.href
    link = link.replaceAll("%3A", ":")
    console.log(link)
    let AlertText = ""
    let Header = document.getElementById("AlertHeader")
    let AlertBox = document.getElementById("AlertBox")
    if(link.includes('?')){
        let AlertID = link.split("?")[1]
        let AlertData = await GetActiveAlert(AlertID)
        if(AlertData == false){
            AlertData = await GetPastAlerts(AlertID)
            AlertText+="<span style='font-weight: bold;'>Expired</span>\n"
        }
        if(!AlertData==false){
            if(!["", "null", null].includes(AlertData['properties']['parameters']['NWSheadline'])){
                Header.innerText=`${AlertData['properties']['parameters']['NWSheadline'][0]}\n`
            }
            else{
                Header.innerText=`${AlertData['properties']['event']}\n`
            }

            AlertText += `<span style='font-weight: bold;'>${AlertData['properties']['headline']}</span>\n\n<span style='font-weight: bold;'>Severity</span>\n${AlertData['properties']['severity']}`

            if(! ["", "null", null].includes(AlertData['properties']['certainty'])){
                AlertText+=`\n\n<span style='font-weight: bold;'>Certainty</span>\n${AlertData['properties']['certainty']}`
            }

            AlertText+=`\n\n<span style='font-weight: bold;'>Description</span>\n${AlertData['properties']['description']}`
                
            if (! ["", "null", null].includes(AlertData['properties']['instruction'])){
                AlertText+=`\n\n<span style='font-weight: bold;'>Instructions</span>\n${AlertData['properties']['instruction']}`
            }

            //Adds to HTML
            let AlertTextArea = document.createElement('p')
            AlertText = AlertText.replaceAll("\n", "<br>")
            AlertTextArea.innerHTML = AlertText
            AlertBox.appendChild(AlertTextArea)
        }
        else{
            Header.innerText = "Invalid Alert URL"
            let ErrorTextArea = document.createElement('p')
            ErrorTextArea.innerHTML = "<h1>This alert doesn't exist or was deleted.</h1>"
            AlertBox.appendChild(ErrorTextArea)
        }
    }
    else{
        Header.innerText = "No Alert Entered"
        let ErrorTextArea = document.createElement('p')
        ErrorTextArea.innerHTML = "<h1>Please use an official URL.</h1>"
        AlertBox.appendChild(ErrorTextArea)
    }
}