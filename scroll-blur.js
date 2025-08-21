(function() {
  function initScrollBlur() {
    const media = document.getElementById("scrollImage");
    if (!media) return;

    const blurMultiplier = 3;
    const maxBlur = 7;

    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let ticking = false;

    function updateBlur() {
      const now = performance.now();
      const newY = window.scrollY;

      const deltaY = newY - lastScrollY;
      const deltaTime = now - lastTime || 1;

      const speed = Math.abs(deltaY / deltaTime);
      const blurAmount = Math.min(speed * blurMultiplier, maxBlur);

      media.style.filter = `blur(${blurAmount}px)`;

      lastScrollY = newY;
      lastTime = now;
      ticking = false;

      clearTimeout(media._blurTimeout);
      media._blurTimeout = setTimeout(() => {
        media.style.filter = "blur(0px)";
      }, 150);
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateBlur);
        ticking = true;
      }
    });
  }

  // ✅ Check if Cargo exists
  if (typeof Cargo !== "undefined" && Cargo.Core && Cargo.Core.Callbacks) {
    Cargo.Core.Callbacks.afterDocumentLoad.push(initScrollBlur);
  } else {
    // ✅ Fallback: run immediately (non-Cargo page)
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initScrollBlur);
    } else {
      initScrollBlur();
    }
  }
})();
