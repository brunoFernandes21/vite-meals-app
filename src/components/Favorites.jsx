import React from "react";
import { useGlobalContext } from "../context/Context";

const Favorites = () => {
  const { removeFromFavourites, selectMeal, favourites } = useGlobalContext();

  return (
    <section className="favourites">
      <div className="favourites__content">
        <h5>Favourites</h5>
        <div className="favourites__container">
          {favourites.map((meal) => {
            const { idMeal, strMealThumb: image } = meal;
            return (
              <div key={idMeal} className="favourite__meal">
                <img src={image} alt="" className="favourites__img img" onClick={() => selectMeal(idMeal, true)} />
                <button
                  className="remove__btn"
                  onClick={() => removeFromFavourites(idMeal)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
