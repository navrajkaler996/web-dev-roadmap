import React from "react";
import { useGetCoursesQuery } from "../services/course-services";

const useFetchCourses = () => {
  const { data, isLoading, isError, error } = useGetCoursesQuery();

  function fetchCourses() {
    return { data };
  }

  return fetchCourses;
};

export default useFetchCourses;
