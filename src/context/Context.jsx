import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)

  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios.get(url);
      if(data.meals) {
        setMeals(data.meals)
      } else {
        setMeals([])
      }
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false)
  };

  const getRandomMeal = () => {
    fetchMeals(randomMealUrl)
  }

  const selectMeal = (idMeal, favouriteMeal) => {
    let meal;
    meal = meals.find((meal) => meal.idMeal === idMeal)
    setSelectedMeal(meal)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  useEffect(() => {
    if(searchTerm === "") return
    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider value={{ meals, loading, setSearchTerm, getRandomMeal, showModal, selectedMeal, selectMeal, closeModal}}>
      {children}
    </AppContext.Provider>
  );
};
//custom hook to make it easier to use context in other components
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
