"use client";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "./styles.module.scss";
import { FormEvent, useEffect, useState } from "react";
import authService from "@/services/authService";
import ToastComponent from "../common/toastComponent/ToastComponent";
import { handleRegister } from "@/services/formServices";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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
      }, 1000 * 4);
      setToastMessage("Cadastro feito com sucesso!");
      console.log(toastMessage);
    }
  }, [searchParams]);

  const handlerLogin = async (event: FormEvent<HTMLFormElement>) => {
    const { email, password } = handleRegister(event);

    const { status } = await authService.login({ email, password });
    console.log(status);

    if (status === 200 || status === 201) {
      router.push("/home");
    } else {
      setToastColor("bg-danger");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage("Email ou senha incorretos!");
    }
  };
  return (
    <>
      <Form className={styles.form} onSubmit={(ev) => handlerLogin(ev)}>
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
