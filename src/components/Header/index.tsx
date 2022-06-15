import styles from './Header.module.css';
import logo from '../../assets/logo-todo.svg';
export function Header() {
  return (
    <div className={styles.header}>
      <img src={logo} alt="Imagem de um foguete na cor azul" />
    </div>
  )
}