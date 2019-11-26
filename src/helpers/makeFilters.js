function makeFilters(checkboxes) {
  let filters = checkboxes.map(item => {
    if (item.checked) {
      return item.value;
    }
  });

  filters = filters.filter(item => item !== undefined);

  return filters;
}

export default makeFilters;