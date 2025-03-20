const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop

    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

const backToTopButton = document.getElementById("backToTop")

window.onscroll = function () {
  scrollFunction()
}

document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".mv-row")

  sliders.forEach((slider, index) => {
    let isDragging = false

    const links = slider.querySelectorAll("a")

    if (index === 1) {
      const firstItem = slider.querySelector("a")
      if (firstItem && slider.querySelectorAll("a").length > 1) {
        const itemWidth = firstItem.offsetWidth
        const gap = 16

        setTimeout(() => {
          slider.scrollLeft = itemWidth + gap
        }, 500)
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

  // Prevent all browser default drag behavior
  document.addEventListener("dragstart", function (e) {
    if (e.target.closest(".mv-row")) {
      e.preventDefault()
      return false
    }
  })
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

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".ads-container")
  const links = container.querySelectorAll("a")

  // Variables to track dragging
  let isDragging = false
  let startX
  let startScrollLeft
  let scrollThreshold = 5 // pixels of movement to consider as a drag

  // Mouse events for desktop
  container.addEventListener("mousedown", (e) => {
    isDragging = false
    startX = e.pageX
    startScrollLeft = container.scrollLeft
    container.style.cursor = "grabbing"
  })

  container.addEventListener("mousemove", (e) => {
    if (e.buttons !== 1) return // Not pressing mouse button

    const dx = e.pageX - startX
    if (Math.abs(dx) > scrollThreshold) {
      isDragging = true
      container.scrollLeft = startScrollLeft - dx
    }
  })

  container.addEventListener("mouseup", () => {
    container.style.cursor = "grab"
  })

  // Prevent link clicks if dragging
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (isDragging) {
        e.preventDefault()
      }
    })
  })

  // Touch events for mobile
  let touchStartX
  let touchStartScrollLeft

  container.addEventListener("touchstart", (e) => {
    isDragging = false
    touchStartX = e.touches[0].pageX
    touchStartScrollLeft = container.scrollLeft
  })

  container.addEventListener("touchmove", (e) => {
    const dx = e.touches[0].pageX - touchStartX
    if (Math.abs(dx) > scrollThreshold) {
      isDragging = true
    }
  })
})

// Scroll to top when button is clicked
backToTopButton.addEventListener("click", function () {
  // For smooth scrolling
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})
