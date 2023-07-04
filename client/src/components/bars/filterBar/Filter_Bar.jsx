import React from "react";

import style from "./Filter_Bar.module.css";

function FilterBar() {


  return (
    <div className={style.bar1}>
      <p>Selecciona Lenguaje</p>
      <select >
        <option value="">Todos los Lenguajes</option>
        <option value="Java">Java</option>
       
      </select>

      <p>Selecciona Coste</p>
      <select >
        <option value="">Todas los Costes</option>
          
      </select>

      <p>Ordenar Asc/Des </p>
      <select >
        <option value="">Ordenar</option>
        <option value="nameAsc">Nombre Ascendente</option>
        <option value="nameDesc">Nombre Descendente</option>
      
      </select>
    </div>  
  );
}

export default FilterBar; 
// onChange={handleSortChange}
// onChange={handleActivityChange}
// onChange={handleLenguajeChange}