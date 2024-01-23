import HeaderAuth from "@/components/HomeAuthComponents/headerAuth/HeaderAuth";
import SearchComponents from "@/components/SearchComponents/SearchComponents";
import courseService, { CourseType } from "@/services/courseService";
import { Metadata } from "next";

export const generateMetadata = async ({ searchParams }: { searchParams: { name: string } }): Promise<Metadata> => {
  return {
    title: `Onebitflix - "${searchParams.name}"`,
  };
};

export default async function Search({ searchParams }: { searchParams: { name: string } }) {

  return (
    <>
      <main>
        <SearchComponents searchParams={searchParams} />
      </main>
    </>
  );
}
