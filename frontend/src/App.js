import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FilmList from './components/FilmList';
import AddFilmTab from './components/AddFilmTab';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Film Shelf</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/add">Add Film</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<FilmList />} />
                    <Route path="/add" element={<AddFilmTab />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
