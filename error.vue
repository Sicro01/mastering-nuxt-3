<template>
  <NuxtLayout>
    <div class="prose">
      <h1>Dang</h1>
      <p>It looks like something broke.</p>
      <p>Sorry about that.</p>
      <p><strong>{{ error.message }}</strong></p>
    </div>
  </NuxtLayout>
</template>

<script setup>
const error = useError();
</script>