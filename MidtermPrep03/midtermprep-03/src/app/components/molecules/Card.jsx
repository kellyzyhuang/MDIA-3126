export default function Card({ art }) {
  return (
    <article className="card">
      {art.primaryImage ? (
        <img src={art.primaryImage} alt={art.title || "Artwork"} className="art-image" />
      ) : (
        <div className="no-image">No Image Available</div>
      )}
      <h3>{art.title || "Untitled"}</h3>
      <p>Year: {art.objectDate || "Unknown"}</p>
      <p>Artist: {art.artistDisplayName || "Unknown Artist"}</p>
    </article>
  );
}