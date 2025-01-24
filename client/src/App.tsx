import React from "react";
import "./App.css";
import style from "./style.module.css";

function App() {
    return (
        <div className="App">
            <div>
                <input
                    type="text"
                    placeholder="Search"
                    className={style.input}
                />
            </div>
        </div>
    );
}

export default App;
