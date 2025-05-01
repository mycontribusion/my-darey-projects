
const inputField = document.getElementById("input-feild");
const btn = document.querySelectorAll('.buttons button');
btn.forEach((button) => {
    button.addEventListener('click', () => {
        let value = button.value || button.innerText;
        let operators = ["+","-","*","/"];
        
        if (value === 'C') {
            inputField.value = '';
        } else if (operators.includes(value)) {
            let content = inputField.value;
            let lengthofcontent = content.length;
            let laststring = content[lengthofcontent-1];

            if (inputField.value =='') {
                inputField.value =''
            } else if (operators.includes(laststring)){
            } else {
            inputField.value += value;
        }} else if (value === '='){
            let content = inputField.value;
            let lengthofcontent = content.length;
            let laststring = content[lengthofcontent-1];

            if (operators.includes(laststring)){
                content = content.slice(0, content.length - 1);
                console.log(content);
                inputField.value = new Function('return ' + content)();
            } else {
                if (inputField.value ==='') {
                } else {
                    inputField.value = new Function('return ' + document.getElementById("input-feild").value)();
                }
            }
            
        } else {
            inputField.value += value;
        }
    });
});

