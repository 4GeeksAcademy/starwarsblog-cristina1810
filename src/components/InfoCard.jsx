import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getDetails } from "../api/APICalls";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const InfoCard = ({ data, myImg }) => {
  const location = useLocation();
  const { dispatch, store } = useGlobalReducer();
  const [info, setInfo] = useState({});
  const [fav, setFav] = useState(false);

  const getDetailsAPI = async () => {
    try {
      const response = await getDetails(data.url);
      setInfo(response.result.properties);
      // console.log("INFO:", response.result.properties);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const addFav = () => {
    if (!fav) {
      setFav(true);
      dispatch({ type: "ADD_FAVORITE", payload: data });
    } else {
      setFav(false);
      dispatch({ type: "REMOVE_FAVORITE", payload: data.uid });
    }
  };

  useEffect(() => {
    getDetailsAPI();
  }, []);

  return (
    <div className="  item-card text-start">
      <img alt="" src={myImg} className="img-style d-flex mx-auto" />
      <p className="titulo-2 m-3">{data.name}</p>

      {info.eye_color && (
        <div className="d-flex row justify-content-between align-items-center px-3 py-2">
          <p>Gender: {info.gender}</p>
          <p>Hair color: {info.hair_color}</p>
          <p>Eye color: {info.eye_color}</p>
        </div>
      )}

      {info.population && (
        <div className="d-flex row justify-content-between align-items-center px-3 py-2">
          <p>Population: {info.population}</p>
          <p>Terrain: {info.terrain}</p>
        </div>
      )}

      {info.crew && (
        <div className="d-flex row justify-content-between align-items-center px-3 py-2">
          <p>Length: {info.length}</p>
          <p>Crew: {info.crew}</p>
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center px-3 py-2">
        <Link to={`/details/${data.uid}`}>
          <button className="btn my-btn">Ver detalles</button>
        </Link>
        {fav ? (
          <button className="btn my-btn" onClick={addFav}>
            <i className="fa-solid fa-star"></i>
          </button>
        ) : (
          <button className="btn my-btn" onClick={addFav}>
            <i className="fa-regular fa-star"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default InfoCard;

//response.result.properties.
