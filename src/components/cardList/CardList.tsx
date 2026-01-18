import Card from '../card/Card';
import { MealItem } from '../../types/types';
import styles from './CardList.module.css';

interface CardListProps {
    cards?: MealItem[];
}

const CardList = ({ cards = [] }: CardListProps) => (
    <div className={styles.cardList}>
        {cards.map((item) => (
            <Card key={item.id} item={item} />
        ))}
    </div>
);

export default CardList;
