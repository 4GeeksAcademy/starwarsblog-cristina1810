import { Link, useLocation } from "react-router-dom";
import logo from "../assets/img/logo.png";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { dispatch, store } = useGlobalReducer();
  const location = useLocation();

  return (
    <nav className="navbar navbar-dark bg-dark shadow">
      <div className="container align-items-center p-2">
        {location.pathname !== "/" && (
          <Link to="/" className="btn nav-link p-2">
            Volver
          </Link>
        )}

        <div className="flex-grow-1 d-flex justify-content-center">
          <Link to="/">
            <img src={logo} className="logo" alt="Logo" />
          </Link>
        </div>

        <ul className="nav-item dropdown m-0 p-0 ms-auto">
          <button
            className="nav-link dropdown-toggle p-2 rounded px-3"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-star"></i>
          </button>

          <ul className="dropdown-menu">
            {store.favorites.length > 0 ? (
              store.favorites.map((item) => (
                <li
                  key={item.uid}
                  className="d-flex justify-content-between align-items-center px-2"
                >
                  <Link to={`/details/${item.uid}`} className="dropdown-item">
                    {item.name}
                  </Link>
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FAVORITE",
                        payload: item.uid,
                      })
                    }
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-muted">No hay favoritos</li>
            )}
          </ul>
        </ul>
      </div>
    </nav>
  );
};
