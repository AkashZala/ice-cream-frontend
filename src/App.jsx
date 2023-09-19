import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

function App() {
  const [flavors, setFlavors] = useState([]);
  const location = useLocation().pathname;

  useEffect(() => {
    const fetchFlavors = async () => {
      const response = await axios.get('http://localhost:3000/api/flavors');
      setFlavors(response.data);
    }
    fetchFlavors();
  }, []);

  
  const flavor = flavors.find(flavor => flavor.id === location.slice(13,location.length)*1);

  const deleteFlavor = async (flavor) => {
    const response = await axios.delete(`http://localhost:3000/api/flavors/${flavor.id}`);
    setFlavors(flavors.filter(_flavor => _flavor.id !== flavor.id));
  }

  return (
    <>
      <h1>Ice Cream Flavors ({flavors.length})</h1>
      <ul>
        {
          flavors.map(flavor => {
            return (
              <li key={flavor.id}>
                <Link to={`/api/flavors/${flavor.id}`}>
                  {flavor.favorite ? `* ${flavor.name}` : flavor.name}
                </Link>
                <button onClick={() => {deleteFlavor(flavor)}}>
                  X
                </button>
              </li>
            );
          })
        }
      </ul>
      <p>* Favorite</p>
    </>
  )
}

export default App
