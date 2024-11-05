"use client"; 

import { useState } from 'react'; 
import Button from './components/atoms/Button'; 
import ItemList from './components/organisms/List'; 

export default function Home() {
  const [items, setItems] = useState([]); 
  const [isVisible, setIsVisible] = useState(false); 

  async function fetchData() {
    try {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1`); 
      const data = await response.json(); 

      const objects = []; 
      for (let id of data.objectIDs) {
        const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`); 
        const objectData = await res.json(); 

        if (objectData.primaryImage) {
          objects.push(objectData); 
        }

        if (objects.length === 5) break; 
      }

      setItems(objects); 
      setIsVisible(true); 
    } catch (error) {
      console.error('Error fetching data:', error); 
    }
  }

  function toggleData() {
    if (isVisible) {
      setItems([]); 
      setIsVisible(false); 
    } else {
      fetchData(); 
    }
  }

return (
  <div>
    <h1>Met Museum Art Collection</h1>
    <Button onClick={toggleData}>{isVisible ? 'Clear' : 'Fetch 5 Results'}</Button>
    {isVisible && <ItemList items={items} />}
  </div>
 ); 
}