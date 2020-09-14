import axios from 'axios'

export class Search {
    constructor(query) {
        this.query = query;
    }

    async getQuotes() {

        const url = 'https://type.fit/api/quotes';

        try {
            const res = await axios(url);
            const quotes = await res.data.filter(el => el.text.includes(this.query));
            if (quotes.length) {
                this.quotes = quotes;
            } else {
                throw new Error('no quotes found.')
            }
            
        } catch (error) {}
    }
}