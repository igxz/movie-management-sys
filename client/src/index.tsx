import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import {store} from './redux/store'; // Import the Redux store

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// const movie: IMovie = {
//   name: 'Bit Fish 3',
//   types: ['Horriable', 'R18'],
//   showRegions: ['USA', 'UK'],
//   showTimeInMinutes: 240,
//   isComing: true,
//   isPopular: true,
//   isClassic: false,
// }; 

// const data = await MovieService.getMovieById('66bdc36dcfb14028eac100aa');
// const data = await MovieService.getMovies({limit: 11, key: 'Fish'});
// console.log(data.data);

// const data = await MovieService.add(movie);
// const data = await MovieService.update('66bdc36dcfb14028eac100aa', movie);
// if(data.error){
//   console.log(data.error);
// }else{
//   console.log(data.data);
// }
