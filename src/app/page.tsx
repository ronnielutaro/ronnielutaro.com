import Image from "next/image";
import styles from "./page.module.css";

export default function Maintenance() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image
          src="/logo.svg"
          alt="Site Logo"
          width={100}
          height={100}
        />
        <h1>ronnielutaro.com</h1>
      </header>
      <main className={styles.main}>
        <h2>We're currently under maintenance</h2>
        <p>Please check back soon!</p>
      </main>
      <footer className={styles.footer}>
        <p>Contact us: <a href="mailto:ronnielutaro@gmail.com">ronnielutaro@gmail.com</a></p>
        <p>Follow us on <a href="https://x.com/theronnielutaro" target="_blank" rel="noopener noreferrer">Twitter</a></p>
      </footer>
    </div>
  );
}
