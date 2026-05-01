import React from 'react'

function MovieCard({ movie: {original_title, vote_average, poster_path, release_date, original_language} }) {
    return (
        <div className='movie-card'>
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={original_title} className='movie-poster' />
            <div>
                <h3 className='mt-3'>{original_title}</h3>
                <div className='content'>
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
