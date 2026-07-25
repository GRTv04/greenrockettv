document.addEventListener("DOMContentLoaded", function () {
  document.documentElement.classList.add("js")
  // Select elements once for performance
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")
  const backToTopButton = document.getElementById("backToTop")

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting)
      })
    },
    { threshold: 0.12 }
  )

  document
    .querySelectorAll(".sections > section > div:first-of-type")
    .forEach((sectionIntro) => {
      revealObserver.observe(sectionIntro)
    })
  document
    .querySelectorAll(".services > .service:not(.music-videos)")
    .forEach((service) => {
      revealObserver.observe(service)
    })

  // Reveal music-video rows individually as they enter the viewport on mobile.
  const mobileMusicVideoRows = document.querySelectorAll(
    ".music-videos .mv-row"
  )

  if (window.matchMedia("(max-width: 569px)").matches) {
    const musicVideoRowObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15 }
    )

    mobileMusicVideoRows.forEach((row) => {
      musicVideoRowObserver.observe(row)
    })
  } else {
    mobileMusicVideoRows.forEach((row) => row.classList.add("is-visible"))
  }

  document.querySelectorAll(".marquee").forEach((marquee) => {
    const track = marquee.firstElementChild
    if (!track) return
    const duplicate = track.cloneNode(true)
    duplicate.setAttribute("aria-hidden", "true")
    marquee.appendChild(duplicate)
  })

  // 🟢 1. Efficient Active Link Switching with IntersectionObserver
  window.addEventListener("scroll", activeLink)

  function activeLink() {
    let current = ""

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }

  // 🟢 2. Optimized Drag Scrolling for Multiple Containers
  function setupDragScrolling(container) {
    let isDragging = false
    let startX, startScrollLeft
    const scrollThreshold = 5

    container.addEventListener("mousedown", (e) => {
      isDragging = false
      startX = e.pageX
      startScrollLeft = container.scrollLeft
      container.style.cursor = "grabbing"
    })

    container.addEventListener("mousemove", (e) => {
      if (e.buttons !== 1) return
      const dx = e.pageX - startX
      if (Math.abs(dx) > scrollThreshold) {
        isDragging = true
        container.scrollLeft = startScrollLeft - dx
      }
    })

    container.addEventListener("mouseup", () => {
      isDragging = false
      container.style.cursor = "grab"
    })

    container.addEventListener("mouseleave", () => {
      isDragging = false
    })

    container.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        if (isDragging) e.preventDefault()
      })
    })
  }

  function updateAdvertisementEdgeFade(container) {
    if (!container.classList.contains("feature-grid")) return

    const maxScrollLeft = container.scrollWidth - container.clientWidth
    const hasOverflow = maxScrollLeft > 1

    container.classList.toggle("edge-fade-left", hasOverflow && container.scrollLeft > 1)
    container.classList.toggle(
      "edge-fade-right",
      hasOverflow && container.scrollLeft < maxScrollLeft - 1
    )
  }

  document.querySelectorAll(".feature-grid").forEach((container) => {
    updateAdvertisementEdgeFade(container)
    container.addEventListener("scroll", () => {
      updateAdvertisementEdgeFade(container)
    })
  })

  window.addEventListener("load", () => {
    document
      .querySelectorAll(".feature-grid")
      .forEach(updateAdvertisementEdgeFade)
  })
  window.addEventListener("resize", () => {
    document
      .querySelectorAll(".feature-grid")
      .forEach(updateAdvertisementEdgeFade)
  })
  document
    .querySelectorAll(".feature-grid, .mv-row")
    .forEach(setupDragScrolling)

  // 🟢 3. Prevent Default Drag Behavior for `.mv-row`
  document.addEventListener("dragstart", function (e) {
    if (e.target.closest(".mv-row")) {
      e.preventDefault()
      return false
    }
  })

  // 🟢 4. Optimized Scroll-to-Top Button
  if (backToTopButton) {
    let ticking = false

    function scrollFunction() {
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        backToTopButton.classList.add("visible")
      } else {
        backToTopButton.classList.remove("visible")
      }
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          scrollFunction()
          ticking = false
        })
        ticking = true
      }
    })

    backToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
})
