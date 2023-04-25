import _ from 'lodash'
export default{
    data(){
        return{
           page: +this.$route.query.page || 1,
           pageSize: 5,
           pageCount: 0,
            allItems: [],
            items: []
        }
    },
    methods: {
        pageChangeHandler(page){
            this.$router.push(`${this.$route.path}?page=${page}`)
            this.items = this.allItems[page - 1] || this.allItems[0]
        },
        setupPagination(allItems){
            console.log('setupPagination', allItems)
            this.allItems = _.chunk(allItems, this.pageSize)
            console.log('setupPagination', this.allItems)
            this.pageCount = _.size(this.allItems)
            this.items = this.allItems[this.page - 1] || this.allItems[0]
            console.log(' this.items',  this.items)
        }
}
}