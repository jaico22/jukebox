import React, { useEffect, useState } from "react";
import { SearchResult } from "./models/SearchResult";
import styles from "./search.module.css"
import { SearchResults } from "./SearchResults";
import { useMusicPlayer } from "../musicPlayer/hooks/useMusicPlayer";

const Search = () => {
    const musicPlayer = useMusicPlayer();
    const [searchTerm, setSearch] = useState<string>("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    const handleSearchBoxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value);
        e.preventDefault();
    };
    const search = async () => {
        const results = await musicPlayer?.search(searchTerm);
        setSearchResults(results ? results.map(r => ({ song: r })) : [])
    } 
    
    useEffect(() => {
        if (searchTerm.length > 1)
            search();     
    }, [searchTerm])

    const handleClose = () => {
        setSearch('')
        setSearchResults([])
    };

    return (
        <div >
            <div id="search-bar" className={styles.searchBarContainer}>
                <input className={styles.searchBar} onChange={handleSearchBoxChange} value={searchTerm} placeholder="Search Library..."/>
            </div>
            <SearchResults results={searchResults} onClose={handleClose} />
        </div>)
}

export { Search };