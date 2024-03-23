import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon.jsx';

export default function Pokedex() {
    const [pokemons, setPokemons] = useState([]);
    const [lang, setLang] = useState('english');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(15);

   
    useEffect(() => {
        setLoading(true);
        fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pokemon?page=${currentPage}`)
        
            .then(res => res.json())
            .then(data => {
                const newData = data.map(el => ({ ...el, pokeStats: el.base }));
                setPokemons(newData);
                setTotalPages(data.totalPages);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [currentPage]);
    

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    
    
  
    };

    return (
        <main>
            <div className="change_language">
                <button onClick={() => setLang('english')}>English</button>
                <button onClick={() => setLang('japanese')}>Japanese</button>
                <button onClick={() => setLang('chinese')}>Chinese</button>
                <button onClick={() => setLang('french')}>French</button>
            </div>
            <p>Page {currentPage} of {totalPages}</p>
            <div className="pagination">
    <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Back
    </button>
    {Array.from({ length: totalPages > 15 ? 15 : totalPages }, (_, i) => (
        <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
        >
            {i + 1}
        </button>
    ))}
    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
    </button>
    
</div>
                    

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ul className="pokedex">
                        {pokemons.map(el => {
                            const pokemon = { ...el, pokeName: el.name[lang] };
                            return <Pokemon key={el.id} {...pokemon} />;
                        })}
                    </ul>
         
                </>
            )}

            
           
        </main>
    );
}


