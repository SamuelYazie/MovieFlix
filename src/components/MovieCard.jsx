import React from 'react'

function MovieCard({ movie: {id, original_title, vote_average, poster_path, release_date, original_language, genre_ids}, genres }) {
    const genreNames = genre_ids.map(id => {
        const genre = genres.find(g => g.id === id);
        return genre ? genre.name : 'Unknown';
    }).join(', ');

    return (
        <div className='movie-card cursor-pointer' onClick={() => window.open(`https://www.themoviedb.org/movie/${id}`, '_blank')}>
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={original_title} className='movie-poster' />
            <div>
                <h3 className='mt-3 text-m'>{original_title}</h3>
                <p className='text-white text-s mt-1.5'>{genreNames}</p>
                <div className='content mt-0'>
                    <div className='rating'>
                        <img src='star.svg' alt='Star' />
                        <p className='text-white'>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>
                    <span>•</span>
                    <p className="lang">{original_language}</p>
                    <span>•</span>
                    <p className="year">
                        {release_date ? new Date(release_date).getFullYear() : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
