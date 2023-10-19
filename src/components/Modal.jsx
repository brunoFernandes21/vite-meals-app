import { useGlobalContext } from "../context/Context";

const Modal = () => {
  const { closeModal, selectedMeal } = useGlobalContext();
  const {
    strMeal: title,
    strMealThumb: image,
    strInstructions: content,
    strSource: source,
  } = selectedMeal;
  return (
    <aside className="modal__overlay">
      <div className="modal__container">
        <img src={image} alt={title} className="img modal__img" />
        <div className="modal__content">
          <h4>{title}</h4>
          <p>Cooking Instructions</p>
          <p>{content}</p>
          <a href={source} target="_blank">Original Source</a>
          <button className="btn btn-hipster close__btn" onClick={closeModal}>Close</button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
