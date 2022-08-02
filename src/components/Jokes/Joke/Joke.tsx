import React, {FunctionComponent, useCallback, useRef} from 'react';
import {Joke} from '../../../models/joke';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import './joke.scss';
import {detail, hasMore, loadMore} from '../../../store/joke-reducer'
interface JokeProps {
  joke: Joke;
  id?:string;

}
export const JokeCard: FunctionComponent<JokeProps> = ({joke, id}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const hasMoreData = useAppSelector(hasMore);
  const observer = useRef<IntersectionObserver | null>();
  const jokeRef = useCallback((node:HTMLDivElement) => {
   if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting)
        {
          if(hasMoreData)
          {
            dispatch(loadMore());
          }
         
        }
      })
    })
    if(node &&  node?.id === id) observer.current.observe(node);
  }, [])
  const seeStats = (id:string) => {
    navigate(`/stats/${id}`)
  }
  return (
    <div ref={jokeRef} id={id} className="joke">
      <div className="joke_header">
        <span className='joke_header_icon'></span>
      </div>
      <div className="joke_body">{joke.value}</div>
      <div className="joke_footer">
        <span onClick={() => seeStats(joke.id)} className='joke_footer_text clickibale'>
          SEE STATS
        </span>
        <span onClick={() => seeStats(joke.id)} className='joke_footer_icon clickibale'>

        </span>
      </div>
    </div>
  );
};
