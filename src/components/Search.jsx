import {useState} from 'react'
import { useGlobalContext } from "../context/Context";

const Search = () => {
  const {setSearchTerm, getRandomMeal} = useGlobalContext()
  const [searchValue, setSearchValue] = useState("")

  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(searchValue){
      setSearchTerm(searchValue)
    }
  }

  const handleRandomMeal = () => {
    setSearchTerm("")
    setSearchValue("")
    getRandomMeal()

  }

  return (
    <header className='search__container'>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='search favourite meal' className='form__input' value={searchValue} onChange={handleChange}/>
        <button type='submit' className='btn'>Search</button>
        <button type='button' className='btn btn-hipster' onClick={handleRandomMeal}>Suprise me!</button>
      </form>
    </header>
  )
}

export default Search