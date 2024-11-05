"use client";

import { useState } from "react";
import Button from "./components/atoms/Button";
import List from "./components/organisms/List";

export default function Home() {
  const [artData, setArtData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchArtData() {
    setLoading(true);
    try {
      const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11"
      );
      const data = await response.json();
      const artObjects = await Promise.all(
        data.objectIDs.slice(0, 5).map(async (id) => {
          const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
          return await res.json();
        })
      );
      setArtData(artObjects);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  function clearData() {
    setArtData(null);
  }

  const Header = () => (
    <header className="header">
      <h1>Met Museum Art Collection</h1>
      <Button onClick={artData ? clearData : fetchArtData} disabled={loading} className="fetch-button">
        {artData ? "Clear Data" : "Fetch Artwork"}
      </Button>
    </header>
  );

  return (
    <div className="container">
      <Header />
      {loading && <div>Loading...</div>}
      {artData ? <List artData={artData} /> : !loading && <div>No data fetched yet!</div>}
    </div>
  );
}
