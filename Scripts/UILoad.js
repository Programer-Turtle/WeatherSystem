async function LoadNavBar()
{
    try 
    {
        document.getElementById("NavBar").innerHTML = `<a style="padding: 0; margin: 0; margin-top: 5px; margin-left: 10px; margin-right: 40px;"href="index.html"><img style="padding: 0; margin: 0;" width="80px" src="Images/Logo.PNG" alt="Logo"></a><a></a>`
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