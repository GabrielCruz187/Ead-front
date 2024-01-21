"use client";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "./styles.module.scss";
import { FormEvent, useEffect, useState } from "react";
import authService from "@/services/authService";
import ToastComponent from "../common/ToastComponent";
import { formData } from "@/services/formServices";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("onebitflix-token")) {
      router.push("/home");
    }
  }, []);

  const handlerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const params = formData(event);
    if (params.password != params.confirmPassword) {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage("Senha e confirmação diferentes.");
    }
    const { data, status } = await authService.register(params);

    if (status === 201) {
      router.push("/login?registered=true");
    } else {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);
      setToastMessage(data.message);
    }
  };
  return (
    <>
      <Form className={styles.form} onSubmit={(event) => handlerSubmit(event)}>
        <p className="text-center">
          <strong>Bem-vindo(a) ao OneBitFlix!</strong>
        </p>
        <FormGroup>
          <Label for="firstName" className={styles.label}>
            NOME
          </Label>
          <Input id="firstName" name="firstName" type="text" placeholder="Qual o seu nome?" required maxLength={20} className={styles.inputName} />
        </FormGroup>
        <FormGroup>
          <Label for="lastName" className={styles.label}>
            SOBRENOME
          </Label>
          <Input id="lastName" name="lastName" type="text" placeholder="Qual o seu sobrenome?" required maxLength={20} className={styles.inputName} />
        </FormGroup>
        <FormGroup>
          <Label for="phone" className={styles.label}>
            WHATSAPP / TELEGRAM
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(xx) 9xxxx-xxxx"
            data-mask="[-]+55 (00) 00000-0000"
            required
            className={styles.input}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email" className={styles.label}>
            E-MAIL
          </Label>
          <Input id="email" name="email" type="email" placeholder="Digite o seu email" required className={styles.input} />
        </FormGroup>
        <FormGroup>
          <Label for="birth" className={styles.label}>
            DATA DE NASCIMENTO
          </Label>
          <Input id="birth" name="birth" type="date" min="1930-01-01" max="2008-12-31" required className={styles.input} />
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
        <FormGroup>
          <Label for="confirmPassword" className={styles.label}>
            CONFIRME SUA SENHA
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirme a sua senha"
            required
            minLength={6}
            maxLength={20}
            className={styles.input}
          />
        </FormGroup>
        <Button type="submit" outline className={styles.formBtn}>
          CADASTRAR
        </Button>
      </Form>
      <ToastComponent color="bg-danger" isOpen={toastIsOpen} message={toastMessage} />
    </>
  );
}
