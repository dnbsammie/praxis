<script lang="ts">
</script>

<header class="site-header">
  <div id="header_container">
    <a href="/" rel="external" id="logo-anchor"> PRAXIS </a>
    <nav class="header-nav">
      <li class="header-links">WORKSPACES</li>
      <li class="header-links">DOCS</li>
      <li class="header-links">LOGIN</li>
    </nav>
  </div>
</header>

<style>
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 5rem;
    color: var(--tone-t09);
    z-index: 5000;
    padding: var(--space-sm);
  }

  #header_container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: var(--space-xs);
    width: 100%;
    max-width: var(--max-width-xl);
    border: 1px solid var(--tone-t08);
    border-radius: 5px;
    padding: var(--space-xxs);
  }

  .header-nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: var(--space-xs);
  }
</style>
