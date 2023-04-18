// loading animation
const tl = gsap.timeline()

tl.from('.logo-exhibition', 1.6, {
  opacity: 0,
  y: 60,
  ease: Expo.easeInOut,
  delay: 0.5,
})

gsap.from('.divider', 1.6, {
  scaleX: 0,
  ease: 'power3.inOut',
  delay: 1,
})

tl.from('.event', 1.6, {
  opacity: 0,
  // x: 40,
  ease: Expo.easeInOut,
})

tl.from(
  '.program',
  1.6,
  {
    opacity: 0,
    // y: 60,
    ease: Expo.easeInOut,
  },
  '<'
)

tl.staggerFrom(
  '.candidate',
  1,
  {
    opacity: 0,
    y: 60,
    ease: Power2.easeOut,
  },
  0.2,
  '<'
)

tl.staggerFrom(
  '.project',
  1,
  {
    opacity: 0,
    y: 60,
    ease: Power2.easeOut,
  },
  0.2,
  '<'
)

tl.from(
  '.info',
  2,
  {
    opacity: 0,
    y: 60,
    ease: Expo.easeInOut,
  },
  '<0.5'
)

tl.staggerFrom(
  '.navigation-sites',
  2,
  {
    opacity: 0,
    x: 30,
    ease: Expo.easeInOut,
  },
  0.2,
  '<'
)

tl.staggerFrom(
  '.navigation-icons',
  2,
  {
    opacity: 0,
    x: 30,
    ease: Expo.easeInOut,
  },
  0.2,
  '<'
)

tl.from(
  '.logo-camd',
  2,
  {
    opacity: 0,
    x: 30,
    ease: Expo.easeInOut,
  },
  '<'
)

// detect the mobile devices
const isMobile = function () {
  return (
    navigator.maxTouchPoints > 0 && /Android|iPhone/i.test(navigator.userAgent)
  )
}
console.log(isMobile())

// hovering effect
if (!isMobile()) {
  const projects = document.querySelectorAll('.project')

  projects.forEach((item) => {
    const imageWrapper = item.querySelector('.image-wrapper')
    const imageWrapperBounds = imageWrapper.getBoundingClientRect()
    let itemBounds = item.getBoundingClientRect()

    const onMouseEnter = () => {
      gsap.set(imageWrapper, {
        scale: 0.8,
        // xPercent: 25,
        // yPercent: 50,
        // rotation: -15,
      })
      gsap.to(imageWrapper, { opacity: 1, scale: 1, yPercent: 0, rotation: 0 })
    }

    const onMouseLeave = () => {
      gsap.to(imageWrapper, {
        opacity: 0,
        // yPercent: -50,
        // xPercent: 25,
        scale: 0.8,
        // rotation: -15,
      })
    }

    const onMouseMove = ({ x, y }) => {
      let yOffset = itemBounds.top / imageWrapperBounds.height
      yOffset = gsap.utils.mapRange(0, 1.5, -150, 150, yOffset)
      gsap.to(imageWrapper, {
        duration: 1.25,
        x: Math.abs(x - itemBounds.left) - imageWrapperBounds.width / 1.55,
        y:
          Math.abs(y - itemBounds.top) -
          imageWrapperBounds.height / 2 -
          yOffset,
      })
    }

    item.addEventListener('mouseenter', onMouseEnter)
    item.addEventListener('mouseleave', onMouseLeave)
    item.addEventListener('mousemove', onMouseMove)
  })
}
