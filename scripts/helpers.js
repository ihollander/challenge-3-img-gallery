const arrayToGrid = (array, rowSize) => {
  return array.reduce((result, element, index) => {
    const row = index % rowSize;
    const col = (index - row) / rowSize;
    if (!result[col]) {
      result[col] = [];
    }
    result[col].push(element);
    return result;
  }, []);
};

export { arrayToGrid };
