async function AdjustNavText() {
  let BodySize = document.body.clientWidth;
  let FontSize = null;
  if (BodySize <= 445) {
    FontSize = "20px";
  } else if (BodySize <= 500) {
    FontSize = "25px";
  } else {
    FontSize = "30px";
  }
  document.querySelectorAll("a.NavButton").forEach((Text) => {
    console.log(Text);
    Text.style.fontSize = FontSize;
  });
}

async function LoadNavBar() {
  try {
    document.getElementById(
      "NavBar"
    ).innerHTML = `<a style="padding: 0; margin: 0; margin-top: 5px; margin-left: 10px; margin-right: 40px;"href="index.html"><img style="padding: 0; margin: 0;" width="80px" src="Images/Logo.PNG" alt="Logo"></a><a class="NavButton" href="Search.html">Search</a><a style="margin-left:auto; margin-right:20px;" id="SigninButton" class="NavButton" href="signin.html">Sign In</a><a style="margin-right:20px;" id="SignupButton" class="NavButton" href="signup.html">Sign Up</a><a style="margin-left:auto; margin-right:20px; display: none;" id="AccountButton" class="NavButton" href="account.html">Account</a><a style="margin-right:20px; display: none;" id="ServiceButton" class="NavButton" href="services.html">Services</a>`;
    await AdjustNavText();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function LoadFooter() {
  try {
    document.getElementById(
      "footer"
    ).innerHTML = `<p style="margin-left: 10px; margin-bottom: 0; width:100vw;">All data is provided by the <a href="https://weather.gov">National Weather Service</a></p><p style="margin-left:10px; margin-top:5px; width:100vw;" xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Programer-Turtle/WeatherSystem">Weather System</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/Programer-Turtle">Karson Ulerick</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" alt=""></a></p><div style="flex-basis: 100%; display:flex; align-content: center;"><a style="margin-right: 10px; margin-left: 10px;" href="https://github.com/Programer-Turtle?tab=repositories"><img src="https://github.githubassets.com/assets/pinned-octocat-093da3e6fa40.svg" alt="GitHub Logo" width="40px" height="40px"></a><a style="margin-right: 10px;" href="https://www.facebook.com/WeatherSystemMain/"><img src="https://static.xx.fbcdn.net/rsrc.php/yT/r/aGT3gskzWBf.ico" alt="Facebook Logo" width="40px" height="40px"></a></div>`;
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function LoadUI() {
  StatusChecks = [];
  StatusChecks.push(await LoadNavBar());
  StatusChecks.push(await LoadFooter());
  if (!StatusChecks.includes(false)) {
    console.log("No errors occured when loading UI.");
  } else {
    console.log("Errors occured when loading UI.");
  }
}

LoadUI();

window.addEventListener("resize", async () => await AdjustNavText());
