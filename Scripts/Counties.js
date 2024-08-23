Data = {
    'Indiana':{
        'Wayne County':{
            'CountyCode':'INZ050',
            'Latitude':'39.85798997939911',
            'Longitude':'-84.99676590292087'
        }
    }
}

function GetCountyData(State, County){
    return Data[State][County]
}