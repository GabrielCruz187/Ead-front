import HeaderGeneric from "@/components/common/headerGeneric/HeaderGeneric";
import RegisterForm from "@/components/common/registerForm/RegisterForm";
import Footer from "@/components/homeNoAuth/Footer/Footer";
import { Metadata } from "next";
import { Container } from "reactstrap";
import styles from './styles.module.scss'


 export const metadata: Metadata = {
   title: "Onebitflix - Registro",
   icons: "./favicon.svg",
 };

export default function Register() {
  return (
    <>
      <main className={styles.main}>
        <HeaderGeneric logoUrl="/" btnUrl="/login" btnContent="Quero fazer login" />
        <Container className="py-5">
          <RegisterForm />
        </Container>
        <Footer />
      </main>
    </>
  );
}
