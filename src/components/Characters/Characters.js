//Libraries
import React from 'react';

//Componentes

//Styles
import './Characters.scss';

//Images
import rectangle from '../../assets/rectangle.png';
import rectangleO from '../../assets/rectangle-o.png';

const Characters = ({data, addToFavorites, favorites}) => {

  const ListCharacters = ({listCharacters}) => {
    return listCharacters.map((item, index) => {
      let isFavorite = favorites.find(itemFavorite => itemFavorite.name === item.name);

      return (
        <div className="col-6 mb-4" key={index}>
          <div className="character-wrapper">
            <div className={`picture ${item.house.toLowerCase()}`}>
              <img alt="" src={item.image} className="rounded-circle" />
            </div>
            <div className={`description ${item.alive === true ? '' : 'dead'}`}>
              <div className="flex-container column title-content">
                <div className="flex-container between align">
                  <div className="gray text-uppercase status">{item.alive ? 'vivo' : 'muerto'} / {item.hogwartsStudent ? 'estudiante' : 'staff'}</div>
                  <img alt="" src={isFavorite === undefined ? rectangle : rectangleO} className="pointer" onClick={() => addToFavorites(item.name)}/>
                </div>
                <div className="mt-3 mb-3">
                  <h2>{item.name}</h2>
                </div>
              </div>

              <div className="info-content">
                <div className="mb-2"><strong>Cumpleaños: </strong>{item.dateOfBirth}</div>
                <div className="mb-2"><strong>Genero: </strong>{item.gender}</div>
                <div className="mb-2"><strong>Color de ojos: </strong>{item.eyeColour}</div>
                <div className="mb-2"><strong>Color de pelo: </strong>{item.hairColour}</div>
              </div>
            </div>
          </div>
        </div>
      );
    })
  }

  return (
    <ListCharacters listCharacters={data} />
  );
}

export default Characters;