import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Location from './Location';
import { useGeoData } from '../Context/geoDataContext';

const totalLocation = 29;
let count = 0;

const LocationController = () => {
  const ctx = useGeoData();
  if (ctx !== null) {
    var setPreviousLocation = ctx.setPreviousLocation;
  }

  const [currentLocation, setCurrentLocation] = useState<any>({});
  const [locationCount, setLocationCount] = useState<number>(0);

  function formatDate(date: any) {
    function padTo2Digits(num: any) {
      return num.toString().padStart(2, '0');
    }
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear().toString(),
    ].join('/');
  }

  function formatTime(date: any) {
    return [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
  }

  const getData = () => {
    navigator.geolocation.getCurrentPosition(function (position: any) {
      axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=47fb832345ac4f1f9bcc28998ff8bca2`
        )
        .then((response: any) => {
          const res = response.data.results[0];
          const tempObj = {
            address: res.formatted,
            date: formatDate(new Date()),
            time: formatTime(new Date()),
            coordinates: [res.geometry.lng, res.geometry.lat],
          };
          setCurrentLocation(tempObj);
          previousData(tempObj);
          setLocationCount((prev) => prev + 1);
          count++;
        });
    });
  };

  const previousData = (tempObj: any) => {
    if (Object.keys(tempObj).length !== 0) {
      setPreviousLocation((prev) => [...prev, tempObj]);
    }
  };

  const decrementCount = () => {
    return count--;
  };

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      console.log(count);

      count <= totalLocation && getData();
      return () => {
        clearInterval(interval);
      };
    }, 2000);
  }, []);

  const LocationProp = {
    currentLocation,
    setLocationCount,
    locationCount,
    decrementCount,
  };

  return <Location {...LocationProp} />;
};

export default LocationController;
