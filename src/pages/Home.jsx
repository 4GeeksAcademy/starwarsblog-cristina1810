import InfoCard from "../components/InfoCard.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getData } from "../api/APICalls.js";
import { useEffect } from "react";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const getVehicles = async () => {
    try {
      const data = await getData("vehicles");
      dispatch({ type: "SET_VEHICLES", payload: data.results });
      console.log("Vehicles data fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching vehicles data:", error);
    }
  };
  const getPlanets = async () => {
    try {
      const data = await getData("planets");
      dispatch({ type: "SET_PLANETS", payload: data.results });
      console.log("Planets data fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching planets data:", error);
    }
  };
  const getPeople = async () => {
    try {
      const data = await getData("people");
      dispatch({ type: "SET_CHARACTERS", payload: data.results });
      console.log("People data fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching people data:", error);
    }
  };

  useEffect(() => {
    getVehicles();
    getPlanets();
    getPeople();
  }, []);

  return (
    <div className="container mt-5">
      <p className="titulo text-center">Vehiculos</p>
      <div className="scroll-container global-container mx-auto">
        {store.vehicles.map((vehicle) => (
          <InfoCard
            key={vehicle.id}
            data={vehicle}
            myImg={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/vehicles/${vehicle.uid}.jpg`}
          />
        ))}
      </div>

      <p className="titulo text-center">Personajes</p>
      <div className="scroll-container">
        {store.characters.map((character) => (
          <InfoCard
            key={character.id}
            data={character}
            myImg={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/people/${character.uid}.jpg`}
          />
        ))}
      </div>

      <p className="titulo text-center">Planetas</p>
      <div className="scroll-container">
        {store.planets.map((planet) => (
          <InfoCard
            key={planet.id}
            data={planet}
            myImg={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/planets/${planet.uid}.jpg`}
          />
        ))}
      </div>
    </div>
  );
};
