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

  return (
    <>
      <h1>Ice Cream Flavors ({flavors.length})</h1>
      <ul>
        {
          flavors.map(flavor => {
            return (
              <li key={flavor.id}>
                {flavor.favorite ? `${flavor.name} *` : flavor.name}
              </li>
            );
          })
        }
      </ul>
    </>
  )
}

export default App
