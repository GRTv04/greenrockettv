document.addEventListener("DOMContentLoaded", function () {
  // Select elements once for performance
  const backToTopButton = document.getElementById("backToTop")

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
