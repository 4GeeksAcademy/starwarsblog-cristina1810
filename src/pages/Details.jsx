import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetails } from "../api/APICalls";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../index.css";

export const Details = () => {
  const { uid } = useParams(); // obtenemos el uid de la URL
  const { store } = useGlobalReducer();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        // Buscamos el objeto en store primero
        const found =
          store.vehicles.find((v) => String(v.uid) === String(uid)) ||
          store.characters.find((c) => String(c.uid) === String(uid)) ||
          store.planets.find((p) => String(p.uid) === String(uid));

        if (found) {
          const response = await getDetails(found.url);
          setItem(response.result.properties);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchItem();
  }, [uid, store]);

  if (!item) return <p>Cargando...</p>;

  return (
    <div className="container mx-auto d-flex m-5">
      <div>
        <img
          src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/${
            item.length ? "vehicles" : item.eye_color ? "people" : "planets"
          }/${uid}.jpg`}
          alt={item.name}
          className="rounded-3 mb-3"
        />
      </div>
      <div className="text-start ms-5">
        <h1 className="titulo">{item.name}</h1>
        {item.gender && (
          <>
            <div className="d-flex">
              <p className="mytext">Birth year:</p>{" "}
              <p className="mx-3"> {item.birth_year}</p>
            </div>
            <div className="d-flex">
              <p className="mytext">Eye color:</p>{" "}
              <p className="mx-3"> {item.eye_color}</p>
            </div>
            {/* <div className="d-flex"> */}
            {/* <p className="mytext">Films:</p>{" "} */}
            {/* <p className="mx-3"> */}
            {/* {" "} */}
            {/* {item.films.map((film) => film.title).join(", ")} */}
            {/* </p> */}
            {/* </div> */}
            <div className="d-flex">
              <p className="mytext">Gender:</p>{" "}
              <p className="mx-3"> {item.gender}</p>
            </div>
            <div className="d-flex">
              <p className="mytext">Hair color:</p>{" "}
              <p className="mx-3"> {item.hair_color}</p>
            </div>
            <div className="d-flex">
              <p className="mytext">Height:</p>{" "}
              <p className="mx-3"> {item.height}</p>
            </div>
            <div className="d-flex">
              <p className="mytext">Homeworld:</p>{" "}
              <p className="mx-3"> {item.homeworld}</p>
            </div>
            <div className="d-flex">
              <p className="mytext">Mass:</p>{" "}
              <p className="mx-3"> {item.mass}</p>
            </div>
            <div className="d-flex">
              <p className="mytext">Name:</p>{" "}
              <p className="mx-3"> {item.name}</p>
            </div>
            <div className="d-flex">
              <p className="mytext">Skin color:</p>{" "}
              <p className="mx-3"> {item.skin_color}</p>
            </div>

            <div className="d-flex">
              {" "}
              <p className="mytext">Species:</p>
              <p className="mx-3">
                {item.species.map((specie) => specie.name).join(", ")}
              </p>
            </div>
            <div className="d-flex">
              <p className="mytext">Starships:</p>{" "}
              <p className="mx-3">
                {item.starships.map((starship) => starship.name).join(", ")}
              </p>
            </div>
            <div className="d-flex">
              <p className="mytext">Vehicles:</p>{" "}
              <p className="mx-3">
                {item.vehicles.map((vehicle) => vehicle.name).join(", ")}
              </p>
            </div>
          </>
        )}
        {item.population && (
          <>
            <p className="titulo-2">Population</p>
            <p>Population: {item.population}</p>
            <p>Terrain: {item.terrain}</p>
          </>
        )}
        {item.crew && (
          <>
            <p>Length: {item.length}</p>
            <p>Crew: {item.crew}</p>
          </>
        )}
      </div>
    </div>
  );
};
