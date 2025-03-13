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
    const prevButton = document.createElement("button")
    prevButton.className = "carousel-nav prev"
    prevButton.innerHTML = "&larr;"
    prevButton.setAttribute("aria-label", "Previous slide")

    const nextButton = document.createElement("button")
    nextButton.className = "carousel-nav next"
    nextButton.innerHTML = "&rarr;"
    nextButton.setAttribute("aria-label", "Next slide")

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

    carousel.appendChild(prevButton)
    carousel.appendChild(nextButton)
    carousel.appendChild(indicators)

    let currentSlide = 0
    const totalSlides = items.length

    items.forEach((item, index) => {
      if (index !== 0) {
        item.style.display = "none"
      } else {
        item.style.display = "block"
      }
    })

    const goToSlide = (slideIndex) => {
      if (slideIndex < 0) slideIndex = totalSlides - 1
      if (slideIndex >= totalSlides) slideIndex = 0

      items.forEach((item) => {
        item.style.display = "none"
        item.classList.remove("active")
      })

      items[slideIndex].style.display = "block"
      items[slideIndex].classList.add("active")

      const dots = indicators.querySelectorAll(".indicator")
      dots.forEach((dot) => dot.classList.remove("active"))
      dots[slideIndex].classList.add("active")

      currentSlide = slideIndex
    }

    prevButton.addEventListener("click", () => {
      goToSlide(currentSlide - 1)
    })

    nextButton.addEventListener("click", () => {
      goToSlide(currentSlide + 1)
    })

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
