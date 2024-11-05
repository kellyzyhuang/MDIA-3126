export default function Card({ art }) {
  return (
    <article className="card">
      <img src={art.primaryImage} alt={art.title} className="image" />
      <h3>{art.title}</h3>
      <p>Year: {art.objectDate}</p>
      <p>Artist: {art.artistDisplayName}</p>
    </article>
  );
}