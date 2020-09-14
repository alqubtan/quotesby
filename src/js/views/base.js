export const elements = {
    form: document.querySelector('.search'),
    formInput: document.querySelector('.search-input'),
    searchResult: document.querySelector('.search-results'),
    resultList: document.querySelector('.results-list'),
    result: document.querySelector('.results'),
    quote: document.querySelector('.quote-view'),
    likes: document.querySelector('.likes-panel')
}


export const renderLoader = (parent) => {
    const loader = `
    <div class="loader" style="text-align:center">
        <img src="img/reload.svg"/>
    </div>`
    parent.insertAdjacentHTML('afterbegin', loader)
}


export const clearLoader = () => {
    const loader = document.querySelector('.loader');
    loader.parentNode.removeChild(loader)
}


