import { StorageSerializers } from "@vueuse/core";

export default async <T>(url: string) => {
  // use session storage to cache lesson data
  const cached = useSessionStorage<T>(url, null, {
    serializer: StorageSerializers.object,
  });

  if (!cached.value) {
    const { data, error } = await useFetch<T>(url);

    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch data from ${url}`
      });
    };

    cached.value = data.value as T;
  } else {
    console.log(`Getting data from cache for ${url}`);

  }

  return cached;
}