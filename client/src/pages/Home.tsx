import React, { useState } from 'react';
import ImgUploader from '../components/ImgUploader';

const Home: React.FC = () => {

  const [posterUrl, setPosterUrl] = useState('');

  return (
    <h1>
      Welcome to MMS's Home Page
      <ImgUploader url={posterUrl} onChange={(url)=>{setPosterUrl(url)}}/>
    </h1>
  )
}

export default Home;
