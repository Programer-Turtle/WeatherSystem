Data = {
    'Indiana':{
        'Wayne':{
            'CountyCode':'INC177',
            'ForecastCode':'INZ050',
            'Latitude':'39.85798997939911',
            'Longitude':'-84.99676590292087',
            'ReflectivityRadar':'https://radar.weather.gov/?settings=v1_eyJhZ2VuZGEiOnsiaWQiOiJsb2NhbCIsImNlbnRlciI6Wy04My44MjIsMzkuNDJdLCJsb2NhdGlvbiI6bnVsbCwiem9vbSI6OC40OTU2NDQ5MzIwNDQ0MzUsImZpbHRlciI6bnVsbCwibGF5ZXIiOiJzcl9icmVmIiwic3RhdGlvbiI6IktJTE4ifSwiYW5pbWF0aW5nIjp0cnVlLCJiYXNlIjoic3RhbmRhcmQiLCJhcnRjYyI6ZmFsc2UsImNvdW50eSI6ZmFsc2UsImN3YSI6ZmFsc2UsInJmYyI6ZmFsc2UsInN0YXRlIjpmYWxzZSwibWVudSI6dHJ1ZSwic2hvcnRGdXNlZE9ubHkiOnRydWUsIm9wYWNpdHkiOnsiYWxlcnRzIjowLjY5LCJsb2NhbCI6MSwibG9jYWxTdGF0aW9ucyI6MCwibmF0aW9uYWwiOjAuNn19',
            'VelocityRadar':'https://radar.weather.gov/?settings=v1_eyJhZ2VuZGEiOnsiaWQiOiJsb2NhbCIsImNlbnRlciI6Wy04My45NjQsMzkuNDk2XSwibG9jYXRpb24iOm51bGwsInpvb20iOjguNDk1NjQ0OTMyMDQ0NDM1LCJmaWx0ZXIiOm51bGwsImxheWVyIjoic3JfYnZlbCIsInN0YXRpb24iOiJLSUxOIn0sImFuaW1hdGluZyI6dHJ1ZSwiYmFzZSI6InN0YW5kYXJkIiwiYXJ0Y2MiOmZhbHNlLCJjb3VudHkiOmZhbHNlLCJjd2EiOmZhbHNlLCJyZmMiOmZhbHNlLCJzdGF0ZSI6ZmFsc2UsIm1lbnUiOnRydWUsInNob3J0RnVzZWRPbmx5Ijp0cnVlLCJvcGFjaXR5Ijp7ImFsZXJ0cyI6MC42OSwibG9jYWwiOjEsImxvY2FsU3RhdGlvbnMiOjAsIm5hdGlvbmFsIjowLjZ9fQ%3D%3D'
        }
    }
}

function GetCountyData(State, County){
    return Data[State][County]
}

function GetAllStates(){
    StateKeys = Object.keys(Data)
    States = []
    for(let i = 0; i<StateKeys.length; i++){
        States.push(StateKeys[i])
    }
    return States
}

function GetAllCounties(State){
    CountyKeys = Object.keys(Data[State])
    Counties = []
    for(let i = 0; i<CountyKeys.length; i++){
        Counties.push(CountyKeys[i])
    }
    return Counties
}