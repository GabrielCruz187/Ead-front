"use client";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "./styles.module.scss";
import { FormEvent, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { formData } from "@/services/formServices";
import authService from "@/services/authService";
import ToastComponent from "../common/toastComponent/ToastComponent";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handlerLogin = async (event: FormEvent<HTMLFormElement>) => {
    const { email, password } = formData(event);
    const { status } = await authService.login({ email, password });
    if (status === 200 || status === 201) {
      router.push("/home");
    } else {
      setToastColor("bg-danger");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 4000);
      setToastMessage("Email ou senha incorretos!");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("onebitflix-token")) {
      router.push("/home");
    }
  }, []);

  useEffect(() => {
    const registerSuccess = searchParams.get("registered");
    if (registerSuccess === "true") {
      setToastColor("bg-success");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 4000);
      setToastMessage("Cadastro feito com sucesso!");
    }
  }, [searchParams]);

  return (
    <>
      <Form className={styles.form} onSubmit={(event) => handlerLogin(event)}>
        <p className="text-center">
          <strong>Bem-vindo(a) ao OneBitFlix!</strong>
        </p>

        <FormGroup>
          <Label for="email" className={styles.label}>
            E-MAIL
          </Label>
          <Input id="email" name="email" type="email" placeholder="Digite o seu email" required className={styles.input} />
        </FormGroup>

        <FormGroup>
          <Label for="password" className={styles.label}>
            SENHA
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Digite a sua senha (Min: 6 | Max: 20)"
            required
            minLength={6}
            maxLength={20}
            className={styles.input}
          />
        </FormGroup>

        <Button type="submit" outline className={styles.formBtn}>
          ENTRAR
        </Button>
      </Form>
      <ToastComponent color={toastColor} isOpen={toastIsOpen} message={toastMessage} />
    </>
  );
}
