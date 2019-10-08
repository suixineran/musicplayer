const log = console.log.bind(console)

const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
        return null
    } else {
        return element
    }
}

const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
        return []
    } else {
        return elements
    }
}

const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const removeClassAll = function(className) {
    let selector = '.' + className
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        // log('classname', className, e)
        e.classList.remove(className)
    }
}

const bindAll = function(selector, eventName, callback) {
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

// find 函数可以查找 element 的所有子元素
const find = function(element, selector) {
    let e = element.querySelector(selector)
    if (e === null) {
        let s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
        return null
    } else {
        return e
    }
}

const closestClass = function(element, className) {

    let e = element
    while (e !== null) {
        if (e.classList.contains(className)) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}

const closestId = function(element, idName) {

    let e = element
    while (e !== null) {
        // 判断 e 的 id 是否为 idName
        if (e.id === idName) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}

const closestTag = function(element, tagName) {

    let e = element
    while (e !== null) {
        // 判断 e 的 tagName 是否和传入的 tagName 相等
        if (e.tagName.toUpperCase() === tagName) {
            return e
        } else {
            e = e.parentElement
        }
    }
    return null
}

const closest = function(element, selector) {

    let c = selector[0]
    if (c === '.') {
        let className = selector.slice(1)
        return closestClass(element, className)
    } else if (c === '#') {
        let idName = selector.slice(1)
        return closestId(element, idName)
    } else {
        let tag = selector
        return closestTag(element, tag)
    }
}
