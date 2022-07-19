'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const nav = document.querySelector('.nav')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

// Can rewrite for loop because a node list has the forEach method
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
 // button scrolling
btnScrollTo.addEventListener('click', function(e) {
  const s1coords = section1.getBoundingClientRect()
  console.log(s1coords)

  console.log(e.target.getBoundingClientRect())

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset)

  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth)

  // scrolling
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)

  // calculating current scroll positions
  // window.scrollTo({
  //  left: s1coords.left + window.pageXOffset, 
  //  top: s1coords.top + window.pageYOffset,
  //  behavior: 'smooth'
  // })

  // for modern browsers only
  section1.scrollIntoView({behavior: 'smooth'})

})

/////////////////////////////////////////////

// Page Navigation

// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault()
//     const id = this.getAttribute('href')
//     console.log(id) 
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
// })

// Page Navigation using Event Delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault()
  // Matching Strategy
  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    console.log(id) 
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})

// Tabbed Component

// Not good practice. It runs the callback function each time and slows down the page
// tabs.forEach(t => t.addEventListener('click', () => {
//   console.log('TAB')
// }))

// Instead, use event delegation
tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab')
  // console.log(clicked)

  // Guard clause
  if(!clicked) return
  
  // Remove active classes for tab and content areas
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  
  tabsContent.forEach(tc => tc.classList.remove('operations__content--active'))
  
  // Activate Tab
  clicked.classList.add('operations__tab--active')
  

  // Activate content area
  // console.log(clicked.dataset.tab)

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

})

// Menu Fade Animation
const handleHover = function(e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this
    })
      logo.style.opacity = this
  }
}

// Passing an "argument" into a handler
nav.addEventListener('mouseover', handleHover.bind(0.5))

nav.addEventListener('mouseout', handleHover.bind(1))

// Sticky Navigation

/////////////////////////////////////////////

// Selecting Elements
// console.log(document.documentElement)
// console.log(document.head)
// console.log(document.body)

// const header = document.querySelector('.header')
// const allSelections = document.querySelectorAll('.section')

// console.log(allSelections)

// document.getElementById('section--1')
// const allButtons = document.getElementsByTagName('button')
// console.log(allButtons)

// console.log(document.getElementsByClassName('btn'))

// Creating and Inserting Elements
// Top way to create elements
// .insertAdjacentHTML

// const message = document.createElement('div')
// message.classList.add('cookie-message')
// message.textContent = 'We use cookies for improved functionality.'
// message.innerHTML = 'We use cookies for improved functionality. <button class="btn btn--close-cookie">Got it!</button>'
// // header.prepend(message)
// header.append(message)
// header.append(message.cloneNode(true))

// header.before(message)
// header.after(message)

// Delete Elements
// document.querySelector('.btn--close-cookie').addEventListener('click', function() {
//   message.remove()
  // old way to remove is below
  // message.parentElement.removeChild(message)
// })

// Styles
// message.style.backgroundColor = '#37383d'
// message.style.width = '120%'
// message.style.padding = '10px'

// console.log(message.style.height)
// console.log(message.style.backgroundColor)

// console.log(getComputedStyle(message).color)
// console.log(getComputedStyle(message).height)

// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'

// console.log(getComputedStyle(message).height)

// document.documentElement.style.setProperty('--color-primary', 'orangered')

// Attributes
// const logo = document.querySelector('.nav__logo')
// console.log(logo.alt)
// console.log(logo.className)

// logo.alt = 'Beautiful minialist logo'

// Non-Standard
// console.log(logo.designer)
// console.log(logo.getAttribute('designer'))
// logo.setAttribute('company', 'Bankist')


// console.log(logo.src)
// console.log(logo.getAttribute('src'))

// const link = document.querySelector('.nav__link--btn')
// console.log(link.href)
// console.log(link.getAttribute('href'))

// Data Attributes
// console.log(logo.dataset.versionNumber)

// Classes
// logo.classList.add('c', 'j')
// logo.classList.remove('c', 'j')
// logo.classList.toggle('c', 'j')
// logo.classList.contains('c', 'j') // not includes like in arrays

// Don't use! This will only give us 1 class and will over-ride
// logo.className = 'jonas'

// const btnScrollTo = document.querySelector('.btn--scroll-to')
// const section1 = document.querySelector('#section--1')

// btnScrollTo.addEventListener('click', function(e) {
//   const s1coords = section1.getBoundingClientRect()
//   console.log(s1coords)

//   console.log(e.target.getBoundingClientRect())

//   console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset)

//   console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth)

  // scrolling
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)

  // calculating current scroll positions
  // window.scrollTo({
  //  left: s1coords.left + window.pageXOffset, 
  //  top: s1coords.top + window.pageYOffset,
  //  behavior: 'smooth'
  // })

  // for modern browsers only
//   section1.scrollIntoView({behavior: 'smooth'})

// })

// const h1 = document.querySelector('h1')

// const alertH1 = function(e) {
//   alert('addEventListener: Great! You are reading the heading')

//   // removes event listener immediately after first occurance
//   // h1.removeEventListener('mouseenter', alertH1)
// }

// h1.addEventListener('mouseenter', alertH1)

// // removes event listener after specific time
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000)

// older way of calling event listeners
// h1.onmouseenter = function(e) {
//   alert('onmouseenter: Great! You are reading the heading')
// }

// rgb(255,255,255)
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min) 
// const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`

// document.querySelector('.nav__link').addEventListener('click', function(e) {
//  this.style.backgroundColor = randomColor()
//  console.log('LINK', e.target, e.currentTarget)
//  console.log(e.currentTarget === this)

 // stop event propogation
//  e.stopPropagation()
// })

// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor()
//   console.log('CONTAINER', e.target, e.currentTarget)
// })

// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor()
//   console.log('NAV', e.target, e.currentTarget)
// })

// DOM Traversing
// const h1 = document.querySelector('h1')

// // Going Downwards: child elements
// console.log(h1.querySelectorAll('.highlight'))
// console.log(h1.childNodes)
// console.log(h1.children)
// h1.firstElementChild.style.color = 'white'
// h1.lastElementChild.style.color = 'orangered'

// // Going upwards: selecting parents
// console.log(h1.parentNode)
// console.log(h1.parentElement)

// h1.closest('.header').style.background = 'var(--gradient-secondary)'

// h1.closest('h1').style.background = 'var(--gradient-primary)'

// // Going sideways: Siblings
// console.log(h1.previousElementSibling)
// console.log(h1.nextElementSibling)

// console.log(h1.previousSibling)
// console.log(h1.nextSibling)

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });
