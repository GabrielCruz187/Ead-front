import { Card, CardText, CardTitle, Container } from "reactstrap";
import styles from "./styles.module.scss";

export default function CardsSection() {
    return (
      <>
        <p className={styles.sectionTitle}>O QUE VOCÊ VAI ACESSAR</p>

        <Container className="d-flex flex-wrap justify-content-center gap-4 pb-5">
          <Card className={` ${styles.card1}`}>
            <CardTitle className={styles.cardTitle}>FRONT-END</CardTitle>
            <CardText className={styles.cardDescription}>
              O Onebitcode Black é o lugar para você evoluir. Para isso, você vai ter acesso às práticas avançadas de programação, atualizações de
              tecnologias e todo o suporte técnico necessário para ser um sênior na programação.
            </CardText>
          </Card>
          <Card className={` ${styles.card2}`}>
            <CardTitle className={styles.cardTitle}>BACK-END</CardTitle>
            <CardText className={styles.cardDescription}>
              O Onebitcode Black é o lugar para você evoluir. Para isso, você vai ter acesso às práticas avançadas de programação, atualizações de
              tecnologias e todo o suporte técnico necessário para ser um sênior na programação.
            </CardText>
          </Card>
          <Card className={` ${styles.card3}`}>
            <CardTitle className={styles.cardTitle}>MOBILE</CardTitle>
            <CardText className={styles.cardDescription}>
              O Onebitcode Black é o lugar para você evoluir. Para isso, você vai ter acesso às práticas avançadas de programação, atualizações de
              tecnologias e todo o suporte técnico necessário para ser um sênior na programação.
            </CardText>
          </Card>
          <Card className={` ${styles.card4}`}>
            <CardTitle className={styles.cardTitle}>GIT E GITHUB</CardTitle>
            <CardText className={styles.cardDescription}>
              O Onebitcode Black é o lugar para você evoluir. Para isso, você vai ter acesso às práticas avançadas de programação, atualizações de
              tecnologias e todo o suporte técnico necessário para ser um sênior na programação.
            </CardText>
          </Card>
          <Card className={` ${styles.card5}`}>
            <CardTitle className={styles.cardTitle}>PROJETOS</CardTitle>
            <CardText className={styles.cardDescription}>
              O Onebitcode Black é o lugar para você evoluir. Para isso, você vai ter acesso às práticas avançadas de programação, atualizações de
              tecnologias e todo o suporte técnico necessário para ser um sênior na programação.
            </CardText>
          </Card>
          <Card className={` ${styles.card6}`}>
            <CardTitle className={styles.cardTitle}>CARREIRA</CardTitle>
            <CardText className={styles.cardDescription}>
              O Onebitcode Black é o lugar para você evoluir. Para isso, você vai ter acesso às práticas avançadas de programação, atualizações de
              tecnologias e todo o suporte técnico necessário para ser um sênior na programação.
            </CardText>
          </Card>
        </Container>
      </>
    );
}
