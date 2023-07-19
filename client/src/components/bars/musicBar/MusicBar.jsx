import React from "react";
import styles from "./MusicBar.module.css";
import { useState } from "react";
const MusicBar = () => {

const [showMusicBar,setShowMusicBar]= useState(false)

const handleshowmusicbar =()=>{}

  return (

    <div className={styles.container}>
<iframe
  className={styles.video}
  src="https://www.youtube.com/embed/WWUoq4RtHV0"
  title="Música Para Programar"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
 
></iframe>


    </div>
  );
};

export default MusicBar;
