import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FilmList from './components/FilmList';
import AddFilmTab from './components/AddFilmTab';
import './styles.css';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Film Shelf</h1>
                <nav className="navbar">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/add" className="nav-link">Add Film</Link>
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
