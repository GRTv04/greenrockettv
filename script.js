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

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelectorAll(".carousel")

  carousel.forEach((carousel) => {
    const indicators = document.createElement("div")
    indicators.className = "carousel-indicators"

    const items = carousel.querySelectorAll(".carousel-item")
    items.forEach((_, index) => {
      const dot = document.createElement("button")
      dot.className = "indicator"
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`)
      if (index === 0) dot.classList.add("active")
      dot.dataset.slide = index
      indicators.appendChild(dot)
    })

    carousel.appendChild(indicators)

    let currentSlide = 0
    const totalSlides = items.length

    // Set up the initial position of each slide
    items.forEach((item, index) => {
      // Position all slides in a row
      item.style.position = "absolute"
      item.style.left = index === 0 ? "0%" : "100%"
      item.style.display = "block"
    })

    const goToSlide = (slideIndex) => {
      if (slideIndex < 0) slideIndex = totalSlides - 1
      if (slideIndex >= totalSlides) slideIndex = 0

      const direction = slideIndex > currentSlide ? 1 : -1
      // Handle wrap-around cases
      if (currentSlide === totalSlides - 1 && slideIndex === 0) direction = 1
      if (currentSlide === 0 && slideIndex === totalSlides - 1) direction = -1

      // Current slide moves out
      items[currentSlide].style.transition = "left 0.5s ease-in-out"
      items[currentSlide].style.left = -direction * 100 + "%"

      // New slide comes in
      items[slideIndex].style.transition = "left 0.5s ease-in-out"
      items[slideIndex].style.left = "0%"

      // Update active classes
      items[currentSlide].classList.remove("active")
      items[slideIndex].classList.add("active")

      const dots = indicators.querySelectorAll(".indicator")
      dots.forEach((dot) => dot.classList.remove("active"))
      dots[slideIndex].classList.add("active")

      // Reset the position of all other slides
      items.forEach((item, index) => {
        if (index !== slideIndex && index !== currentSlide) {
          item.style.transition = "none"
          item.style.left = direction > 0 ? "100%" : "-100%"
        }
      })

      currentSlide = slideIndex
    }

    const dots = indicators.querySelectorAll(".indicator")
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        goToSlide(parseInt(dot.dataset.slide))
      })
    })

    let touchStartX = 0
    let touchEndX = 0
    let mouseStartX = 0
    let mouseEndX = 0
    let isDragging = false

    const swipeThreshold = 50

    carousel.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
      },
      { passive: true }
    )
    carousel.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        handleSwipe()
      },
      { passive: true }
    )

    carousel.addEventListener("mousemove", (e) => {
      if (!isDragging) return
      // You can add visual feedback here if desired
    })

    carousel.addEventListener("mouseup", (e) => {
      if (!isDragging) return
      mouseEndX = e.clientX
      isDragging = false
      carousel.style.cursor = "grab"
      handleMouseSwipe()
    })

    carousel.addEventListener("mouseleave", (e) => {
      if (isDragging) {
        mouseEndX = e.clientX
        isDragging = false
        carousel.style.cursor = ""
        handleMouseSwipe()
      }
    })
    carousel.style.cursor = "grab"

    carousel.addEventListener("mousedown", (e) => {
      mouseStartX = e.clientX
      isDragging = true
      carousel.style.cursor = "grabbing"

      e.preventDefault()
    })

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX

      if (swipeDistance > swipeThreshold) {
        goToSlide(currentSlide - 1)
      } else if (swipeDistance < -swipeThreshold) {
        goToSlide(currentSlide + 1)
      }
    }

    function handleMouseSwipe() {
      const swipeDistance = mouseEndX - mouseStartX

      if (swipeDistance > swipeThreshold) {
        goToSlide(currentSlide - 1)
      } else if (swipeDistance < -swipeThreshold) {
        goToSlide(currentSlide + 1)
      }
    }
  })
})

const backToTopButton = document.getElementById("backToTop")

// Show the button when user scrolls down 300px
window.onscroll = function () {
  scrollFunction()
}

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
