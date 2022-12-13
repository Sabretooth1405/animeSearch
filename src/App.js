import { useState } from 'react';
import './App.css';
import Header from './components/Header'
import Search from './components/Search'
import Manga from './components/Manga';
import Anime from './components/Anime';
import Footer from './components/Footer';
const _ = require('lodash');
function App() {
  const [mangaStatus,setMangaStatus]=useState(0)
  const [animeStatus, setAnimeStatus] = useState(0)
  const [mangaObj,setMangaObj]=useState({})
  const[animeObj, setAnimeObj] = useState({})

  const queryResultHandler=(result)=>{
  const [manga,anime] =result
  if(!_.isEmpty(manga)){
    setMangaStatus(1)
    setMangaObj(manga)
  }
  else{
    setMangaStatus(-1)
  }
  if(!_.isEmpty(anime)){
    
    setAnimeStatus(1)
    setAnimeObj(anime)
  }
  else{
    setAnimeStatus(-1)
  }
  
  }

  return (
    <>
      <Header />
      <Search resultHandler={queryResultHandler}/>
      <Manga obj={mangaObj} status={mangaStatus}/>
      <Anime obj={animeObj} status={animeStatus}/>
      <Footer/>
    </>
  );
}

export default App;
