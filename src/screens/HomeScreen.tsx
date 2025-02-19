import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import ShowMovies from "../components/ShowMovies";
import { fetchMovies } from "../api/api";

const HomeScreen: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchParams, setSearchParams] = useState<any>({ query: "", year: "", type: "" });

    const fetchMovieResults = async (query: string, year: string, type: string, currentPage: number = 1) => {
        if (!query && !year && !type) {
            setError("Enter a title, year or type to search");
            setMovies([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await fetchMovies(query, year, type, currentPage);
            console.log('Search Result:', result); // Debug log

            setMovies(result.movies);
            setTotalPages(result.totalPages);
            setError(result.error);
        } catch (err) {
            console.error('Search Error:', err); // Debug log
            setError("Something went wrong");

            setMovies([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query: string, year: string, type: string) => {
        if (query.trim().length < 3) {
            setError("Title must have 3 or more characters!");
            return;
        }
        if (year.trim()) {
            const yearNum = parseInt(year);
            const currentYear = new Date().getFullYear();
            
            if (yearNum < 1888 || yearNum > currentYear) {
                setError(`Year must be between 1888 and ${currentYear}`);
                return;
            }
        }
        console.log('Search triggered with:', { query, year, type }); // Debug log
        setSearchParams({ query, year, type });
        setPage(1);
        fetchMovieResults(query, year, type, 1);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        fetchMovieResults(searchParams.query, searchParams.year, searchParams.type, value);
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                🎬 Movie Search App
            </Typography>
            <SearchBar onSearch={handleSearch} />
            <ShowMovies
                movies={movies}
                loading={loading}
                error={error}
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </Container>
    );
};

export default HomeScreen;