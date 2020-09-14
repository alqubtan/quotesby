import {elements} from './base'


export const displayQuote = (quote, isLiked) => {
    const markup = `
        <div class="quote">
            <div class="like-quote">
                <button class="lk-btn" title="add like">
                    <i class="fas fa-heart" style="color:${isLiked ? '#dd2e44' : '#f0f0f0'}"></i>
                </button>
            </div>
            <span class="quote-text">${quote.text}</span>
            <p class="author">${quote.author}</p>
            <button class="cp-btn" title="copy to clipboard" data-clipboard-target=".quote-text">
                <i class="far fa-clipboard"></i>
            </button>
    </div>
    `

    elements.quote.insertAdjacentHTML('afterbegin', markup)
}


export const clearQuote = () => elements.quote.innerHTML = ''

export const highLightSelected = (id) => {
    // remove  prev select
    document.querySelectorAll(`a[href*="#quote`).forEach(link =>
    link.classList.remove('activeQuote'))
    
    // highlight selected
    const selectedQuote = document.querySelector(`a[href="#quote-${id}"]`);
    selectedQuote.classList.add('activeQuote');
}


