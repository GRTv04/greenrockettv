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

// First, add the necessary HTML structure for navigation

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelectorAll(".carousel")
  carousel.forEach((carousel) => {
    // Add navigation arrows
    const prevButton = document.createElement("button")
    prevButton.className = "carousel-nav prev"
    prevButton.innerHTML = "&larr;"
    prevButton.setAttribute("aria-label", "Previous slide")

    const nextButton = document.createElement("button")
    nextButton.className = "carousel-nav next"
    nextButton.innerHTML = "&rarr;"
    nextButton.setAttribute("aria-label", "Next slide")

    // Add indicator dots
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

    // Append new elements to carousel
    carousel.appendChild(prevButton)
    carousel.appendChild(nextButton)
    carousel.appendChild(indicators)

    // Initialize the carousel
    let currentSlide = 0
    const totalSlides = items.length

    // Show first slide, hide others
    items.forEach((item, index) => {
      if (index !== 0) {
        item.style.display = "none"
      } else {
        item.style.display = "block"
      }
    })

    // Function to change slides
    const goToSlide = (slideIndex) => {
      // Handle circular navigation
      if (slideIndex < 0) slideIndex = totalSlides - 1
      if (slideIndex >= totalSlides) slideIndex = 0

      // Hide all slides
      items.forEach((item) => {
        item.style.display = "none"
        item.classList.remove("active")
      })

      // Show the target slide
      items[slideIndex].style.display = "block"
      items[slideIndex].classList.add("active")

      // Update indicators
      const dots = indicators.querySelectorAll(".indicator")
      dots.forEach((dot) => dot.classList.remove("active"))
      dots[slideIndex].classList.add("active")

      // Update current slide index
      currentSlide = slideIndex
    }

    // Event listeners for buttons
    prevButton.addEventListener("click", () => {
      goToSlide(currentSlide - 1)
    })

    nextButton.addEventListener("click", () => {
      goToSlide(currentSlide + 1)
    })

    // Add event listeners to indicators
    const dots = indicators.querySelectorAll(".indicator")
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        goToSlide(parseInt(dot.dataset.slide))
      })
    })

    // Touch and mouse swipe functionality
    let touchStartX = 0
    let touchEndX = 0
    let mouseStartX = 0
    let mouseEndX = 0
    let isDragging = false

    // Minimum distance to register as a swipe (in pixels)
    const swipeThreshold = 50

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

    // Set initial cursor style
    carousel.style.cursor = "grab"

    // Handle touch swipe
    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX

      if (swipeDistance > swipeThreshold) {
        // Swiped right - go to previous slide
        goToSlide(currentSlide - 1)
      } else if (swipeDistance < -swipeThreshold) {
        // Swiped left - go to next slide
        goToSlide(currentSlide + 1)
      }
    }

    // Handle mouse swipe
    function handleMouseSwipe() {
      const swipeDistance = mouseEndX - mouseStartX

      if (swipeDistance > swipeThreshold) {
        // Swiped right - go to previous slide
        goToSlide(currentSlide - 1)
      } else if (swipeDistance < -swipeThreshold) {
        // Swiped left - go to next slide
        goToSlide(currentSlide + 1)
      }
    }
  })
})
