<script lang="ts">
	import './layout.css';
	import { LinkedinLogo, XLogo, ToggleLeft } from "phosphor-svelte";
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
      <nav class="flex flex-wrap justify-center items-center gap-8 md:gap-14 text-[#0A0A0A] font-['Plus_Jakarta_Sans',system-ui,sans-serif] font-semibold text-[15px] tracking-tight mb-8">
        <a href="/" class="hover:text-[#3D7D2C] transition-colors">Home</a>
        <a href="#features" class="hover:text-[#3D7D2C] transition-colors">Features</a>
        <a href="#clients" class="hover:text-[#3D7D2C] transition-colors">Clients</a>
        <a href="#about" class="hover:text-[#3D7D2C] transition-colors">About</a>
        <a href="#contact" class="hover:text-[#3D7D2C] transition-colors">Contact</a>
      </nav>

      <!-- 3. Social Row -->
      <div class="flex items-center justify-center gap-8 mb-8">
        <a href="#" aria-label="LinkedIn" class="text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors">
          <LinkedinLogo size={20} weight="fill" aria-hidden="true" />
        </a>
        <a href="#" aria-label="X (Twitter)" class="text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors">
          <XLogo size={20} weight="fill" aria-hidden="true" />
        </a>
      </div>
      
      <!-- 4. Legal Navigation -->
      <nav class="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-[#A3A3A3] font-['Inter',system-ui,sans-serif] text-[13px] font-medium">
        <a href="/privacy" class="hover:text-[#0A0A0A] transition-colors">Privacy Policy</a>
        <a href="/terms" class="hover:text-[#0A0A0A] transition-colors">Terms of Service</a>
        <a href="/cookies" class="hover:text-[#0A0A0A] transition-colors hidden sm:block">Cookie Policy</a>
        <a href="/notice" class="hover:text-[#0A0A0A] transition-colors hidden md:block">Notice at Collection</a>
        <a href="/choices" class="flex items-center gap-2 hover:text-[#0A0A0A] transition-colors">
          <ToggleLeft size={25} weight="fill" class="text-[#0ea5e9]" aria-hidden="true" />
          Your Privacy Choices
        </a>
      </nav>
    </div>
    
    <!-- 5. Utility & Status Bar -->
    <div class="relative w-full px-6 md:px-14 flex flex-col md:flex-row justify-between items-center gap-4 z-10 pointer-events-none mt-32 mb-8">
      <div class="inline-block text-[#A3A3A3] font-['Inter',system-ui,sans-serif] text-[13px] pointer-events-auto">
        © {new Date().getFullYear()} Sarbani Associates
      </div>
      <a href="#status" class="flex items-center gap-2.5 pointer-events-auto group py-2 px-3 rounded-[100px] hover:bg-[#00000005] transition-colors">
        <div class="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
        <div class="inline-block text-[#777777] font-['Inter',system-ui,sans-serif] text-[13px] font-medium group-hover:text-[#0A0A0A] transition-colors">
          All services are online
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
