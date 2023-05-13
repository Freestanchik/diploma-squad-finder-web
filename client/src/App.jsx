import './App.scss'
import Footer from "./components/footer/Footer.jsx";
import Header from "./components/header/Header.jsx";
import {Routes, Route} from "react-router-dom";
import Registration from "./pages/registration/Registration.jsx";
import GameSessions from "./pages/gameSessions/gameSessions.jsx";
import React from "react";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from "./pages/login/Login.jsx";

function App() {

    return (
        <div className={"App"}>
            <Header/>
            <main>
                <Routes>
                    <Route path={"/"} element={<GameSessions/>}></Route>
                    <Route path={"/register"} element={<Registration/>}></Route>
                    <Route path={"/login"} element={<Login/>}> </Route>
                </Routes>
            </main>
            <Footer/>
            <ToastContainer/>
        </div>
    )
}



export default App
