import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);

  const fetchMeals = async (url) => {
    try {
      const { data } = await axios.get(url);
      setMeals(data.meals)
      console.log(data.meals)
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  return (
    <AppContext.Provider value={{ meals }}>
      {children}
    </AppContext.Provider>
  );
};
//custom hook to make it easier to use context in other components
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
