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