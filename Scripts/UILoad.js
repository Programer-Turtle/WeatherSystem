async function LoadNavBar()
{
    try 
    {
        document.getElementById("NavBar").innerHTML = `<a style="padding: 0; margin: 0; margin-top: 5px; margin-left: 10px; margin-right: 40px;"href="index.html"><img style="padding: 0; margin: 0;" width="80px" src="Images/Logo.PNG" alt="Logo"></a><a class="NavButton" href="Search.html">Search</a>`
        return true    
    } catch (error) {
        console.error(error)
        return false
    }
}

async function LoadFooter() {
    try
    {
        document.getElementById("footer").innerHTML = `<p style="margin-left: 10px;">All data is provided by the <a href="https://weather.gov">National Weather Service</a></p><div style="flex-basis: 100%; display:flex; align-content: center;"><a style="margin-right: 10px; margin-left: 10px;" href="https://github.com/Programer-Turtle?tab=repositories"><img src="https://github.githubassets.com/assets/pinned-octocat-093da3e6fa40.svg" alt="GitHub Logo" width="40px" height="40px"></a><a style="margin-right: 10px;" href="https://www.facebook.com/WeatherSystemMain/"><img src="https://static.xx.fbcdn.net/rsrc.php/yT/r/aGT3gskzWBf.ico" alt="Facebook Logo" width="40px" height="40px"></a></div>`
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

async function LoadUI()
{
    StatusChecks = []
    StatusChecks.push(await LoadNavBar())
    StatusChecks.push(await LoadFooter())
    if (!StatusChecks.includes(false))
    {
        console.log("No errors occured when loading UI.")
    }
    else
    {
        console.log("Errors occured when loading UI.")
    }
}

LoadUI()