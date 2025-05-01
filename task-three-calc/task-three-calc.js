
const btn = document.querySelectorAll('.buttons button');
    btn.forEach((button) => {
        button.addEventListener('click', () => {
            let value = button.value || button.innerText;
            let operators = ["+","-","*","/"];
            
            if (value == 'C') {
                document.getElementById("input-feild").value = '';
            } else if (operators.includes(value)) {
                let content = document.getElementById("input-feild").value;
                lengthofcontent = content.length;
                let laststring = content[lengthofcontent-1];

                if (document.getElementById("input-feild").value =='') {
                    document.getElementById("input-feild").value ==''
                } else if (operators.includes(laststring)){
                } else {
                document.getElementById("input-feild").value += value;
            }} else if (value == '='){
                let content = document.getElementById("input-feild").value;
                lengthofcontent = content.length;
                let laststring = content[lengthofcontent-1];

                if (operators.includes(laststring)){
                    content = content.slice(0, content.length - 1);
                    console.log(content);
                    document.getElementById("input-feild").value = new Function('return ' + content)();
                } else {
                    if (document.getElementById("input-feild").value =='') {
                    } else {
                        document.getElementById("input-feild").value = new Function('return ' + document.getElementById("input-feild").value)();
                    }
                }
                
            } else {
                document.getElementById("input-feild").value += value;
            }
        });
    });

