import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './redux/store';
import MovieThunks from './redux/thunks/MovieThunks';


// store.dispatch(MovieAction.setLoadingAction(true));

// store.dispatch(MovieAction.setSearchCriteriaAction({page: 2}));

// const test = async ()=>{
//   await store.dispatch(MovieThunks.fetchMovies({page: 2}));
//   await store.dispatch(MovieThunks.deleteMovie('66be9c14cfb14028eac100b1'));
// };

// await test();


// store.dispatch(MovieAction.fetchMovies({page: 2}));

// store.dispatch(MovieAction.deleteMovie('66bc07ba1723386a9c9517ef'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
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
