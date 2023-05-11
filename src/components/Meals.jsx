import { useGlobalContext } from "../context/Context"

const Meals = () => {
  const context = useGlobalContext()
  console.log(context)
  return (
    <div>
      <h1>Meals Component</h1>
      <p>{context}</p>
    </div>
  )
}

export default Meals