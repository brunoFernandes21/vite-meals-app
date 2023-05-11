import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const AppContext = createContext();

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'
const testing = 'https://randomuser.me/api/'
const AppProvider = ({ children }) => {

  const fetchMeals = async (url) => {
    try {
      const { data } = await axios(url);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMeals(testing)
  }, []);

  return (
    <AppContext.Provider value={"Bruno Web Developer"}>
      {children}
    </AppContext.Provider>
  );
};
//custom hook to make it easier to use context in other components
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
