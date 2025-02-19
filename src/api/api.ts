import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = import.meta.env.VITE_OMDB_API_URL;

export const fetchMovies = async (query?: string, year?: string, type?: string, page: number = 1) => {
    
    console.log('Fetching with params:', { query, year, type, page });
    
    if (!query && !year && !type) {
        return { movies: [], totalPages: 1, error: "Enter a title, year or type to search" };
    }

    try {
        let url = `${API_URL}?apikey=${API_KEY}&page=${page}`;
        
        if (query) url += `&s=${encodeURIComponent(query)}`;
        if (year) url += `&y=${encodeURIComponent(year)}`;
        if (type) url += `&type=${encodeURIComponent(type)}`;

        console.log('Request URL:', url);

        const response = await axios.get(url);
        console.log('API Response:', response.data);

        if (response.data.Response === "True") {
            return {
                movies: response.data.Search,
                totalPages: Math.ceil(Number(response.data.totalResults) / 10),
                error: null
            };
        }
        
        // Log the error response
        console.log('API Error Response:', response.data);
        return { 
            movies: [], 
            totalPages: 1, 
            error: response.data.Error || "No results found" 
        };
    } catch (error: any) {
        console.error('API Error:', error); // Log any API errors
        return { 
            movies: [], 
            totalPages: 1, 
            error: error.message || "Failed to fetch movies" 
        };
    }
};