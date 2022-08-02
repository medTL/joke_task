import React, { FunctionComponent } from 'react'

import {Categories} from '../Categories/Categories'
import {Jokes} from '../Jokes/Jokes'
import './Home.scss'
export  const Home: FunctionComponent = () => {
  return (
   <div className='container'>
        <Categories/>
        <Jokes/>
   </div>
  )
}
