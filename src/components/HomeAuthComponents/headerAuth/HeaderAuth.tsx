"use client";
import { Container, Form, Input } from "reactstrap";
import styles from "./styles.module.scss";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import profileService from "@/services/profileService";

export default function HeaderAuth() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const [initials, setInitials] = useState("");

  const [searchName, setSearchName] = useState("");

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  router.push(`/search?name=${searchName}`);
  setSearchName("");
};

  const handleSearchClick = () => {
    router.push(`/search?name=${searchName}`);
    setSearchName("");
  };

  useEffect(() => {
    profileService.fetchCurrentUser().then((user)=>{
      const firstNameInitial = user.data.currentUser.firstName.slice(0, 1);
      const lastNameInitial = user.data.currentUser.lastName.slice(0, 1);
      setInitials(firstNameInitial + lastNameInitial);
    });
  }, []);

  return (
    <>
      <Container className={styles.nav}>
        <Link href="/home">
          <img src="/logoOnebitflix.svg" alt="logoOnebitflix" className={styles.imgLogoNav} />
        </Link>
        <div className="d-flex align-items-center">
          <Form onSubmit={handleSearch}>
            <Input
              name="search"
              type="search"
              placeholder="Pesquisar"
              className={styles.input}
              value={searchName}
              onChange={(event) => {
                setSearchName(event.currentTarget.value.toLowerCase());
              }}
            />
          </Form>
          <img src="/homeAuth/iconSearch.svg" alt="lupaHeader" className={styles.searchImg} onClick={handleSearchClick} />
          <p className={styles.userProfile} onClick={handleOpenModal}>
            {initials}
          </p>
        </div>
      </Container>
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        ariaHideApp={false}
        shouldCloseOnEsc={true}
        className={styles.modal}
        overlayClassName={styles.overlayModal}>
        <Link href="/profile">
          <p className={styles.modalLink}>Meus Dados</p>
        </Link>
        <p className={styles.modalLink} onClick={handleLogout}>
          Sair
        </p>
      </Modal>
    </>
  );
}
