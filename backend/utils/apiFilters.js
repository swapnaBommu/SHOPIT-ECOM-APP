class APIFilters {
    constructor(query, querystr){
        this.query = query;
        this.querystr = querystr;
    }
    search(){
        const keyword = this.querystr.keyword ? {
            name: {
                $regex:this.querystr.keyword, //this is for searching the name not exactly
                $options:'i' //case insensitive
            }
        } : {};
        this.query = this.query.find({...keyword});
        return this;
    }
    filters() {
        const queryCopy = {...this.querystr};

        //fields to remove 
        const fieldsToRemove = ["keyword","page"];
        fieldsToRemove.forEach((ele) => delete queryCopy[ele]);

        //Advance filter for price, ratings
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage){
        const currentPage = Number(this.querystr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query = this.query.limit(resPerPage).skip(skip);

        return this;
    }
}

export default APIFilters;