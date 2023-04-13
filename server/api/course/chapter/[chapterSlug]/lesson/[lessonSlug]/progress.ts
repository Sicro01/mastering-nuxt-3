import { H3Event } from 'h3';
import { PrismaClient } from "@prisma/client";
import protectRoute from "~/server/utils/protectRoute";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  assertMethod(event, ['PUT', 'PATCH', 'POST']);

  // throw 404 if no user
  protectRoute(event);

  // get route params
  const { chapterSlug, lessonSlug } = event.context.params;

  // get lesson from db
  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      Chapter: {
        slug: chapterSlug,
      },
    },
  });

  if (!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Lesson not found'
    })
  }

  // Get the completed value from the request body and update progress in DB
  // Select based on the chapter and lesson slugs
  const { completed } = await readBody(event);
  // Get user email from the supabase user if there is one.
  const {
    user: { email: userEmail },
  } = event.context;
  return prisma.lessonProgress.upsert({
    where: {
      lessonId_userEmail: {
        lessonId: lesson.id,
        userEmail,
      },
    },
    update: {
      completed,
    },
    create: {
      completed,
      userEmail,
      Lesson: {
        connect: {
          id: lesson.id,
        },
      },
    },
  });
});