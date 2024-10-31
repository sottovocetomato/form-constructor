<template xmlns="">
  <div class="page-wrap">
    <Header />
    <div class="container-fluid content-wrap">
      <main class="">
        <div class="main-section-wrap">
          <slot />
        </div>
      </main>
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
