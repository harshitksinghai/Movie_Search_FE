import React, { useState } from "react";
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

interface SearchBarProps {
    onSearch: (query: string, year: string, type: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [year, setYear] = useState("");
    const [type, setType] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query.trim(), year.trim(), type);
    };

    return (
        <form onSubmit={handleSearch}>
            <Box 
                sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 3
                }}
            >
                <TextField
                    label="Search Movie"
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                />
                <TextField
                    label="Year (Optional)"
                    variant="outlined"
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    sx={{ minWidth: 180 }}
                    
                />
                <FormControl variant="outlined" sx={{ minWidth: 180 }}>
                    <InputLabel>Type (Optional)</InputLabel>
                    <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        label="Type (Optional)"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="movie">Movie</MenuItem>
                        <MenuItem value="series">Series</MenuItem>
                    </Select>
                </FormControl>
                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                >
                    Search
                </Button>
            </Box>
        </form>
    );
};

export default SearchBar;
