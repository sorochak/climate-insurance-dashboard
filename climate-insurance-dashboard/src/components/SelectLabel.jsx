import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';

export default function SelectLabel({ targetKind, setTargetKind }) {
  const handleChange = (event) => {
    setTargetKind(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-helper-label">Target Kind</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={targetKind}
        label="Target Kind"
        onChange={handleChange}
      >
        <MenuItem value="FCT">FCT</MenuItem>
        <MenuItem value="CLIMATO">CLIMATO</MenuItem>
      </Select>
    </FormControl>
  );
}
