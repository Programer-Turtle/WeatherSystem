function ShowPopUp(PopUpID, DisplayType)
{
    document.getElementById(PopUpID).style.display = DisplayType;
}

function HidePopUp(PopUpID)
{
    document.getElementById(PopUpID).style.display = "none";
}

function ChangeInnerText(TextID, Text)
{
    document.getElementById(TextID).innerText = Text;
}

function ChangeInnerHTML(PopUpID, HTML)
{
    document.getElementById(PopUpID).innerHTML = HTML
}

function ChangeBackgroundColor(PopUpID, Color)
{
    document.getElementById(PopUpID).style.backgroundColor = Color
}

function ChangeTextFont(PopUpID, Font)
{
    document.getElementById(PopUpID).style.fontFamily = Font
}

function ChangeStyle(PopUpID, StyleData)
{
    document.getElementById(PopUpID).style = StyleData
}
