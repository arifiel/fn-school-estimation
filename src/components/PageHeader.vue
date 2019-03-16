<template>
    <div class="header">
        <img class="header__logo" alt="Estimation tool logo" src="../assets/epsilon.png">
        <div>Estimation tool</div>
    </div>
</template>

<script>
export default {
  name: 'PageHeader'/*,
    props: {
        username: String
    }*/
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    display: flex;
    height: 40px;
    position: fixed;
    top: 0;
}
.header__logo {
    object-fit: contain;
    flex-grow: 0;
    width: 40px;
}
</style>