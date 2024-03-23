import { useState, useEffect } from 'react'

export default function Pokemon({id,pokeName,type,image,pokeStats}){


    return <li>
        <img src={image} alt={pokeName} />

        <h3>
            [{id}] {pokeName}
        </h3>
        
        <ul className="pokeTypes">
            {type.map((el,i)=><li key={i}>{el}</li>)}
        </ul>

        <ul className='col2'>
            <li>HP: {pokeStats['HP']}</li>
            <li>Speed: {pokeStats['Speed']}</li>
            <li>Attk: {pokeStats['Attack']}</li>
            <li>Sp. Attk: {pokeStats['Sp. Attack']}</li>
            <li>Def{pokeStats['Def']}</li>
            <li>Sp. Def: {pokeStats['Sp. Def']}</li>
        </ul>
    

    </li>
      }
    
   
