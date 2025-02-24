let numberInput = document.getElementById("PhoneNumber")

function CheckNumberFormat(event){
    if (event.inputType === "deleteContentBackward") {
        return;
    }

    NumberValue = numberInput.value
    NumberLength = numberInput.value.length
    if(NumberLength == 3){
        numberInput.value = `(${NumberValue})-`
    }
    else if(NumberLength == 9){
        numberInput.value = `${NumberValue}-`
    }
}

numberInput.addEventListener("input", CheckNumberFormat)