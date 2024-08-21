import React from 'react';
import { useParams } from 'react-router-dom';

type editMoviePropsKeys = 'id' | '_id';

type editMovieProps = Record<editMoviePropsKeys, string>;

const EditMovie: React.FC = () => {

  const { id } = useParams<editMovieProps>(); // Use useParams to access route parameters
  console.log(id); // This will log '12345' when navigating to '/movie/edit/12345'

  return (
    
    <h1>
      Edit Movie Page {id};
    </h1>
  )
}

export default EditMovie;
