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
		class="relative overflow-hidden rounded-md border border-border bg-white shadow-card"
		style="aspect-ratio: {frameRatio};"
	>
		{#if hasAsset}
			{#if type === 'video'}
				<!-- Real capture: muted background-style loop -->
				<video
					{src}
					{poster}
					autoplay
					muted
					loop
					playsinline
					preload="metadata"
					class="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
				></video>
				{#if poster}
					<img
						src={poster}
						{alt}
						class="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
					/>
				{/if}
			{:else}
				<img
					{src}
					{alt}
					width={width ?? 1280}
					height={height ?? 720}
					loading={eager ? 'eager' : 'lazy'}
					class="absolute inset-0 h-full w-full object-cover"
				/>
			{/if}
		{:else}
			<!-- Preview placeholder frame -->
			<div
				class="dot-grid-light absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center"
			>
				{#if type === 'video'}
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						class="text-green-deep"
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
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						class="text-green-deep"
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
					{label || `${type} preview in preparation`}
				</p>
				<p class="max-w-md text-[13px] leading-[1.6] text-muted">
					Live field demonstration recording will be published here.
				</p>
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
