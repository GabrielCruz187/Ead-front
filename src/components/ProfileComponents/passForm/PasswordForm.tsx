"use client";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "./styles.module.scss";
import { FormEvent, useEffect, useState } from "react";
import profileService from "@/services/profileService";
import ToastComponent from "@/components/common/toastComponent/ToastComponent";
import { useRouter } from "next/navigation";

export default function PasswordForm() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    profileService.fetchCurrentUser().then((password) => {
      setCurrentPassword(password.data.currentUser.currentPassword);
      setNewPassword(password.data.currentUser.newPassword);
    });
  }, []);

  const handlePasswordUpdate = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newPassword != confirmPassword) {
      setToastIsOpen(true);
      setErrorMessage("Senha e confirmação de senha diferentes!");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);

      return;
    }
    if (currentPassword === newPassword) {
      setToastIsOpen(true);
      setErrorMessage("Não coloque a nova senha igual a senha antiga!");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);

      return;
    }
    const { status } = await profileService.passwordUpdate({
      currentPassword,
      newPassword,
    });
    if (status === 204) {
      setToastIsOpen(true);
      setErrorMessage("Senha alterada com sucesso!");
      setColor("bg-success");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
      if (currentPassword != newPassword) {
        sessionStorage.clear();
        router.push("/");
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    if (status === 400) {
      setToastIsOpen(true);
      setErrorMessage("Senha atual incorreta!");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    }
  };

  return (
    <>
      <Form className={styles.form} onSubmit={(event) => handlePasswordUpdate(event)}>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} for="currentPassword">
              SENHA ATUAL
            </Label>
            <Input
              name="currentPassword"
              type="password"
              id="currentPassword"
              placeholder="******"
              required
              maxLength={12}
              value={currentPassword}
              onChange={(event) => {
                setCurrentPassword(event.currentTarget.value);
              }}
              className={styles.input}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="newPassword">
              NOVA SENHA
            </Label>
            <Input
              name="newPassword"
              type="password"
              id="newPassword"
              placeholder="******"
              required
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.currentTarget.value);
              }}
              className={styles.inputFlex}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="confirmNewPassword">
              CONFIRMAR NOVA SENHA
            </Label>
            <Input
              name="confirmNewPassword"
              type="password"
              id="confirmNewPassword"
              placeholder="******"
              required
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.currentTarget.value);
              }}
              className={styles.inputFlex}
            />
          </FormGroup>
          <Button type="submit" className={styles.formBtn} outline>
            Salvar Alterações
          </Button>
        </div>
      </Form>
      <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage} />
    </>
  );
}
