<script lang="ts">
	import './layout.css';
	let { children } = $props();
</script>

{@render children()}

  <!-- Footer (1:1 Precision Replica of Obvious.ai) -->
  <footer class="flex flex-col relative w-full pt-36 pb-0 bg-[#FAFAF7] overflow-hidden mt-auto border-t border-[#0000000A]">
    <!-- Centered Stack Architecture -->
    <div class="flex flex-col items-center px-4 z-10 w-full max-w-5xl mx-auto">
      
      <!-- 1. Brand -->
      <a href="/" aria-label="GardenSuite Home" class="mb-14">
        <img src="/favicon.png" alt="GardenSuite Logo" class="h-10 w-auto opacity-90" />
      </a>
      
      <!-- 2. Primary Navigation -->
      <nav class="flex flex-wrap justify-center items-center gap-8 md:gap-14 text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-semibold text-[14px] tracking-tight mb-8">
        <a href="/" class="hover:text-[#3D7D2C] transition-colors">Home</a>
        <a href="#features" class="hover:text-[#3D7D2C] transition-colors">Features</a>
        <a href="#about" class="hover:text-[#3D7D2C] transition-colors">About</a>
        <a href="#contact" class="hover:text-[#3D7D2C] transition-colors">Contact</a>
      </nav>

      <!-- 3. Social Row -->
      <div class="flex items-center justify-center gap-8 mb-8">
        <a href="#" aria-label="LinkedIn" class="text-[#71717A] hover:text-[#0A0A0A] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        <a href="#" aria-label="X (Twitter)" class="text-[#71717A] hover:text-[#0A0A0A] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
      </div>
      
      <!-- 4. Legal Navigation -->
      <nav class="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-[#71717A] font-['Inter',system-ui,sans-serif] text-[12px] font-medium">
        <a href="/privacy" class="hover:text-[#0A0A0A] transition-colors">Privacy Policy</a>
        <a href="/terms" class="hover:text-[#0A0A0A] transition-colors">Terms of Service</a>
        <a href="/cookies" class="hover:text-[#0A0A0A] transition-colors hidden sm:block">Cookie Policy</a>
        <a href="/notice" class="hover:text-[#0A0A0A] transition-colors hidden md:block">Notice at Collection</a>
        <a href="/choices" class="flex items-center gap-2 hover:text-[#0A0A0A] transition-colors">
          <svg width="25" height="13" viewBox="0 0 25 13" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-[#0ea5e9]">
            <rect width="25" height="13" rx="6.5" fill="currentColor" fill-opacity="0.15"/>
            <circle cx="6.5" cy="6.5" r="4.5" fill="currentColor"/>
          </svg>
          Your Privacy Choices
        </a>
      </nav>
    </div>
    
    <!-- 5. Utility & Status Bar -->
    <div class="relative w-full px-6 md:px-14 flex flex-col md:flex-row justify-between items-center gap-4 z-10 pointer-events-none mt-32 mb-8">
      <div class="inline-block text-[#71717A] font-['Inter',system-ui,sans-serif] text-[13px] pointer-events-auto">
        © {new Date().getFullYear()} Sarbani Associates
      </div>
      <a href="#status" class="flex items-center gap-2.5 pointer-events-auto group py-2 px-3 rounded-[100px] hover:bg-[#00000005] transition-colors">
        <div class="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
        <div class="inline-block text-[#777777] font-['Inter',system-ui,sans-serif] text-[13px] font-medium group-hover:text-[#0A0A0A] transition-colors">
          All Services Are Online
        </div>
      </a>
    </div>
    
    <!-- 6. Architectural Watermark (Mixed Case & Soft Glow Background) -->
    <div class="relative w-full flex justify-center pointer-events-none select-none overflow-hidden pb-0 bg-transparent mt-[-10vw]">
      <!-- Deep Blur Blob (Color Spill) -->
      <div class="absolute left-[35%] top-1/2 -translate-y-1/2 w-[35vw] h-[35vw] bg-[#3D7D2C]/[0.05] blur-[120px] rounded-full z-0"></div>
      
      <!-- Solid Typography -->
      <div class="relative z-10 font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-extrabold text-[20vw] tracking-[-0.06em] leading-[0.70] text-[#EBEBE8] whitespace-nowrap translate-y-[35%] pr-8">
        Sarbani
      </div>
    </div>
  </footer>
