import { useState } from 'react'
// components import starts
import Favorites from './components/Favorites'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Search from './components/Search'
// components import ends

const App = () => {

  return (
    <main className="App">
      <Search/> 
      {/* <Favorites/> */}
      <Meals/>
      {/* <Modal/> */}
      
    </main>
  )
}

export default App
