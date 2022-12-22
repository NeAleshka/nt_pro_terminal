import React from 'react';
import './App.css';
import {NavLink, Route, Routes} from "react-router-dom";
import Trading from "./components/trading/Trading";
import Archive from "./components/archive/Archive";

function App() {
    return (
        <div className="App_wrapper">
            <div className="App">
                <nav>
                    <NavLink to={'/'} className={'nav_link'} style={({isActive})=>isActive?{color:'green'}:{}}>Trading</NavLink>
                    <NavLink to={'/archive'} className={'nav_link'} style={({isActive})=>isActive?{color:'green'}:{}}>Archive</NavLink>
                </nav>
             <Routes>
                 <Route path={'/'} element={<Trading/>}/>
                 <Route path={'/archive'} element={<Archive/>}/>
             </Routes>
            </div>
        </div>

    );
}

export default App;
