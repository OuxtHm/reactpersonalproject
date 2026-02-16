import React, {Fragment} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Header from "./components/layout/Header"
import Home from "./components/layout/Home"
import Footer from "./components/layout/Footer";
import CoffeeList from "./components/coffee/CoffeeList";
import CoffeeDetail from "./components/coffee/CoffeeDetail";
import BoardList from "./components/board/BoardList";
import BoardInsert from "./components/board/BoardInsert";
import BoardUpdate from "./components/board/BoardUpdate";
import BoardDelete from "./components/board/BoardDelete";
import BoardDetail from "./components/board/BoardDetail";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/menu/list" element={<CoffeeList/>}/>
                <Route path="/menu/detail/:id" element={<CoffeeDetail/>}/>
                <Route path="/board/list" element={<BoardList/>}/>
                <Route path="/board/insert" element={<BoardInsert/>}/>
                <Route path="/board/update/:no" element={<BoardUpdate/>}/>
                <Route path="/board/delete/:no" element={<BoardDelete/>}/>
                <Route path="/board/detail/:no" element={<BoardDetail/>}/>
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;
