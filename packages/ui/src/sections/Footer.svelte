<script lang="ts">
</script>

<footer class="footer" id="footer" aria-label="Site Footer">
  <div class="f-container">
    <div class="f-content">
      <!-- Content -->
      <div class="f-inner">
        <div class="f_column">
          <h1>Ready to Start Learning?</h1>
          <p>Join thousands of developers mastering their craft with Praxis</p>
        </div>
      </div>
      <!-- Logo -->
      <div class="f_title">
        <a
          href="https://github.com/dnbsammie/praxis"
          class="f-logo"
          id="outline_text"
          rel="noopener noreferrer"
        >
          <div>PRAXIS</div>
          <div>-</div>
          <div>SKILLS</div>
        </a>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    bottom: 0;
    width: 100%;
    height: 80svh;
    background-color: var(--tone-t05);
    color: var(--tone-t00);
    overflow: hidden;
    z-index: 1;
  }

  /* ── Containers ── */
  .f-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: var(--space-xl) var(--space-sm) 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    will-change: transform;
  }
  .f-content {
    position: relative;
    max-width: var(--max-width-xxl);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--space-lg);
    z-index: 1;
  }
  /* */
  .f-inner {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-md);
  }

  .f_column {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: auto;
    gap: var(--space-sm);
  }

  /* Little components*/
  .f-logo {
    color: hsl(from var(--gray-500) h s l / 0.5);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translateY(5%);
    z-index: 0;
  }
  .f-logo div {
    font-size: 12vw;
    font-weight: 400;
    line-height: 0.9;
  }

  .f-logo:hover {
    color: var(--accent-500);
  }
  .f-logo:hover div:nth-child(2) {
    animation: shake 0.5s ease-in-out;
  }

  @keyframes shake {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(-5px, 0);
    }
    50% {
      transform: translate(5px, 0);
    }
    75% {
      transform: translate(-5px, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  @media (min-width: 768px) {
    .f-inner {
      flex-direction: row;
    }
  }
  @media (min-width: 1920px) {
    .f-content {
      margin: 0 auto;
    }
  }
</style>
