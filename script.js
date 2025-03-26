document.addEventListener("DOMContentLoaded", function () {
  //Active link switching
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

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

  // Mobile swipe
  const sliders = document.querySelectorAll(".mv-row")

  sliders.forEach((slider, index) => {
    let isDragging = false

    const links = slider.querySelectorAll("a")

    if (index === 1) {
      const firstItem = slider.querySelector("a")
      if (firstItem && slider.querySelectorAll("a").length > 1) {
        const itemWidth = firstItem.offsetWidth
        const gap = 16

        requestAnimationFrame(() => {
          slider.scrollLeft = itemWidth + gap
        })
      }
    }

    // Prevent default link behavior when in dragging mode
    links.forEach((link) => {
      link.addEventListener("dragstart", (e) => {
        e.preventDefault()
        return false
      })

      link.addEventListener("click", (e) => {
        if (isDragging) {
          e.preventDefault()
          e.stopPropagation()
        }
      })
    })
  })

  document.addEventListener("dragstart", function (e) {
    if (e.target.closest(".mv-row")) {
      e.preventDefault()
      return false
    }
  })

  // Adsvertisement section drag scrolling
  const container = document.querySelector(".ads-container")
  const links = container.querySelectorAll("a")

  let isDragging = false
  let startX
  let startScrollLeft
  let scrollThreshold = 5

  // Mouse events for desktop
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

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (isDragging) {
        e.preventDefault()
      }
    })
  })

  // Back to Top
  const backToTopButton = document.getElementById("backToTop")

  let ticking = false

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        scrollFunction()
        ticking = false
      })
      ticking = true
    }
  })

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

  // Scroll to top when button is clicked
  backToTopButton.addEventListener("click", function () {
    // For smooth scrolling
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
})
