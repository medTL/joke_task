import React, {FunctionComponent, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {
  detail,
  filterBody,
  JokeIndex,
  like,
  next_joke,
  prev_joke,
  selectedJoke,
  totalJokes,
} from '../../../store/joke-reducer';
import './Joke-stats.scss';
export const  JokeStats: FunctionComponent = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const total = useAppSelector(totalJokes);
  const index = useAppSelector(JokeIndex);
  const [flip, setFlip] = useState(false);
  let joke = useAppSelector(selectedJoke);
  const naviagete = useNavigate();
  useEffect(() => {
    document.getElementById("root")?.scroll(0,0)
    if (id && total > 0) {
      dispatch(detail(id));
    } else {
      naviagete('/');
    }
  }, [dispatch, id]);
  const resetFlip  = () => {
    setTimeout(() => {
      setFlip(false);
    },1000)
  }
  const filter = useAppSelector(filterBody);
  console.log(filter.category);

  const handleLike = () => {
    joke = {
      ...joke,
      likes: joke.likes ? joke.likes + 1 : 1,
    };
    dispatch(like(joke));
  };


  const handleDislike = () => {
    joke = {
      ...joke,
      dislikes: joke.dislikes ? joke.dislikes + 1 : 1,
    };
    dispatch(like(joke));
  };

  const nextJoke = (id: string) => {
    dispatch(next_joke(id));
    setFlip(true);
    resetFlip()
  };

  const prevJoke = (id: string) => {
    dispatch(prev_joke(id));
    setFlip(true);
    resetFlip()
  };

  const goHome = () => {
    naviagete('/');
  };

  return (
    <div 
    className="joke-stats">
      
      <div className="joke-stats_header">
        <button
          onClick={() => goHome()}
          className="joke-stats_header_back-button clickibale"
        ></button>
      </div>

      <div className="joke-stats_content">
        <div className="joke-stats_content_joke">
          <div className={flip ?"joke-stats_content_joke_card flip_card" :  "joke-stats_content_joke_card "}>
            <div className="joke-stats_content_joke_card_header">
              {filter.category !== '' ? (
                <li className="joke-stats_content_joke_card_header_category">
                  {filter.category}
                </li>
              ) : (
                <li className="joke-stats_content_joke_card_header_category">
                  ALL CATEGORY
                </li>
              )}
              <li className="joke-stats_content_joke_card_header_rank">
                TRENDING
              </li>
            </div>

            <div className="joke-stats_content_joke_card_body">
              <h3 className="joke-stats_content_joke_card_body_title">
                UNTILTLED
              </h3>
              <p className="joke-stats_content_joke_card_body_text">
                {joke.value}
              </p>
            </div>
          </div>

          <div className="joke-stats_content_joke_footer">
            <div className="joke-stats_content_joke_footer_stats">
              <div className="joke-like">
                <span
                  onClick={() => handleLike()}
                  className="like_icon clickibale"
                ></span>
                <span className="like_number">
                  {joke.likes ? joke.likes : 0}
                </span>
              </div>
              <div className="joke-like">
                <span
                  onClick={() => handleDislike()}
                  className="dislike_icon clickibale"
                ></span>
                <span className="dislike_number">
                  {joke.dislikes ? joke.dislikes : 0}
                </span>
              </div>
            </div>

            <div className="joke-stats_content_joke_footer_navigation">
              {index > 0 && (
                <button
                disabled={flip}
                  onClick={() => prevJoke(joke.id)}
                  className="navigation_button prev clickibale"
                >
                  PREV JOKE
                </button>
              )}
              {index <= total && (
                <button
                disabled={flip}
                  onClick={() => nextJoke(joke.id)}
                  className="navigation_button next clickibale"
                >
                  NEXT JOKE
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="joke-stats_content_top-jokes">
          <h4 className="joke-stats_content_top-jokes_title">
            THE TOP 10 JOKES THIS WEEK{' '}
          </h4>
          <ul className="joke-stats_content_top-jokes_list">
            <li className="joke-stats_content_top-jokes_list_item">
              Smoking Joke
            </li>
            <li className="joke-stats_content_top-jokes_list_item">
              My Boss Joke
            </li>
            <li className="joke-stats_content_top-jokes_list_item">
              Dirty Millionaire Joke
            </li>
            <li className="joke-stats_content_top-jokes_list_item">
              The annoying neighbour
            </li>
            <li className="joke-stats_content_top-jokes_list_item">
              Knock Knock
            </li>
            <li className="joke-stats_content_top-jokes_list_item">
              Why tyson mips
            </li>
            <li className="joke-stats_content_top-jokes_list_item">
              The drunk Police officer
            </li>
            <li className="joke-stats_content_top-jokes_list_item">
              My hip dad (Dad joke)
            </li>
            <li className="joke-stats_content_top-jokes_list_item">
              What not to say in an elevator
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
