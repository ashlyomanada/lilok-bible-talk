<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { eventConfig } from "~/config/event";

const DESKTOP_BREAKPOINT = 1024; // Tailwind `lg`. Below this width the hamburger menu is used.
const SCROLL_OFFSET = 72; // Approx. height of the fixed header once scrolled

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

// Single source of truth for both desktop and mobile navigation.
// `desktop` is only set for links that appear in the desktop bar.
const navLinks = [
  { target: "#hero", mobile: "Home" },
  { target: "#details", desktop: "Event", mobile: "Event Details" },
  { target: "#about", mobile: "About & Welcome" },
  { target: "#expect", mobile: "What to Expect" },
  { target: "#sunday", desktop: "Sunday Worship", mobile: "Sunday Worship" },
  { target: "#gallery", desktop: "Gallery", mobile: "Gallery" },
  { target: "#connect", desktop: "Connect", mobile: "Connect" },
];
const desktopLinks = navLinks.filter((link) => link.desktop);

const lockBody = (locked: boolean) => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = locked ? "hidden" : "";
  }
};

const closeMenu = () => {
  isMobileMenuOpen.value = false;
  lockBody(false);
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  lockBody(isMobileMenuOpen.value);
};

const scrollTo = (selector: string) => {
  closeMenu();
  const target = document.querySelector<HTMLElement>(selector);
  if (!target) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const top =
    selector === "#hero"
      ? 0
      : Math.max(
          target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
          0
        );

  window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40;
};

const handleResize = () => {
  // Don't leave the page scroll-locked if the screen is rotated or resized to desktop width.
  if (isMobileMenuOpen.value && window.innerWidth >= DESKTOP_BREAKPOINT) {
    closeMenu();
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isMobileMenuOpen.value) {
    closeMenu();
  }
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("keydown", handleKeydown);
  lockBody(false);
});
</script>

<template>
  <!--
    The mobile menu is a SIBLING of <header>, not a child. A header with backdrop-blur
    becomes the containing block for `fixed` children, which would shrink the overlay
    to the header's height once the page is scrolled.
  -->
  <div>
    <header
      class="fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-300 motion-reduce:transition-none"
      :class="[
        isScrolled || isMobileMenuOpen
          ? 'bg-navy-900/95 backdrop-blur-md border-b border-white/10 shadow-soft'
          : 'bg-gradient-to-b from-navy-950/80 via-navy-950/30 to-transparent',
      ]"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 transition-all duration-300 motion-reduce:transition-none"
        :class="isScrolled ? 'py-2.5 sm:py-3' : 'py-3 sm:py-5'"
      >
        <!-- Logo & Brand on Left -->
        <a
          href="#hero"
          class="group flex items-center gap-2.5 sm:gap-3.5 min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded-full"
          @click.prevent="scrollTo('#hero')"
        >
          <div
            class="flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
          >
            <img
              src="/images/mnl-logo-white.png"
              :alt="eventConfig.logoAlt"
              class="h-8 sm:h-10 w-auto object-contain drop-shadow-sm"
              loading="eager"
            />
          </div>

          <div class="flex flex-col text-left min-w-0">
            <div class="flex items-center gap-2 min-w-0">
              <span
                class="font-sans font-black text-sm min-[380px]:text-base sm:text-lg leading-tight tracking-wide sm:tracking-wider uppercase text-white drop-shadow-sm truncate"
              >
                {{ eventConfig.groupName }}
              </span>
              <span
                class="hidden sm:inline-flex shrink-0 items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/15 text-white/90 border border-white/20"
              >
                Central
              </span>
            </div>
            <!-- Long church name is hidden on very narrow phones so it never crowds the RSVP button -->
            <span
              class="hidden min-[420px]:block text-[11px] font-medium tracking-wide text-surface-300/90 -mt-0.5 truncate"
            >
              {{ eventConfig.parentChurchName }}
            </span>
          </div>
        </a>

        <!-- Desktop Links & RSVP (lg and up) -->
        <nav
          class="hidden lg:flex items-center gap-6 xl:gap-8"
          aria-label="Main navigation"
        >
          <div
            class="flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-bold tracking-wider uppercase"
          >
            <button
              v-for="link in desktopLinks"
              :key="link.target"
              type="button"
              class="text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded px-1 whitespace-nowrap"
              @click="scrollTo(link.target)"
            >
              {{ link.desktop }}
            </button>
          </div>

          <a
            :href="eventConfig.contact.messengerUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-accent-500 hover:bg-accent-600 text-navy-900 font-extrabold text-xs xl:text-sm tracking-wider uppercase shadow-soft hover:shadow-glow-gold hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 whitespace-nowrap"
          >
            RSVP
          </a>
        </nav>

        <!-- Mobile / Tablet: RSVP + Hamburger (below lg) -->
        <div class="flex items-center gap-1.5 sm:gap-2 shrink-0 lg:hidden">
          <a
            :href="eventConfig.contact.messengerUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center min-h-10 px-4 sm:px-5 rounded-full bg-accent-500 text-navy-900 font-extrabold text-xs tracking-wider uppercase shadow-xs active:scale-95 transition-transform"
          >
            RSVP
          </a>

          <button
            type="button"
            class="inline-flex items-center justify-center w-11 h-11 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            @click="toggleMobileMenu"
          >
            <svg
              v-if="!isMobileMenuOpen"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Full-Screen Mobile Menu Overlay (sits under the header, z-40 vs z-50) -->
    <Transition
      enter-active-class="transition duration-300 ease-out motion-reduce:transition-none"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in motion-reduce:transition-none"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        class="fixed inset-0 z-40 bg-navy-900/95 backdrop-blur-2xl overflow-y-auto overscroll-contain lg:hidden"
      >
        <!-- min-h-full keeps the footer line at the bottom on tall screens and lets the list scroll on short/landscape ones -->
        <div
          class="min-h-full flex flex-col justify-between gap-8 px-5 sm:px-8 pt-[calc(env(safe-area-inset-top)+4.5rem)] pb-[calc(env(safe-area-inset-bottom)+6rem)]"
        >
          <nav class="flex flex-col text-left" aria-label="Mobile navigation">
            <button
              v-for="link in navLinks"
              :key="link.target"
              type="button"
              class="text-left py-3.5 font-bold text-base sm:text-lg uppercase tracking-wider text-white/90 hover:text-accent-500 active:text-accent-500 transition-colors border-b border-white/10 last:border-b-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded"
              @click="scrollTo(link.target)"
            >
              {{ link.mobile }}
            </button>
          </nav>

          <p class="text-center text-xs text-surface-400">
            {{ eventConfig.hashtag }} · {{ eventConfig.tagline }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>