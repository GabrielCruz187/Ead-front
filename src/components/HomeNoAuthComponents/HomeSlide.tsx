import React, { useEffect, useState } from 'react'
import SlideSection from './SlideSection/SlideSection'
import courseService, { CourseType } from '@/services/courseService';


const HomeSlide = () => {
 const [newestCourse, setNewestCourses] = useState<CourseType[]>([]);


  const fetchCourses = async () => {
    const courses = await courseService.fetchNewestCourses();
    setNewestCourses(courses.data);
  };
  useEffect(() => {
    fetchCourses();
  }, [newestCourse]);

  return <SlideSection newestCourses={newestCourse} />;
}

export default HomeSlide