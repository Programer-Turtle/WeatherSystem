function UpdateCounties(){
    let State = document.getElementById("StateDropdown").value
    let CountyDropDown = document.getElementById("CountyDropdown")
    let CountyDropDownInnerHTML = ``
    let Counties = GetAllCounties(State)

    for (let CountyIndex = 0; CountyIndex<Counties.length; CountyIndex++){
        CleanName = Counties[CountyIndex].replace("_", " ")
        CountyDropDownInnerHTML += `<option value="${Counties[CountyIndex]}">${CleanName}</option>`
    }

    CountyDropDown.innerHTML = CountyDropDownInnerHTML

}

function PutStateOption(){
    let StateDropDown = document.getElementById("StateDropdown")
    let StateDropDownInnerHTML = ``
    let States = GetAllStates()
    for (let StateIndex = 0; StateIndex<States.length; StateIndex++){
        CleanName = States[StateIndex].replace("_", " ")
        StateDropDownInnerHTML += `<option value="${States[StateIndex]}">${CleanName}</option>`
    }

    StateDropDown.innerHTML = StateDropDownInnerHTML
    StateDropDown.addEventListener("change", UpdateCounties)
    UpdateCounties()
}

function Search(){
    let State = document.getElementById("StateDropdown").value
    let County = document.getElementById("CountyDropdown").value
    window.location = `CountyForecast.html?${State},${County}`
}

async function SetLocation(State, County) {
    let Response = await fetch('http://localhost:3000/setLocation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: localStorage.getItem("Username"),
            token: localStorage.getItem("Token"),
            state:State,
            county:County
        })
    })
    if(!Response.ok){
        errorData = await Response.json()
        document.getElementById("ErrorText").innerText = errorData.error
    }
    else{
        window.location = "services.html"
    }
}

function LocationSearch(){
    document.getElementById("ErrorText").innerText = ""
    let State = document.getElementById("StateDropdown").value
    let County = document.getElementById("CountyDropdown").value
    SetLocation(State, County)
}