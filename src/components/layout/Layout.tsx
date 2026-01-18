import { PropsWithChildren } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import styles from './Layout.module.css';

interface ILayoutProps extends PropsWithChildren {}

const Layout = ({ children }: ILayoutProps) => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.mainContent}>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
