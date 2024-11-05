import styles from './Image.module.css'; 

export default function Image({ src, alt }) {
  return src ? <img src={src} alt={alt || "Artwork"} className={styles.image}/> : <p>No Image Available</p>; 
}