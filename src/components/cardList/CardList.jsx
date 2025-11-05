import Card from '../card/Card.jsx';
import styles from './CardList.module.css';

const CardList = ({ cards = [] }) => (
    <div className={styles.cardList}>
        {cards.map((item) => (
            <Card key={item.id} item={item} />
        ))}
    </div>
);

export default CardList;
