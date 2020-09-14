import axios from 'axios'

// THIS MODEL WAS CREADTED WITHOUT ANY WAY TO GET SINGLE QUOTE FROM THE API :).
export default class Quote {
    constructor(id) {
        this.id = id
    }

    async getQuote(query) {
        this.query = query;
        const url = 'https://type.fit/api/quotes';

        try {
            const res = await axios(url);
            const quote = await res.data.filter(el => el.text.includes(query))[this.id];
            this.text = quote.text;
            this.author = quote.author;
            
        } catch (error) {
            alert(error)
        }
    }
   
}