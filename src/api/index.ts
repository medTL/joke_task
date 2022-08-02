import axios, {AxiosResponse} from 'axios';
import {ServerResponse} from '../models/serverResponse';
import {fetchCategories, fetchJokes, loading} from '../store/joke-reducer';
import {AppDispatch} from '../store/store';

const baseUrl = 'https://api.chucknorris.io/';
const api = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export function getJokes() {
  return async (dispatch: AppDispatch) => {
    dispatch(loading())
    api
      .get('/jokes/search?query=all')
      .then((response: AxiosResponse<ServerResponse>) => {
        dispatch(fetchJokes(response.data));
      })
      .catch((er) => {
        console.log(er);
      });
  };
}

export function getCategories() {
  return async (dispatch: AppDispatch) => {
    api
      .get('/jokes/categories')
      .then((response: AxiosResponse<string[]>) => {
        dispatch(fetchCategories(response.data));
      })
      .catch((er) => {
        console.log(er);
      });
  };
}
