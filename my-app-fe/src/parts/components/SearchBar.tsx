import React from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

interface SearchBarProps {
    setSearchQuery: (query: string) => void;
    className?: string;
  }

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery, className }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className={className}>
      <TextField
        id="search-bar"
        className="bg-slate-900"
        onChange={handleInputChange}
        placeholder="Search..."
        size="small"
        InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton aria-label="search">
                  <SearchIcon className="text-slate-600" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'white', // Removes the default blue border
              },
              
            },
          }}
      />
      
    </form>
  );
};

export default SearchBar;
