export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();

  // const { user: myUser, error } = await getUser();

  if (
    user.value || to.params.chapterSlug === '1-chapter-1'
  ) {
    // console.log('auth user:', user.value);
    // console.log('auth myUser:', user.value);

    return;
  }
  // return navigateTo(`/login`);
  // console.log(`/login?redirectTo=${to.path}`);

  return await navigateTo(`/login?redirectTo=${to.path}`);

});
