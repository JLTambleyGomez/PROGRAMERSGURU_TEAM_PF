import React from "react";
import styles from "./MusicBar.module.css";
import { useState } from "react";
const MusicBar = () => {

const [showMusicBar,setShowMusicBar]= useState(false)

const handleshowmusicbar =()=>{
    setShowMusicBar(true)
    
}
const handleocultarMusicbar=()=>{
    setShowMusicBar(false)
}

  return (
<div className={styles.component}> <p className={styles.p}onClick={handleshowmusicbar}>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-music-player-fill" viewBox="0 0 16 16">
  <path d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
  <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm1 2h6a1 1 0 0 1 1 1v2.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm3 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
</svg></p>
    {showMusicBar &&(
    <div className={styles.container}>
        <p className={styles.p2} onClick={handleocultarMusicbar}>X</p>
<iframe
  className={styles.video}
  src="https://www.youtube.com/embed/WWUoq4RtHV0"
  title="Música Para Programar"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
 
></iframe>


    </div>)}</div>
  );
};

export default MusicBar;
