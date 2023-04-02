<template>
  <div
    v-if="user"
    class="rounded p-3 flex items-center space-x-3 bg-white">
    <img
      class="rounded-full w-12 h-12 border-2 border-blue-400"
      :src="profile" />
    <div class="text-right">
      <div class="font-medium">{{ name }}</div>
      <button class="text-sm underline text-slate-500">
        Log out
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const supabaseClient = useSupabaseClient();
console.log('here 1');
if (user) {
  // console.log(user?.value.user_metadata);
}

supabaseClient.auth.onAuthStateChange((_, _session) => {
  console.log('hi');

  if (_session?.access_token) {
    console.log('hi', _session);
    const accessToken = useCookie('sb-access-token')
    const refreshToken = useCookie('sb-refresh-token')
    accessToken.value = _session?.access_token ?? null
    refreshToken.value = _session?.refresh_token ?? null
  }
})

watch(user, (_user) => {
  console.log('_user', _user);
})

const name = computed(
  () => {
    console.log('here 2');
    console.log(user?.value.user_metadata);
    return user?.value.user_metadata.full_name
  }
);
const profile = computed(
  () => user?.value.user_metadata.avatar_url
);
</script>
