import { Container, Button } from "reactstrap";
import styles from "./styles.module.scss";


const HeaderNoAuth = function () {
  return (
    <>
        <div className={styles.ctaSection}>
		<img src="/homeNotAuth/logoCta.png" alt="logoCta" className={styles.imgCta}/>
    <p>Se cadastre para ter acesso aos cursos</p>
    <img src="public/homeNotAuth/logoCta.png" alt="logoCta" className={styles.imgCta}/>
	</div>
    <Container className={styles.nav}>
			<img src="/logoOnebitflix.svg" alt="logoOnebitflix" className={styles.imgLogoNav}/>
			<div>
				<Button className={styles.navBtn} outline>Entrar</Button>
				<Button className={styles.navBtn} outline>Quero fazer parte</Button>
			</div>
		</Container>
        </>
          )
};


	

export default HeaderNoAuth;