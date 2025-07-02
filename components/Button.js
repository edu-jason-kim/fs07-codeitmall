import styles from './Button.module.css';

export default function Button({ className = '', as, ...props }) {
  const styles = {}

  return <button className={`${styles.button} ${className}`} {...props} />;
}
