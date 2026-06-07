<script lang="ts">
	import Button from '$lib/components/Button.svelte';
</script>

<section
  class="relative w-full border-b border-[#E4E4E7] bg-white px-6 py-20 md:px-12 md:py-28"
  aria-labelledby="product-hero-heading"
>
  <div class="mx-auto max-w-[1344px]">
    <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <!-- Text column -->
      <div>
        <span
          class="mb-3 inline-block text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase lg:mb-4"
        >
          Android Field App
        </span>

        <h2
          id="product-hero-heading"
          class="text-[34px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[44px] lg:text-[52px]"
          style="text-wrap: balance"
        >
          Your field attendance system, on your phone.
        </h2>

        <p class="mt-4 text-[16px] leading-[1.65] text-[#374151] md:text-[17px] lg:mt-5">
          Mark attendance, capture leaf weight, and register workers - all from one Android app that
          works without internet.
        </p>

        <ul class="mt-6 grid gap-2.5">
          <li class="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#374151]">
            <svg
              class="mt-0.5 h-4 w-4 shrink-0 text-[#1B5E3B]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clip-rule="evenodd"
              />
            </svg>
            Face-verified attendance
          </li>
          <li class="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#374151]">
            <svg
              class="mt-0.5 h-4 w-4 shrink-0 text-[#1B5E3B]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clip-rule="evenodd"
              />
            </svg>
            Bluetooth leaf weight capture
          </li>
          <li class="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[#374151]">
            <svg
              class="mt-0.5 h-4 w-4 shrink-0 text-[#1B5E3B]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clip-rule="evenodd"
              />
            </svg>
            Works fully offline
          </li>
        </ul>

        <div class="mt-8">
			<Button href="/#contact" label="Book Free Demo" variant="primary" showIcon />
        </div>
      </div>

      <!-- Phone mockup column -->
      <div class="flex justify-center">
        <div class="device-frame-phone w-[220px] md:w-[260px]">
          <div class="device-frame-phone-inner aspect-[9/19.5]">
            <img
              src="/screenshots/workflow_avd/00_home_entry_points.png"
              alt="GardenSuite face app home screen"
              width="1080"
              height="2400"
              loading="lazy"
              class="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
