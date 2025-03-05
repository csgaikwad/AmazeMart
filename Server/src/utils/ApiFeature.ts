import { PrismaClient, Prisma } from "@prisma/client";

interface QueryParamsTyepes {
  keyword?: string;
  price?: { gte?: number; lte?: number };
  rating?: { gte?: number; lte?: number };
  page?: string;
  limit?: string;
}

class ApiFeatures {
  query: Prisma.ProductFindManyArgs;
  queryStr: QueryParamsTyepes;

  constructor(query: Prisma.ProductFindManyArgs, queryStr: QueryParamsTyepes) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search(): this {
    if (this.queryStr.keyword) {
      this.query.where = {
        ...this.query.where,
        title: {
          contains: this.queryStr.keyword,
          mode: "insensitive", // Case-insensitive search
        },
      };
    }
    return this;
  }

  filter(): this {
    const queryCopy = { ...this.queryStr } as Record<string, any>;
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    if (queryCopy.price || queryCopy.rating) {
      this.query.where = {
        ...this.query.where,
        price: queryCopy.price
          ? {
              gte: queryCopy.price.gte,
              lte: queryCopy.price.lte,
            }
          : undefined,
        rating: queryCopy.rating
          ? {
              gte: queryCopy.rating.gte,
              lte: queryCopy.rating.lte,
            }
          : undefined,
      };
    }

    return this;
  }

  pagination(resultPerPage: number): this {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query.take = resultPerPage;
    this.query.skip = skip;

    return this;
  }
}

export default ApiFeatures;
