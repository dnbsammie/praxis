<script lang="ts">
   import { currentYear } from "$lib/types/time";
</script>

<footer class="rs_footer" id="rs_footer">
    <div class="footer_top">

    </div>
    <div class="footer_title">
        <h1>Footer</h1>
    </div>
    <div class="footer_bottom">
        <small>{currentYear}</small>
        <small>praxis</small>
    </div>
</footer>

<style>
    #rs_footer {
        display: flex;
        flex-direction: column;
        align-items: center;
		justify-content: space-between;
		position: relative;
		bottom: 0;
		width: 100%;
		height: 80svh;
		overflow: hidden;
        z-index: 1;
        background: var(--neutral-t00);
        color: var(--neutral-t03);
    }

    .footer_top,
    .footer_title,
    .footer_bottom {
        display: flex;
        width: 100%;
        max-width: var(--max-width-xl);
        padding: var(--space-sm);
    }
</style>