import Image from "../atoms/Image"; 
import styles from "./Card.module.css"; 

export default function Card({ item }) {
  return (
    <div className={styles.card}>
      <Image src={item.primaryImage} alt={item.title || "Artwork"}/>
      <h2>{item.title || "Untitled"}</h2>
      <p>Date: {item.objectDate || "Unknown"}</p>
    </div>
  )
}