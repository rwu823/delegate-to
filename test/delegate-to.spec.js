import test from 'ava'
import jsdom from 'jsdom'
import delegate from '../src'

function setup() {
  return new Promise((resolve, reject) => {
    jsdom.env(`
<body>
  <div id="click-me">  
    <h1 id="h1">Click me</h1>
    <ul>
        <li id="li1">item 1</li>
        <li>item 2</li>
        <li>item 3</li>
    </ul>
  </div>
</body>`, (er, window) =>{
        resolve(window)
      })
  })
}

let win, click, text
test.before(async ()=> {
  win = await setup()

  click = win.document.createEvent('HTMLEvents')
  click.initEvent('click', true, false)
})

test('delegate li, should output nothing', assert => {
  win['click-me'].addEventListener('click', delegate('li', e=> {
    text = e.target.textContent.trim()
  }), false)

  win['click-me'].dispatchEvent(click)
  assert.is(text, undefined)

  win['h1'].dispatchEvent(click)
  assert.is(text, undefined)
})

test('delegate li, should output `item 1`', assert => {
  win['click-me'].addEventListener('click', delegate('#li', e=> {
    text = e.delegateTarget.textContent.trim()
  }), false)

  win['li1'].dispatchEvent(click)
  assert.is(text, 'item 1')
})

test('delegate li with custom condition, should output `item 1`', assert => {
  win['click-me'].addEventListener('click', delegate(target => target.id === 'li1', e=> {
    text = e.delegateTarget.textContent.trim()
  }), false)

  win['li1'].dispatchEvent(click)
  assert.is(text, 'item 1')
})
