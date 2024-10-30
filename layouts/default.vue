<template xmlns="">
  <div class="main-wrap">
    <Header />
    <div class="container-fluid content-wrap">
      <main class="">
        <div class="">
          <slot />
        </div>
      </main>
      <aside></aside>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/base/Header.vue";
import Footer from "../components/base/Footer.vue";
export default {
  name: "default",
  components: { Footer, Header },
};
</script>

<style scoped></style>
