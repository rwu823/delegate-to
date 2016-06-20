import delegate from '../src'

document.getElementById('click-me')
  .addEventListener('click', delegate(t=> t.classList.contains('a'), (ev)=> {
    debugger
  }), false)
