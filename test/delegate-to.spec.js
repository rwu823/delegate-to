import delegate from '../src'

const win = window
const click = document.createEvent('HTMLEvents')
click.initEvent('click', true, false)

beforeEach(() => {
  document.body.innerHTML = `
    <div id="click-me">
      <h1 id="h1">Click me</h1>
      <ul>
          <li id="li1">item 1</li>
          <li>item 2</li>
          <li>item 3</li>
      </ul>
    </div>
  `
})

it('delegate li, should output nothing', () => {
  let text
  win['click-me'].addEventListener('click', delegate('li', e=> {
    text = e.target.textContent.trim()
  }), false)

  win['click-me'].dispatchEvent(click)
  expect(text).toBe(undefined)

  window.h1.dispatchEvent(click)
  expect(text).toBe(undefined)
})

it('delegate li, should output `item 1`', () => {
  let text
  win['click-me'].addEventListener('click', delegate('#li1', e=> {
    text = e.delegateTarget.textContent.trim()
  }), false)

  win['li1'].dispatchEvent(click)
  expect(text).toBe('item 1')
})

test('delegate li with custom condition, should output `item 1`', () => {
  let text
  win['click-me'].addEventListener('click', delegate(target => target.id === 'li1', e=> {
    text = e.delegateTarget.textContent.trim()
  }), false)

  win['li1'].dispatchEvent(click)
  expect(text).toBe('item 1')
})
