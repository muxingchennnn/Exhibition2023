// function: split and distribute keyword titles
const splitWord = function (el) {
  return (el.innerHTML = el.innerText
    .split('')
    .map((el) => (!el.trim() ? '<div>&nbsp</div>' : `<div>${el}</div>`))
    .join(''))
}
document.querySelectorAll('.info-key').forEach((el) => splitWord(el))
// -----------------------------------------------------------------------

// -----------------------------------------------------------------------
// function: click the subtitle to navigate to the corresponding text
const triggerEl = document.querySelectorAll('.navigation-trigger')
const destinationEl = document.querySelectorAll('.navigation-destination')

const navByClicking = () => {
  const navTo = function (triggerEl, destinationEl) {
    triggerEl.addEventListener('click', () => {
      document.documentElement.scrollBy({
        top:
          destinationEl.getBoundingClientRect().top -
          triggerEl.getBoundingClientRect().top,
        // left: 0,
        behavior: 'smooth',
      })
    })
  }

  for (let i = 0; i < triggerEl.length; i++) {
    navTo(triggerEl[i], destinationEl[i])
  }
}
navByClicking()
// -----------------------------------------------------------------------

// -----------------------------------------------------------------------
// function1: highlight the related subtitle of the text
// function1: highlight the subtitle hovered

const rowGap = 36

window.addEventListener('scroll', () => {
  triggerEl.forEach((el, i) => {
    let subtitlePosition = window
      .getComputedStyle(triggerEl[i], null)
      .getPropertyValue('top')

    let thresholdValue = Number(subtitlePosition.match(/(\d+)/)[0])
    if (
      destinationEl[i].getBoundingClientRect().top < thresholdValue &&
      destinationEl[i].getBoundingClientRect().bottom - rowGap > thresholdValue
    ) {
      triggerEl[i].style.color = '#ff7519'
      console.log('change subtitle color')
    } else {
      triggerEl[i].style.color = ''
      triggerEl[i].addEventListener(
        'mouseover',
        (el) => (el.style.color = '#ff7519')
      )
      triggerEl[i].addEventListener(
        'mouseout',
        (el) => (el.style.color = 'whitesmoke')
      )
    }
  })
})

// -----------------------------------------------------------------------

// -----------------------------------------------------------------------
// function: locomotive scrolling

// const locoScroll = new LocomotiveScroll({
//   el: document.querySelector('body'),
//   smooth: true,
// })

// -----------------------------------------------------------------------

// window.addEventListener('scroll', (e) => {
//   console.log('---')
//   console.log(window.scrollY)
//   console.log(`trigger element: ${triggerEl[0].getBoundingClientRect().top}`)
//   console.log(
//     `destination element top: ${destinationEl[0].getBoundingClientRect().top}`
//   )
//   console.log(
//     `destination element bottom: ${
//       destinationEl[0].getBoundingClientRect().bottom - 36
//     }`
//   )
//   console.log(`trigger element: ${getOffset(triggerEl[0]).top}`)
//   console.log(`destination element: ${getOffset(destinationEl[0]).top}`)
//   console.log('---')
// })

// function getOffset(el) {
//   const rect = el.getBoundingClientRect()
//   return {
//     left: rect.left + window.scrollX,
//     top: rect.top + window.scrollY,
//   }
// }
