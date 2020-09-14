import { elements } from "./base";
import {quoteLimit} from './searchView'

export const toggleLikeBtn  = isLiked => {
    let color = isLiked ? '#dd2e44' : '#f0f0f0'
    let btn = document.querySelector('.lk-btn i');
    btn.style.color = color
}


export const renderLike = (like) => {
    const markup = `
        <li class="quotes-item">
            <a href="#quote-${like.id}">
                <span>${quoteLimit(like.text)}</span>
            </a>
        </li>
    `
    elements.likes.insertAdjacentHTML('beforeend', markup)
}


export const removeLike = (id) => {
    const like = document.querySelector(`.likes-panel a[href="#quote-${id}"]`).parentElement;
    if (like) {
        like.parentElement.removeChild(like)
    }
}