import logoLight from '../../assets/logo-light.svg';
import logoDark from '../../assets/logo-dark.svg';

import styles from './Logo.module.css';

export default function Logo({ height, width, dark }) {
  return (

    <div className={styles["logo"]} style={{ height: `${height}px`, width: `${width}px` }}>
        <img
          src={dark ? logoDark : logoLight}
          alt="logo"
          className={styles["logo-image"]}
        />
    </div>
  );
}