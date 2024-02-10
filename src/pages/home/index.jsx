import { Hero } from "../../components/hero/hero";
import { Layouts } from "../../components/layouts";
import { News } from "../../components/news";
import { useState, useEffect } from "react";

export const Home = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: {
      lat: "",
      lng: "",
    },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return (
    <Layouts>
      {/* {location.loaded
        ? JSON.stringify(location.coordinates)
        : "Location data not aviable yet!"} */}
      <Hero />
      <News />
    </Layouts>
  );
};
