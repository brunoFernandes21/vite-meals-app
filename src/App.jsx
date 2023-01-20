import { useState } from 'react'
import Favorites from './components/Favorites'
import Meals from './components/Meals'
import Modal from './components/Modal'
 import Search from './components/Search'
const App = () => {

  return (
    <main className="App">
      <h1>Meals App</h1>
      <Favorites/>
      <Meals/>
      <Modal/>
      <Search/>
    </main>
  )
}

export default App
