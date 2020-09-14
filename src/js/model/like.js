
export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, text, author, query) {
        const like = {id, text, author, query};
        this.likes.push(like);

        // save 
        this.savedata();
        return like;
    }

    deleteLike(id) {
        const deleteIndex = this.likes.findIndex(el => el.id === id);
        this.likes.splice(deleteIndex, 1);
        this.savedata();
    }

    isLiked(id) {
        const isLiked = this.likes.findIndex(el => el.id === id);
        return isLiked !== -1;
    }

    num0fLikes() {
        return this.likes.length;
    }

    savedata() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readData() {
       const storage = JSON.parse(localStorage.getItem('likes'));

       if (storage) {
        this.likes = storage;
       }
    }
}