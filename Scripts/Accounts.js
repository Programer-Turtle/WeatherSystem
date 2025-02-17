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
    Username = Username.toLowerCase()

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