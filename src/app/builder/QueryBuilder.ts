import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }
  // searchMethod
  search(searchAbleFields: string[]) {
    if (this.query.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      })
    }
    return this
  }

  filter() {
    const queryObj = { ...this.query }

    // Exclude fields from filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
    excludeFields.forEach((el) => delete queryObj[el]) // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)
    return this
  }
}
