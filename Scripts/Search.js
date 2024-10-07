function UpdateCounties(){
    let State = document.getElementById("StateDropdown").value
    let CountyDropDown = document.getElementById("CountyDropdown")
    let CountyDropDownInnerHTML = ``
    let Counties = GetAllCounties(State)

    for (let CountyIndex = 0; CountyIndex<Counties.length; CountyIndex++){
        CountyDropDownInnerHTML += `<option value="${Counties[CountyIndex]}">${Counties[CountyIndex]}</option>`
    }

    CountyDropDown.innerHTML = CountyDropDownInnerHTML

}

function PutStateOption(){
    let StateDropDown = document.getElementById("StateDropdown")
    let StateDropDownInnerHTML = ``
    let States = GetAllStates()
    for (let StateIndex = 0; StateIndex<States.length; StateIndex++){
        StateDropDownInnerHTML += `<option value="${States[StateIndex]}">${States[StateIndex]}</option>`
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