[![version](https://img.shields.io/npm/v/delegate-to.svg?label=version)](https://www.npmjs.org/package/delegate-to) [![Build Status](https://img.shields.io/travis/rwu823/delegate-to.svg?branch=master)](https://travis-ci.org/rwu823/delegate-to/) [![Coverage](https://img.shields.io/coveralls/rwu823/delegate-to.svg)](https://coveralls.io/github/rwu823/delegate-to)

# delegate-to
DOM Event delegate, it works great in React, too

✅Clever API

✅Zero dependence

✅React Server-side rendering compatible

✅All browsers supported



## Compare with others

[zenorocha/delegate](https://github.com/zenorocha/delegate) is a popular library for delegate event:

```javascript
delegate(document.body, '.btn', 'click', function(e) {
  console.log(e.delegateTarget)
}, false)
```

Works in React.js

```javascript
render () {
  <div>
    <div ref="foo" />
  </div>
}

componentDidMount() {
  delegate(this.refs.foo, '.btn', 'click', this.handleClick, false)
}
```



### Switch to `delegate-to`

```javascript
document.body.addEventListener('click', delegate('.btn', e => {
  console.log(e.delegateTarget)
}), false)
```

Then in React.js

```javascript
render () {
  <div>
    <div onClick={delegate('.btn', this.handelClick)} />
  </div>
}
```

You can see the advantage in `delegate-to`

- Fewer API interface (only 2 arguments)

- Works with normal `addEventListener`

- React(.jsx) friendly

- Flexibly, custom match condition

  ​

## Installation

```sh
$ npm i --save delegate-to
```



## Examples

```javascript
import delegate from 'delegate-to'
  
render () {
  <div>
    <div onClick={delegate('.btn', this.handelClick)} />
  </div>
}
    
// custom match condition
render () {
  <div>
    <div onClick={delegate(target => target.classList.contains('btn'), this.handelClick)} />
  </div>
}
```


## API

### delegate([selector || condition func], [dispatchEvent])



## Browsers Supported

`delegate-to` use native `el.matchs` DOM API to match `CSS selector`, it works on **IE 9+** and All morden browsers, you can try custom match condition function if you need to work with old browsers.
