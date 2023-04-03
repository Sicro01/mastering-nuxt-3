<template>
  <div
    v-if="user"
    class="rounded p-3 flex items-center space-x-3 bg-white">
    <img
      class="rounded-full w-12 h-12 border-2 border-blue-400"
      :src="user.avatar_url" />
    <div class="text-right">
      <div class="font-medium">{{ user.full_name }}</div>
      <button
        @click="logout"
        class="text-sm underline text-slate-500">
        Log out
      </button>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();

console.log('here');
const user = ref(null);
onMounted(async () => {
  const { user: _user, error } = await getUser();
  console.log(_user.value, error.value);
  if (error.value) {
    console.log('Error getting user: ', error.value);
    await navigateTo('/login');
  }
  user.value = _user.value;
})

// const user = ref();
// onMounted(async () => {
//   try {
//     const { data, error } = await supabase.auth.getSession()
//     if (error) {
//       console.log('Supabase getSession', error);
//       await navigateTo('/login');
//     };
//     user.value = data.session?.user.user_metadata;
//   }
//   catch (err) {
//     console.log('Unknown error getting user', err);
//     await navigateTo('/login');
//   }
// })

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    return;
  }

  try {
    await $fetch('/api/_supabase/session', {
      method: 'POST',
      body: { event: 'SIGNED_OUT', session: null },
    });
    user.value = null;
  } catch (e) {
    console.error(error);
  }

  await navigateTo('/login');
}
</script>
