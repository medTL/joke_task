import React, {FunctionComponent} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {filterBody} from '../../store/joke-reducer';
import {filter as filterAction} from '../../store/joke-reducer';
import './Header.scss';
export const  Header: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  let filter = useAppSelector(filterBody);
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const handleChange = (value: string) => {
    filter = {
      ...filter,
      query: value,
    };
    dispatch(filterAction(filter));
    if(pathname !== '/')
    {
      navigate('/');
    }
  };
  return (
    <div className="header">
      <h1 className="header_app-title">The Joke Bible</h1>
      <h3 className="header_app-description">Daily Laughs for you and yours</h3>

      <input
        className="header_search-input"
        onChange={(e) => handleChange(e.target.value)}
        placeholder="How can we make you laugh today?"
      ></input>
    </div>
  );
}
