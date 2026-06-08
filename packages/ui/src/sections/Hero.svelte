<script lang="ts">
</script>

<section class="hero" id="hero">
    <div id="section_container">
        <div class="section-border" id="hero_left">
            <h1>Master Programming</h1>
            <h3>Your Way</h3>
            <p>A phase-based learning platform that adapts to your experience. Learn by doing with real projects, live coding environments, and a skill tree that grows with you.</p>
            <div class="hero-cta">
                <a class="cta-button" href="https://github.com/dnbsammie/praxis">GET_STARTED/</a>
                <a class="cta-button" href="https://github.com/dnbsammie/praxis" target="_blank">READ_DOCS/</a>
            </div>
        </div>
        <div class="section-border" id="hero_right">
            <span id="outline_text">P</span>
            <span id="outline_text">R</span>
            <span id="outline_text">A</span>
            <span id="outline_text">X</span>
            <span id="outline_text">I</span>
            <span id="outline_text">S</span>
        </div>

    </div>

</section>

<style>
    .hero #section_container {
        display: flex;
        flex-direction: row;
        padding: 5rem var(--space-sm) var(--space-sm);
    }
    
    #hero_left {
        flex: 2;
        justify-content: center;
    }

    #hero_right {
        flex: 1;
        
        align-items: center;
        justify-content: center;
    }

    #hero_left h3 {
        color: var(--tone-t05);
    }

    .hero-cta {
        display: flex;
        flex-direction: row;
        gap: var(--space-xs);
    }

</style>