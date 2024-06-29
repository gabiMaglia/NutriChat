import styles from './button.module.css'

// eslint-disable-next-line react/prop-types
const Button = ({action, name}) => {
    return ( 
 
    <button className={styles.button} onClick={action} >{name}</button>
  
    );
}
 
export default Button;