import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const getFavouritesFromLocalStorage = () => {
  let favourites = localStorage.getItem("favourites");
  if (favourites) {
    favourites = JSON.parse(localStorage.getItem("favourites"));
  } else {
    favourites = [];
  }
  return favourites;
};

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favourites, setFavourites] = useState(getFavouritesFromLocalStorage());

  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  };

  const getRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  const selectMeal = (idMeal, favouriteMeal) => {
    let meal;
    if (favouriteMeal) {
      meal = favourites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addToFavourites = (idMeal) => {
    //find a meal with passed id in the favourites array
    const alreadyInFavourites = favourites.find(
      (favourite) => favourite.idMeal === idMeal
    );
    //if meal is already in favourites then return out of the function
    if (alreadyInFavourites) return;
    // if not, then...
    //find a meal in the meals array with passed id and store result in meal var
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    //if this meal is not in favourite then add it to favourites
    const updatedFavourites = [...favourites, meal];
    //updated favourites array by addin new meal
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  const removeFromFavourites = (idMeal) => {
    const updatedFavourites = favourites.filter(
      (meal) => meal.idMeal !== idMeal
    );
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  useEffect(() => {
    if (searchTerm === "") return;
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        meals,
        loading,
        setSearchTerm,
        getRandomMeal,
        showModal,
        selectedMeal,
        selectMeal,
        closeModal,
        favourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
//custom hook to make it easier to use context in other components
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
