import { Navbar, Button } from "reactstrap";
import Link from "next/link";
import styles from "./styles.module.scss";

export default function HeaderNoAuth() {
  return (
    <>
      <div className={styles.ctaSection}>
        <img src="/homeNoAuth/logoCta.png" alt="logoCta" className={styles.imgCta} />
        <p>Se cadastre para ter acesso aos cursos</p>
        <img src="/homeNoAuth/logoCta.png" alt="logoCta" className={styles.imgCta} />
      </div>
      <Navbar>
        <div className={`container ${styles.nav}`}>
          <Link href="/">
            <img src="/logoOnebitflix.svg" alt="logoOnebitflix" className={styles.imgLogoNav} />
          </Link>
          <div>
            <Link href="/login">
              <Button className={styles.navBtn} outline>
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button className={styles.navBtn} outline>
                Quero fazer parte
              </Button>
            </Link>
          </div>
        </div>
      </Navbar>
    </>
  );
}
