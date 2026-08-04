<script lang="ts">
	let {
		png,
		webp,
		alt,
		eager = false,
		class: className = ''
	}: {
		png: string;
		webp: string;
		alt: string;
		eager?: boolean;
		class?: string;
	} = $props();
</script>

<div class="device-frame-phone overflow-hidden {className}">
	<div class="device-frame-phone-inner aspect-[412/915]">
		<picture>
			<source srcset={webp} type="image/webp" />
			<img
				src={png}
				{alt}
				width="412"
				height="915"
				loading={eager ? 'eager' : 'lazy'}
				fetchpriority={eager ? 'high' : 'auto'}
				class="h-full w-full object-cover object-top"
			/>
		</picture>
	</div>
</div>
