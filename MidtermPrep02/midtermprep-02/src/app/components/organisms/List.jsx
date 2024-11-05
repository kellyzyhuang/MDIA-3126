import Card from '../molecules/Card'; 
import styles from './List.module.css'; 

export default function List({ items }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <Card key={item.objectID} item={item} />
      ))}
    </div>
  )
}