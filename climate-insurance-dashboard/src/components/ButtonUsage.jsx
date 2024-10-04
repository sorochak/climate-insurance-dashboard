import React from 'react';
import Button from '@mui/material/Button';

export default function ButtonUsage({ text, isDisabled, handleClick }) {
  return (
    <Button variant="contained" disabled={isDisabled} onClick={handleClick}>
      {text}
    </Button>
  );
}
