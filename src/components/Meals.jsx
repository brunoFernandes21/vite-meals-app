import { useGlobalContext } from "../context/Context";
import {BsHandThumbsUp} from 'react-icons/bs'

const Meals = () => {
  const { meals, loading, selectMeal } = useGlobalContext();

  if(loading) {
    return <section className="section"><h4>Loading...</h4></section>
  }

  if(meals.length === 0) {
    return <section className="section">
      <h4 className="text-center">Sorry! No meals match your search term. Please try again!</h4></section>
  }

  return (
    <section className="section-center">
      { meals.map((singleMeal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
        return <article key={idMeal} className="single-meal ">
          <img src={image} alt={title} className="img" onClick={() => selectMeal(idMeal)}/>
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
