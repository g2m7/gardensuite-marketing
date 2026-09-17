<script lang="ts">
	let {
		type = 'image',
		aspect = '16 / 9',
		src = '',
		alt = '',
		poster = '',
		width,
		height,
		eager = false,
		internal = false,
		label = '',
		caption = '',
		title = ''
	}: {
		type?: 'image' | 'video';
		aspect?: string;
		src?: string;
		alt?: string;
		poster?: string;
		width?: number;
		height?: number;
		eager?: boolean;
		internal?: boolean;
		label?: string;
		caption?: string;
		title?: string;
	} = $props();

	const hasAsset = $derived(src.trim().length > 0);
	const frameRatio = $derived(aspect.replace(/\s+/g, ''));
</script>

<figure class="w-full">
	<div
		class="relative overflow-hidden rounded-2xl border border-border bg-white shadow-card"
		style="aspect-ratio: {frameRatio};"
	>
		{#if hasAsset}
			{#if type === 'video'}
				<!-- Real capture: muted background-style loop, never user-controlled -->
				<video
					{src}
					{poster}
					autoplay
					muted
					loop
					playsinline
					preload="metadata"
					class="absolute inset-0 h-full w-full object-cover"
				></video>
			{:else}
				<img
					{src}
					{alt}
					{width}
					{height}
					loading={eager ? 'eager' : 'lazy'}
					class="absolute inset-0 h-full w-full object-cover"
				/>
			{/if}
		{:else}
			<!-- Placeholder frame. Sits in until an approved real capture replaces it. -->
			<div
				class="dot-grid-light absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center"
			>
				{#if type === 'video'}
					<svg
						width="22"
						height="22"
						viewBox="0 0 24 24"
						fill="none"
						class="text-subtle"
						aria-hidden="true"
					>
						<rect
							x="2.5"
							y="5.5"
							width="14"
							height="13"
							rx="2.5"
							stroke="currentColor"
							stroke-width="1.8"
						/>
						<path
							d="M18.5 10.5l3.5-2v7l-3.5-2z"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linejoin="round"
						/>
					</svg>
				{:else}
					<svg
						width="22"
						height="22"
						viewBox="0 0 24 24"
						fill="none"
						class="text-subtle"
						aria-hidden="true"
					>
						<rect
							x="3"
							y="4"
							width="18"
							height="16"
							rx="2.5"
							stroke="currentColor"
							stroke-width="1.8"
						/>
						<circle cx="9" cy="10" r="1.8" stroke="currentColor" stroke-width="1.8" />
						<path
							d="M3.5 17.5l4.5-4.5 3.5 3.5 3-3 6 4.5"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				{/if}
				<p class="mt-1 text-[13px] font-semibold tracking-[0.08em] text-green-deep uppercase">
					{type} placeholder
				</p>
				{#if internal && label}
					<p class="max-w-md text-[14px] leading-[1.6] text-muted">{label}</p>
					<p class="text-[12px] text-subtle">
						Awaiting approved capture. Never publish invented artwork.
					</p>
				{:else}
					<p class="text-[14px] text-muted">Media coming soon</p>
				{/if}
			</div>
		{/if}
	</div>
	{#if caption || title}
		<figcaption class="mt-3 text-[13px] leading-[1.6] text-muted">
			{caption}
			{#if title}
				<span class="sr-only">{title}</span>
			{/if}
		</figcaption>
	{/if}
</figure>
