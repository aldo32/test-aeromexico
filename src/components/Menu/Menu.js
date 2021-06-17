//Libraries
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//Components

//Styles
import './Menu.scss';

//Images
import { faBookmark, faUserPlus, faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons'

const Menu = ({favorites, characters, handleRemoveFavorite, handleClickSaveCharacter}) =>  {
  const [showFavorites, setShowFavorites] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [gender, setGender] = React.useState('female');
  const [type, setType] = React.useState('student');
  const [error, setError] = React.useState('');
  const [input, setInput] = React.useState({
    name: "",
    dateOfBirth: "",
    eyeColour: "",
    hairColour: "",
    image: "",
  });

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  }

  const handleShowAdd = () => {
    setModal(!modal);
  }

  const handleInput = (event) => {
    const value = event.target.value;
    setInput({
      ...input,
      [event.target.name]: value
    });
  }

  const Favorites = ({favorites}) => {
    return favorites.map((item, index) => {
      return (
        <div className="item flex-container align between" key={index}>
          <img alt="" src={item.image} className="rounded-circle" />
          <strong>{item.name}</strong>
          <FontAwesomeIcon icon={faTrashAlt} style={{cursor: "pointer"}} onClick={() => {handleRemoveFavorite(item.name)}}/>
        </div>
      );
    });
  }

  const saveCharacter = () => {
    if (input.name === "" || input.dateOfBirth === "" || input.eyeColour === "" || input.hairColour === "" || input.image === "") {
      setError("Todos los campos son obligatorios");
      return;
    } else setError('');

    let id = Math.max.apply(Math, characters.map(function(o) { return o.id; }));

    const character = {
      name: input.name,
      dateOfBirth: input.dateOfBirth,
      eyeColour: input.eyeColour,
      hairColour: input.hairColour,
      gender,
      hogwartsStudent: type === "student" ? true : false,
      hogwartsStaff: type === "staff" ? true : false,
      image: input.image,
      house: "",
      alive: true,
      id: id+1,
    }
    setInput({
      name: "",
      dateOfBirth: "",
      eyeColour: "",
      hairColour: "",
      image: "",
    });
    setGender("female");
    setType('student');
    setModal(false);
    handleClickSaveCharacter(character);
  }

  return (
    <>
      {modal &&
        <div className="modal-container flex-container justify">
          <div className="modal-content">
            <div className="row pb-3">
              <div className="flex-container align between">
                <div><h3>Agrega un personaje</h3> <label style={{color: 'red'}}>{error}</label></div>
                <FontAwesomeIcon className="pointer" icon={faTimes} onClick={handleShowAdd}/>
              </div>
              <div className="col-md-6 mt-2">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" className="form-control" name="name" placeholder="" value={input.name} onChange={handleInput} required />
              </div>
              <div className="col-md-6 mt-2">
                <label htmlFor="dateOfBirth" className="form-label">Cumpleaños</label>
                <input type="text" className="form-control" name="dateOfBirth" placeholder="" value={input.dateOfBirth} onChange={handleInput} />
              </div>
              <div className="col-md-6 mt-2">
                <label htmlFor="eyeColour" className="form-label">Color de ojos</label>
                <input type="text" className="form-control" name="eyeColour" placeholder="" value={input.eyeColour} onChange={handleInput} />
              </div>
              <div className="col-md-6 mt-2">
                <label htmlFor="hairColour" className="form-label">Color de pelo</label>
                <input type="text" className="form-control" name="hairColour" placeholder="" value={input.hairColour} onChange={handleInput} />
              </div>
              <div className="col-md-6 mt-2">
                <div htmlFor="gender" className="form-label">Genero</div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="gender" value="female" onClick={() => {setGender('female')}} onChange={() => {}} checked={gender === "female"} />
                  <label className="form-check-label" htmlFor="gender">Mujer</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="gender" value="male" onClick={() => {setGender('male')}} onChange={() => {}} checked={gender === "male"} />
                  <label className="form-check-label" htmlFor="gender">Hombre</label>
                </div>
              </div>
              <div className="col-md-6 mt-2">
                <div htmlFor="hairColor" className="form-label">Posición</div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="hogwartsStudent" value="student" onClick={() => {setType('student')}} onChange={() => {}} checked={type === "student"} />
                  <label className="form-check-label" htmlFor="hogwartsStudent">Estudiante</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="hogwartsStudent" value="staff" onClick={() => {setType('staff')}} onChange={() => {}} checked={type === "staff"} />
                  <label className="form-check-label" htmlFor="hogwartsStudent">Staff</label>
                </div>
              </div>
              <div className="col-md-6 mt-2">
                <label htmlFor="file" className="form-label">Fotografía (Url)</label>
                <input type="text" className="form-control" name="image" placeholder="Url" value={input.image} onChange={handleInput} />
              </div>
              <div className="col-md-6 mt-2 flex-container justify">
                <button onClick={saveCharacter} className="btn btn-primary mt-2">GUARDAR</button>
              </div>
            </div>
          </div>
        </div>
      }

      <div className="menu-content">
        <div className="flex-container around align menu-wrapper">
          <div className="menu-item" onClick={handleShowFavorites}><label className="mr-2">Favoritos</label><FontAwesomeIcon icon={faBookmark} /></div>
          <div className="menu-item" onClick={handleShowAdd}><label className="mr-2">Agregar</label><FontAwesomeIcon icon={faUserPlus} /></div>
        </div>
        {showFavorites &&
          <div className="info-container p-2">
            {favorites.length > 0 ?
              <Favorites favorites={favorites} />
            : <div className="m-2">No hay favoritos agregados</div>}
          </div>
        }
      </div>
    </>
  );
}

export default Menu;