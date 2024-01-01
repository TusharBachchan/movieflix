import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Movies from './components/Movies/Movies';

function App() {
const [selectedGenre, setSelectedGenre] = useState("All");
  return (
    <>
      <Header setSelectedGenre={setSelectedGenre} />
      <Movies selectedGenre={selectedGenre} />
    </>
  );
}

export default App
