import style from "./Grid.module.css"
import { useState } from "react"



function Grid() {
    const [values, setValues] = useState<string[][]> (Array.from({length: 4}, () => Array(4).fill("")));


    function handleChange(row:number, col: number, event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.value
        const newValues = values.map((r, rIndex) => (
            r.map((val, cIndex) =>
                rIndex === row && cIndex === col ? newValue : val
            )
        ))
        setValues(newValues)
    }

    return(
        <div>
            <h1 className={style.header}>Boggle Solver</h1>
            
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
                <button>Solve</button>
                <button>Clear</button>
                <button>Randomize</button>
            </span>
        </div>
    )
}
export default Grid