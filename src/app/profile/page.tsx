'use client'
import styles from './styles.module.scss'
import UserForm from "@/components/ProfileComponents/userForm/UseForm";
import { Button, Col, Container, Row } from "reactstrap";
import HeaderAuth from "@/components/HomeAuthComponents/headerAuth/HeaderAuth";
import Footer from "@/components/HomeNoAuthComponents/Footer/Footer";
import PasswordForm from "@/components/ProfileComponents/passForm/PasswordForm";
import { useState } from "react";



export default function UserInfo() {
  const [form, setForm] = useState("userForm");

  return (
    <>
      <div className={styles.header}>
        <HeaderAuth />
      </div>
      <main>
        <Container className="py-5">
          <p className={styles.title}>Minha Conta</p>
          <Row className="pt-3 pb-5">
            <Col md={4} className={styles.btnColumn}>
              <Button
                outline
                className={styles.renderFormBtn}
                style={{ color: form === "userForm" ? "#ff0044" : "white" }}
                onClick={() => {
                  setForm("userForm");
                }}>
                DADOS PESSOAIS
              </Button>
              <Button
                outline
                className={styles.renderFormBtn}
                style={{ color: form === "userForm" ? "#ff0044" : "white" }}
                onClick={() => {
                  setForm("passwordForm");
                }}>
                SENHA
              </Button>
            </Col>
            <Col md>{form === "userForm" ? <UserForm /> : <PasswordForm />}</Col>
          </Row>
        </Container>
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  );
}