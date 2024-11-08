const parsedNumber = number => {
    if(typeof number !== "string") return;

    const parseNumber = parseInt(number);

    if(Number.isNaN(parseNumber)) return;

    return parseNumber;
}

export const parseMoviesFilter = ({minReleaseYear, maxReleaseYear})=> {
    const parsedMinReleaseYear = parsedNumber(minReleaseYear);
    const parsedMaxReleaseYear = parsedNumber(maxReleaseYear);

    return {
        minReleaseYear: parsedMinReleaseYear,
        maxReleaseYear: parsedMaxReleaseYear,
    }
};
