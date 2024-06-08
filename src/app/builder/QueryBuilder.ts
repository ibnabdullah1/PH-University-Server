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
    const searchTerm = this.query.searchTerm
    if (searchTerm) {
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

  //Filter Method
  filter() {
    const queryObj = { ...this.query }

    // Exclude fields from filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
    excludeFields.forEach((el) => delete queryObj[el]) // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)
    return this
  }

  // Sorting Method
  sort() {
    let sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt'
    this.modelQuery = this.modelQuery.sort(sort as string)
    return this
  }

  // Paginate Method
  paginate() {
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 10
    const skip = Number(this?.query?.skip) || 0

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)
    return this
  }

  // Fields Method
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v'
    this.modelQuery = this.modelQuery.select(fields)
    return this
  }
}

export default QueryBuilder
