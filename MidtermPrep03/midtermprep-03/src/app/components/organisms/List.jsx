import Card from "../molecules/Card";

export default function List({ artData }) {
  return (
    <section className="art-gallery">
      {artData.map((art) => (
        <Card key={art.objectID} art={art} />
      ))}
    </section>
  );
}