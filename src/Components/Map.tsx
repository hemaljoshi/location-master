import React, { useEffect, useRef, useState } from 'react';
import NavTabs from './Tabs';
import { Container, Grid } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import { useGeoData } from '../Context/geoDataContext';
import './Map.css';
import '../../assets/mapbox-gl.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiaGVtYWxqb3NoaSIsImEiOiJjbDNtemJ0djIwOXg4M2psOHRteDJnZXpjIn0.9w6bYPrV3VVsQ5OHggmZ5w';

var previousLocation: any[];
const Map = () => {
  const ctx = useGeoData();
  if (ctx !== null) {
    previousLocation = ctx.previousLocation;
  }

  const mapContainer = useRef<any>(null);

  // Initialize map when component mounts
  useEffect(() => {
    //Creating Map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [70.456444, 21.515471],
      zoom: 4,
      attributionControl: false,
    });

    //Adding Marker to the Map
    previousLocation?.map((data) => {
      new mapboxgl.Marker().setLngLat(data.coordinates).addTo(map);
    });

    // Clean up on unmount
    return () => map.remove();
  }, [previousLocation]);

  return (
    <>
      <NavTabs />
      <Container maxWidth='lg'>
        <Grid
          container
          justifyContent='center'
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item lg={8} md={8} sm={8} xs={8} sx={{ mt: 5 }}>
            <div
              ref={mapContainer}
              className='map-container'
              style={{ height: '70vh', width: '100%', top: 0 }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Map;
