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
                    className={"bg-blue-900 p-10 text-red-500"}
                />
            </div>
        </div>
    );
}

export default App;
