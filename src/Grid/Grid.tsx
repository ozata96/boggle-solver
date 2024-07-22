import style from "./Grid.module.css"
import { useState } from "react"
import { solve } from "./trie";



function Grid() {
    const [values, setValues] = useState<string[][]> (Array.from({length: 4}, () => Array(4).fill("")));
    const [answers, setAnswers] = useState<string[]> ([""]);

    function handleChange(row:number, col: number, event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.value.toUpperCase();
        const isValid = newValue.length === 0 || (newValue.length === 1 && (newValue >= 'A' && newValue <= 'Z'));
        const newValues = values.map((r, rIndex) => (
            r.map((val, cIndex) =>
                rIndex === row && cIndex === col ? (isValid ? newValue : val) : val
            )
        ))
        setValues(newValues)
    }

    function Solve() {
        const candidates = values.map(row => row.map(cell => cell.toLowerCase()));
        const answer = solve(candidates);
        setAnswers(answer);
    }

    function Clear(){
        const clearedArray = Array.from({length: 4}, () => Array(4).fill(""));
        setValues(clearedArray);
        setAnswers([]);
    }

    function GetRandomLetter(): string {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    function Randomize(){
        const randomizedArray = Array.from({length: 4}, () => Array.from({length: 4}, () => GetRandomLetter()));
        setValues(randomizedArray);
    }

    return(
        <div>
            <h1 className={style.header}>Boggle Solver</h1>
            <div className={style.app}>
                <div className={style.boggle}>
                    <div className={style.grid}>
                        {values.map((row,rowIndex) =>
                            row.map((value, colIndex) =>(
                                <input
                                    key={`${rowIndex}-${colIndex}`}
                                    type="text"
                                    value={value}
                                    onChange={(event) => handleChange(rowIndex, colIndex, event)}
                                    maxLength={1}
                                />
                            ))
                        )}
                    </div>
                    <span className={style.buttons}>
                        <button onClick={() => Solve()}>Solve</button>
                        <button onClick={() => Clear()}>Clear</button>
                        <button onClick={() => Randomize()}>Randomize</button>
                    </span>
                </div>
                <div className={style.answers}>{answers.map((val, idx) => <p className={style.words} key={idx}>{val}</p>)}</div>
            </div>
        </div>
    )
}
export default Grid