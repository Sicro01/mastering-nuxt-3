import { CourseProgress } from '@/types/course';
// import { CourseProgress } from './../../../types/course';
import { LessonProgress, PrismaClient } from "@prisma/client";
import protectRoute from "~/server/utils/protectRoute";

import { ChapterOutline, LessonOutline } from "@/server/api/course/meta.get";
// import { CourseProgress, ChapterProgress } from "~/types/course";


const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

  // throw 404 is no user logged in
  protectRoute(event)

  // get user email if there is one
  const { user: { email: userEmail }, } = event.context;

  // get progress from db
  const userProgress = await prisma.lessonProgress.findMany(
    {
      where: {
        userEmail,
        Lesson: {
          Chapter: {
            Course: {
              id: 1,
            },
          },
        },
      },
      select: {
        completed: true,
        Lesson: {
          select: {
            slug: true,
            Chapter: {
              select: {
                slug: true,
              },
            },
          },
        },
      },
    }
  );

  const courseOutline = await $fetch('/api/course/meta');

  if (!courseOutline) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Course outline not found'
    });
  }

  const progress = courseOutline.chapters.reduce(
    (
      courseProgress: CourseProgress,
      chapter: ChapterOutline
    ) => {
      courseProgress[chapter.slug] = chapter.lessons.reduce((
        chapterProgress: ChapterProgress,
        lesson: LessonOutline
      ) => {
        chapterProgress[lesson.slug] =
          userProgress.find(
            (progress) =>
              progress.Lesson.slug === lesson.slug &&
              progress.Lesson.Chapter.slug ===
              chapter.slug
          )?.completed || false;
        return chapterProgress;
      },
        {}
      );
      return courseProgress;
    },
    {}
  );

  return progress;
})



// const progress = courseOutline.chapters.reduce(
//   (
//     courseProgress: CourseProgress,
//     chapter: ChapterOutline
//   ) => {
//     courseProgress[chapter.slug] = chapter.lessons.reduce(
//       (
//         chapterProgress: ChapterProgress,
//         lesson: LessonOutline
//       ) => {
//         chapterProgress[lesson.slug] =
//           userProgress.find(
//             (progress) =>
//               progress.Lesson.slug === lesson.slug &&
//               progress.Lesson.Chapter.slug ===
//               chapter.slug
//           )?.completed || false;

//         return chapterProgress;
//       },
//       {}
//     );
//   }
// );