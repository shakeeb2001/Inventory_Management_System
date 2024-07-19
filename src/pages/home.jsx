import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import {
  Tv as ElectronicsIcon,
  Coffee as CeramicIcon,
  Category as PlasticMetalIcon,
  Brush as CosmeticsIcon,
  MoreHoriz as OtherItemsIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import styles from './Electrics/electrics.module.css';

const items = [
  { name: 'Electronics', icon: <ElectronicsIcon className={styles.icon} />, description: 'High-quality electronic items.', route: '/electric' },
  { name: 'Ceramic', icon: <CeramicIcon className={styles.icon} />, description: 'Beautiful ceramic products.', route: '/ceramic' },
  { name: 'Plastic & Metal', icon: <PlasticMetalIcon className={styles.icon} />, description: 'Durable plastic and metal items.', route: '/plastic-metal' },
  { name: 'Cosmetics', icon: <CosmeticsIcon className={styles.icon} />, description: 'Top quality cosmetic products.', route: '/cosmetics' },
  { name: 'Other Items', icon: <OtherItemsIcon className={styles.icon} />, description: 'Various other products.', route: '/other-items' },
];

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <Container className={styles.container}>
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className={styles.card} onClick={() => handleCardClick(item.route)}>
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
