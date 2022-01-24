import {removeError} from './view.js';

async function openItem(target, id, html, getItem) {
    let box = target.parentElement
    let button = target.previousElementSibling
    button.innerHTML = '-'
    box.insertAdjacentHTML('afterend', html)
    target.classList.add('open')
    target = target.parentElement.parentElement.lastElementChild
    await getItem(id, target)
}

function closeItem(target) {
    let but = target.previousElementSibling
    but.innerHTML = '+'
    let deleteTarget = target.parentElement.nextElementSibling
    deleteTarget.remove()
    target.classList.remove('open')
    let targetError = target.parentElement.nextElementSibling
    if (targetError.classList.contains('error')) {
        removeError(targetError)
    }
}

function addStarCondition(target, removeStr, addStr, fun) {
    fun(target)
    target.classList.remove(removeStr)
    target.classList.add(addStr)
}

export {openItem, closeItem, addStarCondition}