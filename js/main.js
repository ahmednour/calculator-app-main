$(function() {
    // change body class to change theme color 
    $("input").on("change", function() {
        var theme = $("input:checked");
        if (theme.attr('id') == "theme1") {
            $("body").removeClass().addClass("theme1");
        } else if (theme.attr('id') == "theme2") {
            $("body").removeClass().addClass("theme2");
        } else if (theme.attr('id') == "theme3") {
            $("body").removeClass().addClass("theme3");
        }
    });

    // calc opreator
    const calculator = document.querySelector(".calcBody");
    const Keys = document.querySelector(".calcBodyButton");
    const display = document.querySelector(".calcScreen");

    Keys.addEventListener('click', e => {
        if (e.target.matches('a.calcButton')) {
            const key = e.target;
            const action = key.dataset.action;
            const keyContent = key.textContent;
            const displayedNum = display.textContent;
            const previousKeyType = calculator.dataset.previousKeyType;
            // calculate  function
            const calculate = (n1, operator, n2) => {
                let result = '';
                if (operator === 'add') {
                    result = parseFloat(n1) + parseFloat(n2);
                } else if (operator === 'subtract') {
                    result = parseFloat(n1) - parseFloat(n2);
                } else if (operator === 'multiply') {
                    result = parseFloat(n1) * parseFloat(n2);
                } else if (operator === 'divide') {
                    result = parseFloat(n1) / parseFloat(n2);
                }
                return result;
            };

            // not action ( number button )
            if (!action) {
                if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                    display.textContent = keyContent;
                } else {
                    display.textContent = displayedNum + keyContent;
                }
                calculator.dataset.previousKey = 'number';
                calculator.dataset.previousKeyType = 'number';

            }

            // if is decimal button
            if (action === "decimal") {
                // Do nothing if string has a dot
                if (!displayedNum.includes('.')) {
                    display.textContent = displayedNum + '.';
                } else if (previousKeyType === 'operator') {
                    display.textContent = '0.';
                }
                calculator.dataset.previousKey = 'decimal';

            }

            // Remove .is-depressed class from all keys
            Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
            // all opreator 
            if (
                action === 'add' ||
                action === 'subtract' ||
                action === 'multiply' ||
                action === 'divide'
            ) {
                const firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                const secondValue = displayedNum;
                key.classList.add('is-depressed');
                // Add custom attribute
                calculator.dataset.previousKeyType = 'operator';
                calculator.dataset.firstValue = displayedNum;
                calculator.dataset.operator = action;
                if (firstValue && operator) {
                    display.textContent = calculate(firstValue, operator, secondValue);
                }
            }
            // Calculate action 
            if (action === 'calculate') {
                const firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                const secondValue = displayedNum;

                display.textContent = calculate(firstValue, operator, secondValue);
                calculator.dataset.previousKeyType = 'calculate';

            }
            if (action === 'clear') {
                // ...
                calculator.dataset.previousKeyType = 'clear';
            }


        }
    })

});