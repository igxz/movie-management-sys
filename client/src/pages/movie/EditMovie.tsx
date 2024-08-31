import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IMovie, MovieService } from '../../services/MovieService';
import MovieForm from '../../components/MovieForm';
import { message } from 'antd';

type editMoviePropsKeys = 'id' | '_id';

type editMovieProps = Record<editMoviePropsKeys, string>;

const EditMovie: React.FC = () => {
  const { id } = useParams<editMovieProps>(); // Use useParams to access route parameters
  // console.log(id); // This will log '12345' when navigating to '/movie/edit/12345'
  const [movie, setMovie] = useState<IMovie>();

  const fetchMovie = useCallback(async () => {
    if (id) {
      const response = await MovieService.getMovieById(id);
      if (response.error) {
        // Handle error if needed
        message.error('Error fetching movie:', response.error);
      } else {
        // Set the movie state with the data from the response
        setMovie(response.data);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  // callback function to handle movie creation
  const handleMovieEdit = useCallback(
    async (movieObj: IMovie): Promise<string> => {
      // console.log(movieObj);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const response = await MovieService.update(id!, movieObj);

      if (response.data) {
        return '';
      } else {
        return response.error;
      }
    },
    []
  );

  return (
    <>
    <h2>Movie Edit Page</h2>
    <MovieForm onSubmit={handleMovieEdit} movie={movie}/>
    </>
  )
};

export default EditMovie;
