import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';
import {stat} from 'fs';
import {JokeCard} from '../components/Jokes/Joke/Joke';
import {Filter} from '../models/filter';
import {Joke} from '../models/joke';
import {ServerResponse} from '../models/serverResponse';
import {RootState} from './store';
const initialJoke: Joke = {
  id: '',
  categories: [],
  created_at: '',
  icon_url: '',
  url: '',
  value: '',
  likes: 0,
  dislikes: 0,
};
export const jokeSlice = createSlice({
  name: 'jokes',
  initialState: {
    loading: true,
    index: 0,
    total: 0,
    jokesList: new Array<Joke>(),
    jokeFilteredList: new Array<Joke>(),
    categories: new Array<string>(),
    selectedJoke: initialJoke,
    filter: {
      query: '',
      category: '',
    },
    page: 0,
    perPage: 30,
    hasMore: true,
  },
  reducers: {
    fetchJokes: (state, action: PayloadAction<ServerResponse>) => {
      state.jokesList = action.payload.result;
      state.jokeFilteredList = action.payload.result.slice(
        state.page,
        state.perPage,
      );
      state.total = action.payload.total;
      state.loading = false;
    },
    fetchCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
      state.loading = false;
    },
    filter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
      state.page = 0;
      const list = current(state.jokesList);
      state.jokeFilteredList = list
        .filter((joke) => {
          return action.payload.query !== ''
            ? joke.value
                .toLowerCase()
                .includes(action.payload.query.toLowerCase())
            : action.payload.category !== ''
            ? joke.categories.includes(action.payload.category)
            : true;
        })
        .slice(state.page, state.perPage);
      state.total = state.jokeFilteredList.length;
      state.hasMore = state.jokeFilteredList.length < state.total;
    },
    loadMore: (state) => {
      state.page = state.page++;
      state.hasMore = state.jokeFilteredList.length < state.total;
      state.jokeFilteredList = state.jokeFilteredList.concat(
        state.jokeFilteredList.slice(state.page, state.perPage),
      );
    },
    loading: (state) => {
      state.loading = true;
    },
    detail: (state, action: PayloadAction<string>) => {
      const list = current(state.jokesList);
      const selectedJoke = list.find((x) => x.id === action.payload);
      if (selectedJoke) {
        state.selectedJoke = selectedJoke;
        state.index = state.jokeFilteredList.findIndex(
          (x) => x.id === selectedJoke.id,
        );
      }
    },
    like: (state, action: PayloadAction<Joke>) => {
      state.selectedJoke = action.payload;
      state.jokesList = state.jokesList.map((x) => {
        if (x.id === action.payload.id) {
          return action.payload;
        }
        return x;
      });
    },
    prev_joke: (state, action: PayloadAction<string>) => {
      const index = state.jokeFilteredList.findIndex((x) => x.id === action.payload);
      state.selectedJoke =
        index < 0 ? state.jokeFilteredList[0] : state.jokeFilteredList[index - 1];
      state.index = index - 1;
    },
    next_joke: (state, action: PayloadAction<string>) => {
      const index = state.jokeFilteredList.findIndex((x) => x.id === action.payload);
      state.selectedJoke =
        index >= state.total
          ? state.jokeFilteredList[state.total]
          : state.jokeFilteredList[index + 1];
      state.index = index + 1;
    },
  },
});

// export actions
export const {
  fetchJokes,
  fetchCategories,
  filter,
  detail,
  like,
  next_joke,
  prev_joke,
  loading,
  loadMore,
} = jokeSlice.actions;

//export selectors
export const jokesList = (state: RootState) => state.joke.jokeFilteredList;
export const categoriesList = (state: RootState) => state.joke.categories;
export const filterBody = (state: RootState) => state.joke.filter;
export const selectedJoke = (state: RootState) => state.joke.selectedJoke;
export const totalJokes = (state: RootState) => state.joke.total;
export const JokeIndex = (state: RootState) => state.joke.index;
export const appLoading = (state: RootState) => state.joke.loading;
export const hasMore = (state: RootState) => state.joke.hasMore;

//export reducer
export default jokeSlice.reducer;
