"use client";
import courseService, { CourseType } from "@/services/courseService";
import HeaderAuth from "../HomeAuthComponents/headerAuth/HeaderAuth";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import SearchCard from "./searchCard/SearchCard";
import Footer from "../HomeNoAuthComponents/Footer/Footer";

export default function SearchComponents({ searchParams }: { searchParams: { name: string } }) {
  const [searchResult, setSearchResult] = useState<CourseType[]>([]);

  const searchName = searchParams.name;
  console.log(searchName)
  const searchCourses = async function () {
    if (typeof searchName === "string") {
      const res = await courseService.getSearch(searchName);
      setSearchResult(res.data.courses);
    }
  };
  useEffect(() => {
    searchCourses();
  }, [searchName]);
  return (
    <>
      <HeaderAuth />
      <main>
        <section className={styles.mainContent}>
          {searchResult.length >= 1 ? (
            <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
              {searchResult?.map((course) => (
                <SearchCard key={course.id} course={course} />
              ))}
            </Container>
          ) : (
            <p className={styles.noSearchText}>Nenhum resultado encontrado!</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
