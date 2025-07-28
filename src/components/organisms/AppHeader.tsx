import Link from 'next/link';
import styles from './AppHeader.module.css';

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/otherapp" className={styles.link}>他社アプリ</Link>
        <span className={styles.separator}>|</span>
        <Link href="/myapp" className={styles.link}>自社アプリ</Link>
      </nav>
    </header>
  );
} 