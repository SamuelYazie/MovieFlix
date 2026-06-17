import React from 'react'

function Search({searchTerm, setSearchTerm}) {
    return (
        <div className='search'>
            <div>
                <img src='/search.svg' alt="Search Icon" className='search-icon' />
                <input 
                    type="text" 
                    placeholder='Search for movies...' 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Search