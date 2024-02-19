class apiFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
   
  }
  search() {
    //search fuinctionality for searching by product name
    //it constructs a MongoDB query filter for the name field
    //Initial this.query:  the query object within the apiFeatures class isn't simply a static Product.find() call. It's a MongoDB query builder object, which allows for chaining multiple query operations.

    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    //filter functionality for filtering category by removing other querys and also by price
    let querycopy = { ...this.querystr };
    const removeFields = ["page", "limit", "keyword"];

    removeFields.forEach((key) => {
      delete querycopy[key];
    });
    //for price

    let querystr = JSON.stringify(querycopy);

    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    this.query = this.query.find(JSON.parse(querystr));
    
    return this;
  }
  pagination(resultperpage) {
   
    const currentpage = this.querystr.page || 1;
    const skip = resultperpage * (currentpage - 1);
    this.query = this.query.limit(resultperpage).skip(skip);
    return this;
  }
}
module.exports = apiFeatures;
