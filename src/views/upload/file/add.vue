<template>
  <brand-detail :is-edit='false'></brand-detail>
</template>
<script>
  import BrandDetail from './components/UserFileDetail'
  export default {
    name: 'addBrand',
    components: { BrandDetail }
  }
</script>
<style>
</style>


