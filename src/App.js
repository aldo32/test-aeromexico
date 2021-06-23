//Libraries
import React from 'react';

//Components
import Menu from './components/Menu/Menu';
import Characters from './components/Characters/Characters';
import { setCharacters, setCharactersFilter, addFavorite, removeFavorite, setFavorites } from './redux/characterSlice';
import { useSelector, useDispatch } from 'react-redux';

//Styles
import './App.scss';

//Images
import logo from './assets/logo.png';

const App = () => {
  var apiUrl;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.log("Development Mode");
    apiUrl = "http://localhost:3004/";
  } else {
    apiUrl = "http://aldocontent.ml:3004/";
    console.log("Production Mode");
  }
  const state = useSelector(state => state.character);
  const dispatch = useDispatch();

  React.useEffect(() => {
    //get character
    fetch(apiUrl+'characters')
      .then(response => response.json())
      .then(data => {
        //add id to characer
        let i = 1;
        data.map(item => {
          item.id = i;
          i++;
          return true;
        });

        dispatch(setCharacters(data));
        dispatch(setCharactersFilter(data));
      });

    //get favorites
    fetch(apiUrl+'favorites')
      .then(response => response.json())
      .then(data => {
        dispatch(setFavorites(data));
      });
  }, [dispatch, apiUrl]);

  const handleClickStudents = (isStudent) => {
    if (isStudent !== null) {
      var students = state.characters.filter(item => item.hogwartsStudent === isStudent);
      dispatch(setCharactersFilter(students));
    } else {
      dispatch(setCharactersFilter(state.characters));
    }
  }

  const addToFavorites = (name) => {
    const character = state.characters.find(item => item.name === name);
    if (character) {
      let find = state.favorites.find(item => item.name === character.name);
      if (find === undefined) {
        postFavorite(character).then(response => {});
        dispatch(addFavorite(character));
      } else {
        deleteFavorite(character.name);
        dispatch(removeFavorite(character.name));
      }
    }
  }

  const postFavorite = async(character) => {
    const response = await fetch(apiUrl+'favorites', {
      method: 'post',
      body: JSON.stringify(character),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }

  const postCharacter = async(character) => {
    const response = await fetch(apiUrl+'characters', {
      method: 'post',
      body: JSON.stringify(character),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }

  const deleteFavorite = (name) => {
    const item = state.favorites.find(item => item.name === name);
    if (item !== undefined) {
      fetch(apiUrl+'favorites/'+item.id, {
        method: 'delete'
      });
    }
  }

  const handleClickSaveCharacter = (character) => {
    postCharacter(character).then(response => {});
    let tmpCharacters = state.characters;
    tmpCharacters = [...tmpCharacters, character];
    dispatch(setCharacters(tmpCharacters));
    dispatch(setCharactersFilter(tmpCharacters));
  }

  return (
    <>
      <Menu favorites={state.favorites} characters={state.characters} handleRemoveFavorite={addToFavorites} handleClickSaveCharacter={handleClickSaveCharacter} />
      <div className="container">
        <div className="row text-center mt-5">
          <div className="col-md-12 text-center">
            <img alt="" src={logo} className="logo" />
          </div>
          <div className="col-md-12 mt-3">
            <h3 className="fw-bold">Seleciona tu filtro</h3>
          </div>
        </div>
        <div className="row">
          <div className="mb-2 col-12 col-md-4 flex-container justify">
            <button className="btn btn-primary" onClick={() => handleClickStudents(true)}>Estudiantes</button>
          </div>
          <div className="mb-2 col-12 col-md-4 flex-container justify">
            <button className="btn btn-primary" onClick={() => handleClickStudents(false)}>Staff</button>
          </div>
          <div className="col-12 col-md-4 flex-container justify">
            <button className="btn btn-primary" onClick={() => handleClickStudents(null)}>Todos</button>
          </div>
        </div>
        <div className="row mt-5">
          <Characters data={state.charactersFilter} addToFavorites={addToFavorites} favorites={state.favorites} />
        </div>
      </div>
    </>
  );
}

export default App;
