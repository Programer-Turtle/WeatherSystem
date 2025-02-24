const clientReferenceId = 'sdsa'; // Set the client reference ID

// Send a POST request to create the Checkout Session
async function GetsubscriptionLink(username, token) {
    let response = await fetch('https://weather.informapi.xyz/create-subscription-session-for-texts', {
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

GetsubscriptionLink()