import { Search } from './model/Search'
import {elements, renderLoader, clearLoader} from './views/base'
import * as searchView from './views/searchView'
import Quote from './model/Quote'
import * as quoteView from './views/quoteView'
import clipboard from 'clipboard'
import Likes from './model/like'
import * as likeView from './views/likeView'






export const state = {};


// ------------------------- Search contoler ------------------------

const controlSearch = async () => {
    // 0. get input from user
    const query = searchView.getInput();
    // 00. remove hash
    window.location.hash = '';

    if (query) {

    try {
        // 1. display loader
        renderLoader(elements.result);
        // 2. clear input 
        searchView.clearInput();
        // 3. clear previuos result
        searchView.clearResult()
        // 4. PUT the search object in state
        state.search = new Search(query);
        // 5. get the quotes and put it in the search object;
        await state.search.getQuotes();
        // 6. clear loader
        clearLoader(elements.searchResult);
        // 7. display the result to the UI
        searchView.renderQuotes(state.search.quotes);
    } catch (error) {
        alert('No Quotes 🙂!')
    }
        

    }
}


// Form event Listener
elements.form.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})


// Pagination Buttons 

elements.resultList.addEventListener('click', e => {
    const goToPage = parseInt(e.target.closest('.pg-btn').dataset.goto, 10);

    if (goToPage) {
        // clear previuos resulte
        searchView.clearResult();
        // render next
        searchView.renderQuotes(state.search.quotes, goToPage);
    }
})




// ------------------------- Quote contoler ------------------------


/* ID will be used in the quote model by (this keyword) */
const controlQuote = async () => {
    
    // get the id of the quote
    const id = window.location.hash.replace('#quote-', '');
    if (id || id === '0') {

        // 1. remove prev result
        quoteView.clearQuote();
        // 2. display loader
        renderLoader(elements.quote) 
        // 3. make new quote object
        state.quote = new Quote(id);
        // 4. get the quote and set it in quote object for current query
        await state.quote.getQuote(state.search.query)
        // 5. remove loader 
        clearLoader();
        // 6. render quote
        quoteView.displayQuote(
            state.quote,
            state.like.isLiked(id)
        )
        // 7. highlight selected
        quoteView.highLightSelected(state.quote.id)
    }

}



window.addEventListener('hashchange', controlQuote)



elements.quote.addEventListener('click', e => {
    if(e.target.matches('.cp-btn, .cp-btn *')) {
        new clipboard('.cp-btn')
        alert('copied to clipboard')
    } else if (e.target.matches('.lk-btn, .lk-btn *')) {
        // like controler
        controlLike();
    }
})



// ------------------------- Like contoler ------------------------

const controlLike = () => {
    // check if is there like obj  an create if not
    if (!state.like) state.like = new Likes();

    // get the ID of current quote
    const currentId = state.quote.id;
    // check quote is not liked ...
    if (!state.like.isLiked(currentId)) {
        // add new like
         const like = state.like.addLike(
            currentId,
            state.quote.text,
            state.quote.author,
            state.quote.query
        );

        // toggle like heart
        likeView.toggleLikeBtn(true)
        // display like to UI
        likeView.renderLike(like)
    } else if (state.like.isLiked(currentId)){
        // remove like 
        state.like.deleteLike(currentId)
        // toggle heart icon
        likeView.toggleLikeBtn(false)
        // remove like from UI
        likeView.removeLike(currentId)
    }
}


window.addEventListener('load', e => {
    // make new like obj
    state.like = new Likes();

    // get like from storage
    state.like.readData();

    // render Likes
    state.like.likes.forEach((like) => {
        likeView.renderLike(like)
        state.search = new Search(like.query)
    })
})

