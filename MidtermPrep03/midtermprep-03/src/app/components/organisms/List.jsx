import Card from "../molecules/Card";

export default function List({ artData }) {
  return (
    <section className="list">
      {artData.map((art) => (
        <Card key={art.objectID} art={art} />
      ))}
    </section>
  );
}