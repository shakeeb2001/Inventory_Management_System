import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Button } from '@mui/material';
import { 
  Kitchen as RiceCookerIcon, 
  FireExtinguisher as GasCookerIcon, 
  LocalCafe as HeaterJugIcon, 
  Air as FansIcon, 
  Blender as BlenderIcon, 
  Speaker as SoundSystemsIcon, 
  TouchApp as TouchIcon, 
  Iron as IronIcon,
  ArrowBack as ArrowBackIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styles from './electrics.module.css';


const items = [
  { name: 'Iron', icon: <IronIcon className={styles.icon} />, description: 'High-quality iron for your clothes.', route: '/electric/irons' },
  { name: 'Rice Cooker', icon: <RiceCookerIcon className={styles.icon} />, description: 'Cook rice perfectly every time.', route: '/electric/ricecookers' },
  { name: 'Gas Cooker', icon: <GasCookerIcon className={styles.icon} />, description: 'Efficient gas cooker for your kitchen.', route: '/electric/gascoockers' },
  { name: 'Heater Jug', icon: <HeaterJugIcon className={styles.icon} />, description: 'Boil water quickly and safely.', route: '/electric/gascoockers' },
  { name: 'Fans', icon: <FansIcon className={styles.icon} />, description: 'Stay cool with our range of fans.', route: '/electric/fans' },
  { name: 'Blender', icon: <BlenderIcon className={styles.icon} />, description: 'Blend smoothies, soups, and more.', route: '/electric/blender' },
  { name: 'Sound Systems', icon: <SoundSystemsIcon className={styles.icon} />, description: 'High-quality sound systems for your home.', route: '/electric/soundsystems' },
  { name: 'Torch', icon: <TouchIcon className={styles.icon} />, description: 'Touch-sensitive devices for your convenience.', route: '/electric/torchs' },
];

const Home = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <Container className={styles.container}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={handleBackClick} 
        variant="contained" 
        color="primary"
        style={{ marginBottom: '16px' }}
      >
        Back
      </Button>
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className={styles.card} onClick={() => handleCardClick(item.route)} style={{ cursor: 'pointer' }}>
              <Box className={styles.icon}>
                {item.icon}
              </Box>
              <CardContent>
                <Typography variant="h5" component="div" align="center">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
