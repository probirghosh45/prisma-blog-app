type IOptions = {
  page?: number | string;
  limit?: number | string;
  sortOrder?: string;
  sortBy?: string;
};

type IOptionsResult = {
  page: number;
  limit : number;
  skip: number;
  sortOrder : string;
  sortBy : string;
};

const paginationSortingHelper = (options: IOptions): IOptionsResult => {
  //  console.log(options)
  const page = Number(options.page) | 1;
  const limit = Number(options.limit) | 10;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export default paginationSortingHelper;
