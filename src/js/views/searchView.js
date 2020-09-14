import {elements} from './base'

export const getInput = () => elements.formInput.value

export const clearInput = () => elements.formInput.value = ''

export const clearResult = () =>  {
    // clear quotes
    elements.searchResult.innerHTML = '';
    // clear buttons
    elements.resultList.innerHTML = '';
}

export const quoteLimit = (text, limit = 16) => {
    const newText = [];
    if (text.length > limit) {
        text.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newText.push(cur)
            }
            return acc + cur.length
        }, 0)
        return `${newText.join(' ')}..`
    }

    return text
}

const renderButton = (page, type) => `
        <button class="pg-btn" data-goto=${type === 'next' ? page + 1 : page - 1}> Page ${type === 'next' ? page + 1 : page - 1}
             <i class="fas fa-angle-${type === 'next' ? 'right' : 'left'}"></i>
        </button>
    `

const renderButtons = (num0fresults, page, resultPerPage) => {
    let button;
    const pages = Math.ceil(num0fresults / resultPerPage)
    if (page === 1 && pages > page) {
        // render next button
        button = renderButton(page, 'next')
    } else if (page > 1 && pages > page) {
        // render next & prev button
        button = `${renderButton(page, 'prev')}
                  ${renderButton(page, 'next')}`
    } else if (page === pages && pages > 1) {
        // render prev button
        button = renderButton(page, 'prev')
    }

    elements.resultList.insertAdjacentHTML('afterbegin', button)
}

export const renderQuotes = (quotes, page = 1, resultPerPage = 10) => {
    
    let start = (page - 1) * resultPerPage;
    let end = page * resultPerPage;
    
    // render quotes
    quotes.slice(start, end).forEach((quote, i) => renderQuote(quote, start + i));
    
    // render buttons
    renderButtons(quotes.length, page, resultPerPage);
}


export const renderQuote = (quote, id) => {
    const markup = `
    <li class="quotes-item">
        <a href="#quote-${id}">
            <span>${quoteLimit(quote.text)}</span>
        </a>
    </li>`
    elements.searchResult.insertAdjacentHTML('beforeend', markup)
}