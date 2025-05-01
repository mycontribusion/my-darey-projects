// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".buttons button");

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            let value = btn.value || btn.innerText;
            let operators = ["+","-","x","!","/","="]
            
            if (operators.includes(value)) {
                console.log(value);
            } else {
                document.getElementById("input-feild").value += value;
            }
        });
    });
});