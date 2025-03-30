import React, { useState } from 'react';

const StringCalculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    const add = (numbers) => {
        if (numbers === "") return 0;

        let delimiter = ",";
        let numString = numbers;

        if (numString.startsWith("//")) {
            const delimiterEndIndex = numString.indexOf("\n");
            delimiter = numString.substring(2, delimiterEndIndex);
            numString = numString.substring(delimiterEndIndex + 1);
        }

        const regex = new RegExp(`[${delimiter}\n]`);
        const numArray = numString.split(regex);

        const negativeNumbers = numArray.filter(num => {
            const number = parseInt(num, 10);
            return number < 0;
        });

        if (negativeNumbers.length > 0) {
            throw new Error("negative numbers not allowed: " + negativeNumbers.join(", "));
        }

        return numArray.reduce((acc, num) => acc + parseInt(num, 10), 0);
    };

    const handleCalculate = () => {
        try {
            const calculatedResult = add(input);
            setResult("Result: " + calculatedResult);
        } catch (error) {
            setResult(error.message);
        }
    };

    return (
        <div className="calculator">
            <h1>String Calculator</h1>
            <textarea
                value={input}
                style={{width:"200px", height:"100px"}}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter numbers here..."
            />
            <div><button onClick={handleCalculate}>Calculate</button></div>
            <div className="result">{result}</div>
        </div>
    );
};

export default StringCalculator;