<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let { class: className = '' } = $props();
	let playing = $state(true);

	onMount(() => {
		// Play animation for 1.8s, then pause for 5s (total 6.8s cycle)
		const interval = setInterval(() => {
			playing = false;
			// A tiny delay to let the DOM remove the class so the animation can restart
			setTimeout(() => {
				playing = true;
			}, 50);
		}, 6800);

		return () => clearInterval(interval);
	});
</script>

<div class={`gs-logo-anim ${className}`} class:playing aria-label="GardenSuite Logo">
	<svg viewBox="380 130 300 300" preserveAspectRatio="xMidYMid meet" class="loader-svg" aria-hidden="true">
		<defs>
			<linearGradient id="gs-grad1a" x1="0%" y1="100%" x2="0%" y2="0%">
				<stop offset="0%" stop-color="#234b1d" />
				<stop offset="100%" stop-color="#4f703b" />
			</linearGradient>
			<linearGradient id="gs-grad1b" x1="0%" y1="100%" x2="0%" y2="0%">
				<stop offset="0%" stop-color="#234b1d" />
				<stop offset="100%" stop-color="#4f703b" />
			</linearGradient>
			<linearGradient id="gs-grad2a" x1="0%" y1="100%" x2="0%" y2="0%">
				<stop offset="0%" stop-color="#385e30" />
				<stop offset="100%" stop-color="#719456" />
			</linearGradient>
			<linearGradient id="gs-grad2b" x1="0%" y1="100%" x2="0%" y2="0%">
				<stop offset="0%" stop-color="#385e30" />
				<stop offset="100%" stop-color="#719456" />
			</linearGradient>
			<linearGradient id="gs-grad3a" x1="0%" y1="100%" x2="0%" y2="0%">
				<stop offset="0%" stop-color="#5f7d48" />
				<stop offset="100%" stop-color="#a3b986" />
			</linearGradient>
			<linearGradient id="gs-grad3b" x1="0%" y1="100%" x2="0%" y2="0%">
				<stop offset="0%" stop-color="#5f7d48" />
				<stop offset="100%" stop-color="#a3b986" />
			</linearGradient>
			<linearGradient id="gs-grad4a" x1="0%" y1="100%" x2="0%" y2="0%">
				<stop offset="0%" stop-color="#97b07c" />
				<stop offset="100%" stop-color="#a8bc8e" />
			</linearGradient>
			<linearGradient id="gs-grad4b" x1="0%" y1="100%" x2="0%" y2="0%">
				<stop offset="0%" stop-color="#97b07c" />
				<stop offset="100%" stop-color="#a8bc8e" />
			</linearGradient>
			<linearGradient id="gs-grad5" x1="0%" y1="100%" x2="0%" y2="0%">
				<stop offset="0%" stop-color="#2f512a" />
				<stop offset="100%" stop-color="#254b1f" />
			</linearGradient>
		</defs>

		<g class="gs-group gs-group-5">
			<!-- Path 5: stem square -->
			<rect x="393" y="382" width="38" height="38" rx="4" fill="url(#gs-grad5)" stroke="none" />
		</g>
		<g class="gs-group gs-group-1">
			<!-- Path 1a: bottom sweep -->
			<path fill="url(#gs-grad1a)" stroke="none" d="M556.952576,339.839417 C569.149292,341.912811 580.909729,343.933838 592.583191,345.939941 C592.794006,348.747925 590.820862,349.119934 589.504395,349.855011 C561.688538,365.386230 532.075745,374.358734 499.990143,374.289307 C482.831207,374.252197 465.672089,374.313293 448.513214,374.261597 C446.609283,374.255859 444.530762,374.860992 442.789062,373.421387 C442.432770,371.309174 444.126160,370.441406 445.218414,369.330353 C457.595917,356.739563 470.056213,344.229889 482.385101,331.591949 C484.619965,329.301025 486.805969,328.813385 489.949860,329.325714 C512.118225,332.938507 534.323120,336.326996 556.952576,339.839417 z"/>
			<!-- Path 1b: left tall strip -->
			<path fill="url(#gs-grad1b)" stroke="none" d="M465.913452,337.913055 C455.956512,347.868683 446.249634,357.574341 436.565521,367.257263 C434.136841,365.199005 434.752869,363.236145 434.750153,361.516205 C434.719971,342.356354 434.364258,323.185974 434.870453,304.038879 C435.668762,273.842468 444.395355,245.753860 458.950623,219.400665 C459.493927,218.417007 460.308533,217.583221 461.235596,216.365860 C463.846771,219.643234 463.592133,223.439117 464.148529,226.833252 C469.204041,257.674103 474.042938,288.550446 479.029663,319.402740 C479.555908,322.658478 478.951569,325.158051 476.440796,327.445984 C472.873627,330.696564 469.576202,334.243073 465.913452,337.913055 z"/>
		</g>
		<g class="gs-group gs-group-2">
			<!-- Path 2a: mid-right center -->
			<path fill="url(#gs-grad2a)" stroke="none" d="M569.849365,335.306793 C544.018738,331.184540 518.621460,327.097290 493.446136,323.045746 C492.561493,320.425964 494.360565,319.544464 495.429993,318.457428 C508.268799,305.407471 521.169983,292.418915 534.026489,279.386292 C535.657043,277.733368 537.543701,277.006195 539.834045,277.005432 C574.459351,276.993774 609.084656,276.960907 643.709961,276.946289 C644.694092,276.945892 645.724304,276.941010 646.748535,278.085724 C646.784790,281.676361 644.420654,284.639191 642.716492,287.713776 C632.823364,305.563232 620.286804,321.505676 606.953918,336.874969 C604.371765,339.851501 601.747437,340.729462 597.804321,339.941681 C588.687988,338.120300 579.463318,336.840973 569.849365,335.306793 z"/>
			<!-- Path 2b: upper-center column -->
			<path fill="url(#gs-grad2b)" stroke="none" d="M526.836792,163.888550 C527.769348,184.208420 528.520874,204.156845 529.243774,224.106308 C529.791870,239.231293 530.276917,254.358643 530.863708,269.482086 C530.940430,271.459839 530.479858,273.112152 529.117065,274.479553 C515.486389,288.155670 501.845734,301.821808 488.185059,315.467926 C487.749817,315.902710 487.069641,316.092285 486.083435,316.621796 C483.456757,310.881775 483.730988,304.814636 482.774963,299.062958 C477.788177,269.061096 473.085175,239.012146 468.163605,208.999222 C467.729889,206.354431 468.281952,204.448990 470.235870,202.812485 C487.098724,188.688995 504.567322,175.393921 523.413147,163.987732 C524.390259,163.396347 525.429016,162.715454 526.836792,163.888550 z"/>
		</g>
		<g class="gs-group gs-group-3">
			<!-- Path 3a: right-middle panels -->
			<path fill="url(#gs-grad3a)" stroke="none" d="M595.000000,270.294067 C578.245178,270.293732 561.990417,270.293732 545.772278,270.293732 C545.248901,267.081268 547.329651,266.056488 548.614685,264.752930 C565.095215,248.034271 581.662781,231.401306 598.151733,214.690903 C600.186829,212.628525 602.462891,211.849304 605.296143,211.857422 C622.280945,211.906067 639.266724,211.952515 656.250305,211.798431 C660.634155,211.758652 662.566650,212.986206 662.290771,217.790131 C661.330017,234.523132 657.923035,250.711716 652.519531,266.542542 C651.440857,269.702698 649.451477,270.348907 646.455444,270.333130 C629.470703,270.243622 612.485229,270.292542 595.000000,270.294067 z"/>
			<!-- Path 3b: upper-center tall -->
			<path fill="url(#gs-grad3b)" stroke="none" d="M535.714111,216.011108 C535.082764,198.538773 534.608154,181.554276 533.731873,164.590546 C533.475891,159.634460 534.768188,157.276947 539.861206,155.771469 C554.403992,151.472610 569.076355,147.780334 583.841064,144.365097 C588.027710,143.396683 589.199158,144.644592 589.255371,148.645691 C589.533569,168.468719 589.941895,188.290131 590.378418,208.110474 C590.436707,210.758118 589.882874,212.944977 587.945251,214.883957 C572.042114,230.797928 556.191589,246.764450 540.311462,262.701385 C539.864319,263.150085 539.265015,263.447144 537.406067,264.741241 C536.820129,248.002197 536.268921,232.254547 535.714111,216.011108 z"/>
		</g>
		<g class="gs-group gs-group-4">
			<!-- Path 4a: top-right tip corner -->
			<path fill="url(#gs-grad4a)" stroke="none" d="M661.197815,176.000000 C661.194092,184.498611 661.161499,192.497345 661.202698,200.495712 C661.217102,203.292969 660.763245,205.246964 657.217529,205.432678 C640.567261,206.304657 623.931702,205.490280 607.291382,205.235123 C606.852844,205.228409 606.419556,204.881241 604.787048,204.175415 C623.224487,184.606812 641.296997,165.425507 659.369446,146.244202 C659.978943,146.452942 660.588440,146.661667 661.197937,146.870407 C661.197937,156.413605 661.197937,165.956802 661.197815,176.000000 z"/>
			<!-- Path 4b: upper-right panels -->
			<path fill="url(#gs-grad4b)" stroke="none" d="M600.404663,197.252029 C596.267883,199.162994 596.997498,196.077026 596.940125,194.210007 C596.545898,181.392929 596.237366,168.573166 595.924377,155.753693 C595.834961,152.089615 595.880371,148.421707 595.755310,144.759262 C595.665588,142.130524 596.700195,140.678207 599.426025,140.507324 C601.913818,140.351379 604.392944,139.898773 606.877808,139.883209 C620.539795,139.797592 634.202454,139.781723 647.864685,139.812210 C649.618347,139.816116 651.538940,139.292465 653.864136,141.337418 C636.669678,160.476562 618.396240,178.499451 600.404663,197.252029 z"/>
		</g>
	</svg>
</div>

<style>
	.gs-logo-anim {
		display: grid;
		place-items: center;
		aspect-ratio: 1;
	}
	
	.loader-svg {
		width: 100%;
		height: 100%;
		display: block;
		/* Add a subtle drop shadow to match the brand pack, but slightly reduced for inline navbar use */
		filter: drop-shadow(0 6px 12px rgba(35, 75, 29, 0.08));
	}
	
	.gs-group {
		transform-origin: 512px 272px;
		will-change: transform, opacity;
		opacity: 1;
		transform: translateY(0) scale(1); /* Default resting state */
	}

	/* We only apply the animations when 'playing' class is active */
	.gs-logo-anim.playing .gs-group {
		animation: gsPieceReveal 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	/* Stagger effects */
	.gs-logo-anim.playing .gs-group-5 { animation-delay: 0s; }
	.gs-logo-anim.playing .gs-group-1 { animation-delay: 0.08s; }
	.gs-logo-anim.playing .gs-group-2 { animation-delay: 0.16s; }
	.gs-logo-anim.playing .gs-group-3 { animation-delay: 0.24s; }
	.gs-logo-anim.playing .gs-group-4 { animation-delay: 0.32s; }

	@keyframes gsPieceReveal {
		0% {
			opacity: 0.35;
			transform: translateY(10px) scale(0.975);
		}
		35% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
		72% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
		100% {
			/* Since it's resting at the final frame, keep it fully visible and unscaled.
			   The original had 0.45 and scaled, but because it pulses infinitely, it needed that.
			   Once we play and rest, we should rest at solid 100%. */
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.loader-svg,
		.gs-group {
			animation: none !important;
		}
	}
</style>
