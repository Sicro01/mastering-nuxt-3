<template>
  <div class="prose w-full max-w-2xl h-9">
    <h1>Log in to {{ title }}</h1>
    <button
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      @click="login">
      Log in with Github
    </button>
  </div>
</template>

<script setup lang="ts">
const { title } = useCourse();
const supabase = useSupabaseClient();

const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    console.log('firing 1');
  }
})

const login = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });

  if (error) {
    console.error(error);
  }
};

  // let { data } = await supabase.auth.getSession()

  // if (!data.session) {
  //   console.log('firing 2', data.session);

  //   const accessToken = useCookie('sb-access-token')
  //   const refreshToken = useCookie('sb-refresh-token')
  //   accessToken.value = _session?.access_token ?? null
  //   refreshToken.value = _session?.refresh_token ?? null
  // }

  // supabase.auth.onAuthStateChange((_, _session) => {
  //   console.log('firing');

  //   if (_session?.access_token) {
  //     const accessToken = useCookie('sb-access-token')
  //     const refreshToken = useCookie('sb-refresh-token')
  //     accessToken.value = _session?.access_token ?? null
  //     refreshToken.value = _session?.refresh_token ?? null
  //     useSupabaseUser().value = _session.user
  //   }
  // })


</script>
