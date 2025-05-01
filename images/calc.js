
() => {const btn = document.querySelectorAll('.buttons button');
    btn.forEach((button) => {
        button.addEventListener('click', () => {
            let value = btn.value || btn.innerText;
            let operators = ["+","-","x","!","/","="]
            
            if (operators.includes(value)) {
                console.log(value);
            } else {
                document.getElementById("input-feild").value += value;
            }
        });
    })};

const toField = () =>{

};