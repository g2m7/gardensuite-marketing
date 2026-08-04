<script lang="ts">
	let {
		label,
		description,
		class: className = ''
	}: {
		label: string;
		description: string;
		class?: string;
	} = $props();
</script>

<div
	class="grid place-items-center border border-dashed border-[#A1A1AA] bg-white p-6 text-center {className}"
	role="img"
	aria-label={`${label}. ${description}`}
	data-media-requirement
>
	<div class="max-w-[36ch]">
		<span class="block text-[12px] font-semibold tracking-[0.08em] text-green-deep uppercase">
			{label}
		</span>
		<p class="mt-2 text-[13px] leading-[1.55] text-text-secondary">{description}</p>
	</div>
</div>
