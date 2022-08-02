import React, {FunctionComponent} from 'react';
import { useAppSelector} from '../../store/hooks';
import { filterBody, jokesList } from '../../store/joke-reducer';
import {JokeCard} from './Joke/Joke';
import './Jokes.scss';
export const  Jokes: FunctionComponent =() => {
  const jokes = useAppSelector(jokesList); 
  const filter = useAppSelector(filterBody);
  return (
    <div className="jokes">
     {filter.category !== '' ? <li className='jokes_category'>{filter.category.toUpperCase()}</li> : <li className='jokes_category'>ALL CATEGORIES</li>}
      {jokes.map((joke, index) => {
        if (jokes.length === index + 1) {
          return <JokeCard  id='last-joke' key={joke.id} joke={joke} />;
        } else {
          return <JokeCard key={joke.id} joke={joke} />;
        }
      })}
    </div>
  );
}
