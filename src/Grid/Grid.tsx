import style from "./Grid.module.css"
import { useState } from "react"
import { solve } from "./trie";



function Grid() {
    const [values, setValues] = useState<string[][]> (Array.from({length: 4}, () => Array(4).fill("")));
    const [answers, setAnswers] = useState<string[]> ([""]);

    function handleChange(row:number, col: number, event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.value
        const newValues = values.map((r, rIndex) => (
            r.map((val, cIndex) =>
                rIndex === row && cIndex === col ? newValue : val
            )
        ))
        setValues(newValues)
    }

    function Solve() {
        const answer = solve(values);
        setAnswers(answer);
    }

    function Clear(){
        const clearedArray = Array.from({length: 4}, () => Array(4).fill(""));
        setValues(clearedArray);
        setAnswers([]);
    }

    return(
        <div>
            <h1 className={style.header}>Boggle Solver</h1>
            <div className={style.app}>
                <div>
                    <div className={style.grid}>
                        {values.map((row,rowIndex) =>
                            row.map((value, colIndex) =>(
                                <input
                                    key={`${rowIndex}-${colIndex}`}
                                    type="text"
                                    value={value}
                                    onChange={(event) => handleChange(rowIndex, colIndex, event)}
                                />
                            ))
                        )}
                    </div>
                    <span>
                        <button onClick={() => Solve()}>Solve</button>
                        <button onClick={() => Clear()}>Clear</button>
                    </span>
                </div>
                <div className={style.answers}>{answers.map((val, idx) => <p key={idx}>{val}</p>)}</div>
            </div>
        </div>
    )
}
export default Grid