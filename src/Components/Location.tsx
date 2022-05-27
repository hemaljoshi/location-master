import React, { useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Button } from '@mui/material';
import NavTabs from './Tabs';
import { useGeoData } from '../Context/geoDataContext';

interface LocationProps {
  currentLocation: any;
  locationCount: number;
  decrementCount: () => void;
  setLocationCount: React.Dispatch<React.SetStateAction<number>>;
}
var previousLocation: any[];
const Location: React.FC<LocationProps> = ({
  currentLocation,
  setLocationCount,
  locationCount,
  decrementCount,
}) => {
  const ctx = useGeoData();
  if (ctx !== null) {
    var setPreviousLocation = ctx.setPreviousLocation;
    previousLocation = ctx.previousLocation;
  }

  const popFirstLocation = () => {
    const prev: any[] = [...previousLocation];
    prev.shift();
    setLocationCount((previousValue) => previousValue - 1);
    decrementCount();
    setPreviousLocation(prev);
  };

  const clearPreviousLocation = () => {
    setPreviousLocation([]);
  };

  useEffect(() => {
    locationCount === 30 && popFirstLocation();
  }, [locationCount]);

  return (
    <>
      <NavTabs />
      <Container maxWidth='lg'>
        <Grid
          container
          minHeight='100vh'
          justifyContent='center'
          alignItems='center'
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <Paper elevation={10} sx={{ p: 4, borderRadius: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant='h5'
                  color='primary'
                  fontWeight={600}
                  sx={{ mb: 4 }}
                >
                  Location Manager
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  border: '1px solid #b9b9b9',
                  borderRadius: 2,
                  p: 1,
                  mb: 2,
                }}
              >
                <Typography fontWeight={600} sx={{ mb: 1 }} color='primary'>
                  Current Location
                </Typography>
                <Box>
                  <Typography>
                    <b>Address: </b>
                    {currentLocation?.address}
                  </Typography>
                  <Typography variant='caption' fontWeight={600}>
                    {`${currentLocation?.date}  ${currentLocation?.time}`}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  p: 1,
                }}
              >
                <Typography fontWeight={600} sx={{ mb: 1 }} color='primary'>
                  Previous Location
                </Typography>
                <Box
                  sx={{
                    overflowY: 'auto',
                  }}
                >
                  <Box sx={{ height: '30vh' }}>
                    {previousLocation?.map((data, index) => (
                      <Box
                        key={index}
                        sx={{
                          border: '1px solid #b9b9b9',
                          borderRadius: 2,
                          my: 1,
                          p: 1,
                        }}
                      >
                        <Typography>
                          <b>({index}) Address: </b>
                          {data?.address}
                        </Typography>
                        <Typography variant='caption' fontWeight={600}>
                          {`${data?.date}  ${data?.time}`}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mt: 3,
                }}
              >
                <Button
                  variant='contained'
                  color='error'
                  onClick={clearPreviousLocation}
                >
                  Clear All
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Location;
