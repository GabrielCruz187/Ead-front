import { FormEvent } from "react";

export const handleRegister = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const firstName = formData.get("firstName")?.toString() ?? "";
  const lastName = formData.get("lastName")?.toString() ?? "";
  const phone = formData.get("phone")?.toString() ?? "";
  const birth = formData.get("birth")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";

  return { firstName, lastName, phone, birth, email, password, confirmPassword };
};
