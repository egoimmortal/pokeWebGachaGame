export const illustratedStore = defineStore('illustrated', {
    state: () => {
        return {
            totalAmount: 0,
            pageLimit: 20,
            pages: 0,
            currentPage: 0
        }
    },
    actions:{
        setPages(){
            this.pages = Math.ceil(this.totalAmount / this.pageLimit);
            console.log('illustratedStore pages = ', this.pages);
        }
    }
});