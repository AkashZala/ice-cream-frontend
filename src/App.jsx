import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [flavors, setFlavors] = useState([]);

  useEffect(() => {
    const fetchFlavors = async () => {
      const response = await axios.get('http://localhost:3000/api/flavors');
      setFlavors(response.data);
    }
    fetchFlavors();
  }, []);

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
                  {flavor.favorite ? `* ${flavor.name}` : flavor.name}
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
