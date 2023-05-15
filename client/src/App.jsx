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
import Navigation from "./components/navigation/Navigation.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import PageSelector from "./components/pageSelector/PageSelector.jsx";

function App() {

    return (
        <div className={"App"}>
            <Header/>
            <Navigation/>
            <main>
                <Routes>
                    <Route path={"/"} element={<GameSessions/>}></Route>
                    <Route path={"/profile"} element={<Profile/>}></Route>
                    <Route path={"/register"} element={<Registration/>}></Route>
                    <Route path={"/login"} element={<Login/>}> </Route>
                    <Route path="/page/:pageNumber" />
                </Routes>
            </main>
            <PageSelector totalPages={10}/>
            <Footer/>
            <ToastContainer/>
        </div>
    )
}



export default App
