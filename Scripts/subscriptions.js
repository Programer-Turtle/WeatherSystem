async function GetSubscriptions() {
    let Response = await fetch('https://api.weathersystem.org/getSubscriptions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: localStorage.getItem("Username"),
            token: localStorage.getItem("Token")
        })
    })
    if(Response.ok){
        let Data = await Response.json()
        console.log(Data.subscriptions)
        return Data.subscriptions
    }
}

async function GetsubscriptionLink(username, token) {
    let response = await fetch('https://api.weathersystem.org/create-subscription-session-for-texts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: localStorage.getItem("Username"),
          token: localStorage.getItem("Token")
        }),
      })
      if(response.ok){
        Data = await response.json()
        window.location = Data.url
      }
      else{
        errorData = await response.json()
        console.log(errorData["error"])
      }
      
}

async function GoToEditPage() {
    let response = await fetch('https://api.weathersystem.org/edit-subscription-session-for-texts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: localStorage.getItem("Username"),
          token: localStorage.getItem("Token")
        }),
      })
      if(response.ok){
        Data = await response.json()
        window.location = Data.url
      }
      else{
        errorData = await response.json()
        console.log(errorData["error"])
      }
}

async function CheckIfConfirmed() {
  let response = await fetch('https://api.weathersystem.org/getphonenumberverified', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: localStorage.getItem("Username"),
        token: localStorage.getItem("Token")
      }),
    })
    if(response.ok){
      Data = await response.json()
      console.log(Data)
      return Data.number
    }
    else{
      errorData = await response.json()
      console.log(errorData["error"])
    }
}
//getphonenumberverified
async function SetupUI() {
    let URL = window.location.href.split('/')
    Page = URL.pop()
    if(Page == "services.html" || Page == "services"){
        let SubButton = document.getElementById("Sub")
        let LocButton = document.getElementById("Loc")
        let EditButton = document.getElementById("Edit")
        let NotVerified = document.getElementById("Notver")

        let SubscriptionList = await GetSubscriptions()
        if(SubscriptionList.includes("Texts")){
            LocButton.style.display = "block"
            EditButton.style.display = "block"
        }
        else if(!(await CheckIfConfirmed())){
          NotVerified.style.display = "block"
        }
        else{
            SubButton.style.display = "block"
        }
    }
}

SetupUI()