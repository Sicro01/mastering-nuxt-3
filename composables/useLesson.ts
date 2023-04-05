import { LessonWithPath } from "~/types/course";

export default async (
  chapterSlug: string,
  lessonSlug: string
) =>
  // use session storage to cache lesson data
  useFetchWithCache<LessonWithPath>(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  );

