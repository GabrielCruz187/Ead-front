import { Metadata } from "next";
import styles from "./styles.module.scss";
import HeaderGeneric from "@/components/common/headerGeneric/HeaderGeneric";
import { Container } from "reactstrap";
import Footer from "@/components/HomeNoAuthComponents/Footer/Footer";
import LoginForm from "@/components/LoginFormComponents/LoginForm";

export const metadata: Metadata = {
  title: "Onebitflix - Login",
  icons: "./favicon.svg",
};

export default function Login() {
  return (
    <>
      <main className={styles.main}>
        <HeaderGeneric logoUrl="/" btnUrl="/register" btnContent="Quero me cadastrar" />
        <Container className="py-5">
          <LoginForm />
        </Container>
        <Footer />
      </main>
    </>
  );
}
