const sortOrderList = ["asc", "desc"];

export const parseSortParamsDecorator = sortByList => {
    const func = (req, res, next) => {
        const {sortOrder, sortBy} = req.query;
        const parsedSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : sortOrderList[0];
        const parsedSortBy = sortByList.includes(sortBy) ? sortBy : "_id";

        req.query = {...req.query, sortBy: parsedSortBy, sortOrder: parsedSortOrder};
        next();
    };

    return func;
}
