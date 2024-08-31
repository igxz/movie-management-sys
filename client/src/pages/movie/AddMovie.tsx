import React, { useCallback } from 'react';
import MovieForm from '../../components/MovieForm';
import { IMovie, MovieService } from '../../services/MovieService';

const AddMovie: React.FC = () => {
  // callback function to handle movie creation
  const handleMovieAdd = useCallback( async (movieObj: IMovie) : Promise<string> => {
    
    console.log(movieObj);
    const response = await MovieService.add(movieObj);
    
    if(response.data){
      return '';
    }else{
      return response.error;
    }
  },[]);

  return (
    <>
    <h2>Movie Creation Page</h2>
    <MovieForm onSubmit={handleMovieAdd}/>
    </>
  )
}

export default AddMovie;
