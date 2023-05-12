import { useGlobalContext } from "../context/Context";
import {BsHandThumbsUp} from 'react-icons/bs'

const Meals = () => {
  const { meals, loading } = useGlobalContext();

  if(loading) {
    return <section className="section"><h2>Loading...</h2></section>
  }

  if(meals.length < 1) {
    return <section className="section">
      <h2>Sorry! No meals match your search term. Please try again!</h2></section>
  }

  return (
    <section className="section-center">
      { meals.map((singleMeal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
        return <article key={idMeal} className="single-meal ">
          <img src={image} alt="" className="img"/>
          <footer>
            <h5>{title}</h5>
            <button className="like-btn"><BsHandThumbsUp/></button>
          </footer>
        </article>
      })}
    </section>
  );
};

export default Meals;
