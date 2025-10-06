export const initialStore = () => ({
  message: null,
  favorites: [],
  characters: [],
  planets: [],
  vehicles: [],
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "SET_CHARACTERS":
      return { ...store, characters: action.payload };
    case "SET_PLANETS":
      return { ...store, planets: action.payload };
    case "SET_VEHICLES":
      return { ...store, vehicles: action.payload };
    case "ADD_FAVORITE":
      // Evitar duplicados
      const exists = store.favorites.some(
        (fav) => fav.uid === action.payload.uid
      );
      return exists
        ? store
        : { ...store, favorites: [...store.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      return {
        ...store,
        favorites: store.favorites.filter(
          (item) => item.uid !== action.payload
        ),
      };
    default:
      return store;
  }
}
