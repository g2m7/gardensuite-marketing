<script lang="ts">
  const features = [
    {
      title: 'Kamjari & Punches',
      desc: 'Clock-in and clock-out for general garden work with face verification. Records the section, task code, and local timestamp.',
      img: '/screenshots/16_punch_result_clock_in.png',
      alt: 'Punch success screen showing clock-in saved offline'
    },
    {
      title: 'Field Enrollment',
      desc: 'Register new workers or update face records right in the garden. Capture photos from different angles - no office computer needed.',
      img: '/screenshots/26_register_review.png',
      alt: 'Review screen showing captured face angles before saving'
    },
    {
      title: 'Reports & Cloud Sync',
      desc: 'Review leaf weight records, check daily totals, and sync saved data to the office in one tap when network is available.',
      img: '/screenshots/18_reports_harvest_list.png',
      alt: 'App report screen showing active harvest session list'
    }
  ];
</script>

<section
  class="relative w-full border-b border-[#E4E4E7] bg-white px-6 py-20 md:px-12 md:py-28"
  aria-labelledby="feature-grid-heading"
>
  <div class="mx-auto max-w-[1344px]">
    <div class="mx-auto max-w-3xl text-center mb-14 lg:mb-16">
      <span class="mb-4 inline-flex text-[13px] font-semibold tracking-[0.08em] text-[#1B5E3B] uppercase">
        Also in the app
      </span>
      <h2
        id="feature-grid-heading"
        class="text-[28px] leading-[1.08] font-semibold tracking-[-0.04em] text-[#111111] md:text-[36px] lg:text-[44px]"
        style="text-wrap: balance"
      >
        Built for every field task.
      </h2>
      <p class="mx-auto mt-5 max-w-[640px] text-[16px] leading-[1.65] text-[#374151]">
        Three more tools built into the same field app. No extra installation.
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each features as feature}
        <div class="rounded-2xl border border-[#E4E4E7] bg-white overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
          <div class="flex items-center justify-center bg-[#F8FAF8] p-8 md:p-10 min-h-[240px] md:min-h-[280px]">
            <div class="device-frame-phone w-[130px] md:w-[150px]">
              <div class="device-frame-phone-inner aspect-[9/19.5]">
                <img
                  src={feature.img}
                  alt={feature.alt}
                  class="h-full w-full object-cover object-top"
                  loading="lazy"
                  width="1080"
                  height="2400"
                />
              </div>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-[18px] font-semibold tracking-[-0.02em] text-[#111111]">
              {feature.title}
            </h3>
            <p class="mt-2 text-[14px] leading-[1.6] text-[#4B5563]">
              {feature.desc}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
