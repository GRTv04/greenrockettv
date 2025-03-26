document.addEventListener("DOMContentLoaded", function () {
  // Select elements once for performance
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")
  const backToTopButton = document.getElementById("backToTop")

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

  // Debounce function to limit the frequency of scroll event handling
  function debounce(func, delay) {
    let timeoutId
    return function () {
      const context = this
      const args = arguments
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(context, args), delay)
    }
  }

  // Throttle scroll event to improve performance
  function createScrollHandler(sections, navLinks) {
    let previousActiveSection = null

    return function () {
      let current = null

      // Use more efficient method to find active section
      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top
        const sectionBottom = rect.bottom

        // More precise section detection
        if (sectionTop <= 100 && sectionBottom >= 100) {
          current = section.getAttribute("id")
          break // Exit loop once the correct section is found
        }
      }

      // Only update DOM if the active section has changed
      if (current !== previousActiveSection) {
        // Use more efficient DOM manipulation
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${current}`
          link.classList.toggle("active", isActive)
        })

        previousActiveSection = current
      }
    }
  }

  // Initialize the scroll handler with debounce
  function initializeScrollNavigation(sections, navLinks) {
    const debouncedScrollHandler = debounce(
      createScrollHandler(sections, navLinks),
      50 // 50ms debounce delay
    )

    window.addEventListener("scroll", debouncedScrollHandler)

    // Optional: Remove event listener when no longer needed
    return () => {
      window.removeEventListener("scroll", debouncedScrollHandler)
    }
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

  document
    .querySelectorAll(".ads-container, .mv-row")
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
