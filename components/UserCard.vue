<template>
  <div
    v-if="user"
    class="rounded p-3 flex items-center space-x-3 bg-white">
    <img
      class="rounded-full w-12 h-12 border-2 border-blue-400"
      :src="user.avatar_url" />
    <div class="text-right">
      <div class="font-medium">{{ user.full_name }}</div>
      <button class="text-sm underline text-slate-500">
        Log out
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();

const user = ref();
onMounted(async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.log('Supabase getSession', error);
      navigateTo('/login');
    };
    user.value = data.session?.user.user_metadata;
  }
  catch (err) {
    console.log('Unknown error getting user', err);
    navigateTo('/login');
  }
})


</script>
