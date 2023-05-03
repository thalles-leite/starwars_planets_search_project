import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import Logo from '../assets/projectIntro.gif';

export default function HeaderLogo() {
  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <img src={ Logo } alt="logo" />
      </Box>
    </Container>
  );
}
