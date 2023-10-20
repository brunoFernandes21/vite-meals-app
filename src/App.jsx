import { useState } from 'react'
// components import starts
import Favorites from './components/Favorites'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Search from './components/Search'
import { useGlobalContext } from "./context/Context";

const App = () => {
const { showModal, favourites } = useGlobalContext()

  return (
    <main className="App">
      <Search/> 
      {favourites.length > 0 && <Favorites/>}
      <Meals/>
      {showModal && <Modal/>}
      
    </main>
  )
}

export default App
