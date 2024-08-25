import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface FilterBarProps {
  setFilter: (filter: string) => void;
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ setFilter, className }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (filter: string) => {
    setSelectedFilter(filter);
    setFilter(filter);  // Update the filter state
    handleClose();
  };

  return (
    <div className={className}>
      <button
        onClick={handleClick}
        className="border border-1 px-4 py-2 border-slate-700 rounded-md bg-slate-900 text-white/40 text-base"
        >
        {selectedFilter || "Filter"}
        {!selectedFilter && <FilterListIcon className="ml-1"/>}
      </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuItemClick("All")}>
          All
        </MenuItem>
        <MenuItem 
            onClick={() => handleMenuItemClick("Requests")}
            >
          Requests
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Storage Required")}>
          Storage Required
        </MenuItem>
      </Menu>
    </div>
  );
};

export default FilterBar;
