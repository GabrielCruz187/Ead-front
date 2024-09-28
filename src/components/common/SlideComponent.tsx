import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { CourseType } from "@/services/courseService";
import SlideCard from "./slideCard/SlideCard";

interface Props {
  course: CourseType[] | null | undefined; // Permite que course seja array, null ou undefined
}

export default function SlideComponent({ course }: Props) {
  let slideCount = 0;

  // Verifica se course é um array e tem mais de 4 itens
  if (Array.isArray(course) && course.length > 4) {
    slideCount = 4;
  } else if (Array.isArray(course)) {
    slideCount = course.length;
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center py-4">
        <Splide
          options={{
            type: "loop",
            perPage: slideCount,
            perMove: 1,
            width: slideCount * 300,
            pagination: false,
            arrows: Array.isArray(course) && course.length > 4,
            drag: Array.isArray(course) && course.length > 4,
            breakpoints: {
              1200: {
                perPage: slideCount >= 2 ? 2 : 1,
                width: slideCount >= 2 ? 640 : 300,
                arrows: Array.isArray(course) && course.length > 2,
                drag: Array.isArray(course) && course.length > 2,
              },
              640: {
                perPage: 300,
                width: 1,
                arrows: Array.isArray(course) && course.length > 1,
                drag: Array.isArray(course) && course.length > 1,
              },
              300: {
                width: 250,
              },
            },
          }}
        >
          {/* Verifica se course é um array antes de usar o map */}
          {Array.isArray(course) &&
            course.map((courseItem) => (
              <SplideSlide key={courseItem.id}>
                <SlideCard course={courseItem} />
              </SplideSlide>
            ))}
        </Splide>
      </div>
    </>
  );
}
