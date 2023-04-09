import { defineStore } from "pinia";

export const useCourseProgress = defineStore('courseProgress', () => {
  const progress = useLocalStorage('progress', {});

  const initialized = ref(false);

  async function initialize() {
    if (initialized.value) return;
    initialized.value = true;

    //TODO: Fetch user progress from endpoint
  }

  const toggleComplete = async (chapter: string, lesson: string) => {
    const user = useSupabaseUser();

    if (!user.value) return;

    // get current progress for the lesson
    const currentProgress = progress.value[chapter]?.[lesson];

    // optimistically update the progress value in th UI

  };

  return { initialize, progress };
});