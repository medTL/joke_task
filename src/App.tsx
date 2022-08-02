import React, {useEffect} from 'react';
import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Header} from './components/header/Header';
import {Home} from './components/Home/Home';
import {JokeStats} from './components/Jokes/Joke-stats/Joke-Stats';
import {useAppDispatch, useAppSelector} from './store/hooks';
import {getCategories, getJokes} from './api';
import { appLoading } from './store/joke-reducer';
import {Loader} from './components/Loader/Loader';
import { Footer } from './components/footer/Footer';

function App() {
  const loading  = useAppSelector(appLoading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.getElementById("root")?.scroll(0,0)
    dispatch(getJokes());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        {!loading ? <div>
          <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route caseSensitive path="/stats/:id" element={<JokeStats />} />
        </Routes>
        <Footer/>
        </div> : <Loader/> }
      </div>
    </BrowserRouter>
  );
}

export default App;
