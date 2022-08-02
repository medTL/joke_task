import React,{FunctionComponent} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {categoriesList, filterBody} from '../../store/joke-reducer';
import {filter as filterAction} from '../../store/joke-reducer';
import './Categories.scss';

export  const Categories: FunctionComponent= () => {
  const dispatch = useAppDispatch();
  let filter = useAppSelector(filterBody);
  const categories = [...useAppSelector(categoriesList), 'view all'];
  const colors = [
    '#ff5b5b',
    '#57e690',
    '#ff915b',
    '#57dbe6',
    '#d0ba93',
    '#ff915b',
    '#ffdf5b',
    '#8fe360',
  ];
  const handleClick = (category: string) => {
    filter = {
      ...filter,
      category: category,
    };
    dispatch(filterAction(filter));
  };

  return (
    <div className="categories">
      <div className="categories_container">
        {categories.map((category) =>
          category !== 'view all' ? (
            <button
              style={{
                backgroundColor:
                  colors[Math.floor(Math.random() * colors.length)],
              }}
              className="categories_category-button clickibale"
              onClick={() => handleClick(category)}
              key={category}
            >
              <span className="categories_category-button_text">
                {category}
              </span>
            </button>
          ) : (
            <button
              className="categories_category-button categories_category-button_all clickibale"
              onClick={() => handleClick('')}
              key={category}
            >
              <span className="categories_category-button_text">
                {category}
              </span>
              <span className="icon"></span>
            </button>
          ),
        )}
      </div>
    </div>
  );
}
