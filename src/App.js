import {useEffect, useState} from "react";
import Cards from "./components/Cards";
import CardDetail from "./components/CardDetail";
import "./App.css";

// Code by Gwanju Chung and Hala Shihab

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  useEffect(() => {
    console.log(selectedCharacter)
  }, [selectedCharacter])

  const fetchCharacters = async (page) => {
    let response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    let data = await response.json();
    setCharacters(data.results);
  };

  const fetchCharacterDetails = (characterName) => {
    const character = characters.find(c => c.name === characterName);
    setSelectedCharacter(character)
  };

  const handleBack = () => {
    if(page > 1){
      setPage((prevPage) => prevPage - 1);
      setSelectedCharacter(null);
    };
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
    setSelectedCharacter(null);
  };

  return (
    <div className="App">
      <h1>Star Wars Characters</h1>
      <div className="main-container ">
        <div className>
          <Cards characters={characters} onCharacterClick={fetchCharacterDetails} />
          <div>
            <button onClick={handleBack} disabled={page === 1}>Back</button>
            <button onClick={handleNext} disabled={page === 9}>Next</button>
          </div>
        </div>
        {selectedCharacter && <CardDetail character={selectedCharacter}/>}
      </div>
    </div>
  );
}

export default App;
