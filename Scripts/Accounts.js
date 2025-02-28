let ErrorText = document.getElementById("ErrorText")

function containsUnallowedSymbol(str, allowedSymbols) {
    // Create a regex pattern that allows only characters in the list
    let regex = new RegExp(`^[a-zA-Z0-9${allowedSymbols.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}]*$`);
    
    // Return true if the string contains an unallowed symbol
    return !regex.test(str);
}

async function Signup(){
    let Username = document.getElementById("UsernameInput").value
    let Password = document.getElementById("PasswordInput").value
    let passwordConfirm
    Username = Username.toLowerCase()

    let URL = window.location.href.split('/')
    Page = URL.pop()

    if(Page == "signup.html"){
        passwordConfirm = document.getElementById("PasswordInput2").value
    }
    
    if(Password != passwordConfirm){
        ErrorText.innerText = "Passwords don't match."
        return
    }

    if (containsUnallowedSymbol(Username, "-_")) {
        ErrorText.innerText = "Usernames can only contain letters, numbers, dashes, and underscores."
        return
    }

    let Response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: Username,
            password: Password
        })
    })
    console.log(Response.status)
    if(!Response.ok){
        console.log("Error")
        errorData = await Response.json()
        ErrorText.innerText = errorData["error"]
    }
    else{
        Data = await Response.json()
        console.log("Good")
        autosignin(Username, Password)
    }
}

async function signin() {
    let Username = document.getElementById("UsernameInput").value
    let Password = document.getElementById("PasswordInput").value
    Username = Username.toLowerCase()

    if (containsUnallowedSymbol(Username, "-_")) {
        ErrorText.innerText = "Usernames can only contain letters, numbers, dashes, and underscores."
        return
    }

    let Response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: Username,
            password: Password
        })
    })
    if(!Response.ok){
        errorData = await Response.json()
        ErrorText.innerText = errorData["error"]
    }
    else{
        Data = await Response.json()
        localStorage.setItem("Username", Username)
        localStorage.setItem("Token", Data["Token"])
        window.location = "index.html"
    }
}

async function autosignin(Username, Password) {
    Username = Username.toLowerCase()

    if (containsUnallowedSymbol(Username, "-_")) {
        ErrorText.innerText = "Usernames can only contain letters, numbers, dashes, and underscores."
        return
    }

    let Response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: Username,
            password: Password
        })
    })
    if(!Response.ok){
        errorData = await Response.json()
        ErrorText.innerText = errorData["error"]
    }
    else{
        Data = await Response.json()
        localStorage.setItem("Username", Username)
        localStorage.setItem("Token", Data["Token"])
        window.location = "index.html"
    }
}

async function VerifyServer(Username, Token) {
    if(Username == null){
        return false
    }
    if (containsUnallowedSymbol(Username, "-_")) {
        ErrorText.innerText = "Usernames can only contain letters, numbers, dashes, and underscores."
        return
    }

    let Response = await fetch('http://localhost:3000/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: Username,
            token: Token
        })
    })
    if(!Response.ok){
        errorData = await Response.json()
        console.log(errorData["error"])
        return false;
    }
    else{
        return true;
    }
}

async function GetPhone() {
    let Username = localStorage.getItem("Username")
    let Token = localStorage.getItem("Token")
    let Response = await fetch('http://localhost:3000/getphonenumber', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: Username,
            token: Token
        })
    })
    if(!Response.ok){
        errorData = await Response.json()
        ErrorText.innerText = errorData["error"]
    }
    else{
        Data = await Response.json()
        return Data["number"]
    }
}

async function Verify() {
    let AccountButton = document.getElementById("AccountButton")
    let ServiceButton = document.getElementById("ServiceButton")
    let SigninButton = document.getElementById("SigninButton")
    let SignupButton = document.getElementById("SignupButton")

    let Username = localStorage.getItem("Username")
    let Token = localStorage.getItem("Token")
    let URL = window.location.href.split('/')
    Page = URL.pop()
    
    if(await VerifyServer(Username, Token)){
        if(Page == "signin.html"){
            window.location = "index.html"
        }
        else{
            SigninButton.style.display = "none"
            SignupButton.style.display = "none"
            AccountButton.style.display = "block"
            ServiceButton.style.display = "block"
            if(Page == "account.html"){
                Phone = await GetPhone()
                if(Phone != null){
                    FixedPhone = `${Phone.substring(0,2)} (${Phone.substring(2,5)})-${Phone.substring(5,8)}-${Phone.substring(8,12)}`
                    document.getElementById("PhoneText").innerText = `Phone Number: ${FixedPhone}`
                    document.getElementById("HiddenDelete").style.display = "flex"
                }
            }
        }
    }
    else{
        if(Page == "account.html" || Page == "services.html"){
            localStorage.clear()
            window.location = "signin.html"
        }
    }
}

async function DeleteAccount(Username, Password) {
    let Response = await fetch('http://localhost:3000/deleteaccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: Username,
            password: Password
        })
    })
    if(!Response.ok){
        errorData = await Response.json()
        document.getElementById("DeleteError").innerText = errorData["error"]
        return false;
    }
    else{
        localStorage.clear()
        window.location = "index.html"
    }
}

async function DeleteAccountUI() {
    let Username = localStorage.getItem("Username")
    let Password = document.getElementById("DeletePassword").value

    await DeleteAccount(Username, Password)
}

async function AddPhoneNumber(Username, Token, Number) {
    let ErrorText = document.getElementById("AddPhoneError")
    let Response = await fetch('http://localhost:3000/setphonenumber', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: Username,
            token: Token,
            number:Number
        })
    })
    if(!Response.ok){
        errorData = await Response.json()
        ErrorText.innerText = errorData["error"]
    }
    else{
        alert("Your number has been saved! Were unfortunaly unable to confirm your number right now. You will be able to confirm it later.")
        location.reload()
    }

}

async function DeletePhoneNumber(Username, Password) {
    let ErrorText = document.getElementById("DeletePhoneError")
    let Response = await fetch('http://localhost:3000/deletephonenumber', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: Username,
            password: Password
        })
    })
    if(!Response.ok){
        errorData = await Response.json()
        ErrorText.innerText = errorData["error"]
    }
    else{
        location.reload()
    }
}

async function AddPhoneNumberUI() {
    let Username = localStorage.getItem("Username")
    let Token = localStorage.getItem("Token")
    let ErrorText = document.getElementById("AddPhoneError")
    let PhoneNumber = `+1${document.getElementById("PhoneNumber").value.replace(/[^\d+]/g, '')}`
    let TextConsent = document.getElementById("TextConsent").checked
    let StoreConsent = document.getElementById("StoreConsent").checked
    ErrorText.innerText = ""
    
    if(TextConsent && StoreConsent){
        if(PhoneNumber != ""){
            await AddPhoneNumber(Username, Token, PhoneNumber)
        }
        else{
            ErrorText.innerText = "You must enter a phone number."
        }
    }
    else{
        ErrorText.innerText = "You must consent to both items listed above to continue."
    }
}

async function DeletePhoneNumberUI() {
    let Username = localStorage.getItem("Username")
    let Password = document.getElementById("PhoneDeletePassword").value

    await DeletePhoneNumber(Username, Password)
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
        console.log(errorData.error)
    }
    else{
        console.log("Good")
    }
}

Verify()