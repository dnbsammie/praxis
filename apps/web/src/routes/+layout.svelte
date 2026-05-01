<script lang="ts">
    import { currentYear, Footer } from '@praxis/ui';
    import '@praxis/ui/styles/index.css';

    let { children } = $props();
</script>

<svelte:head>
  <title>Praxis | { currentYear }</title>
  <meta name="description" content="LMS" />
</svelte:head>

{@render children()}

<style>

</style>