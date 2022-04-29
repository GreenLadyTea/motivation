export function selectBySearchBar(state) {
  if (state.searchBar !== '') {
    return state.goals.filter(
      element => element.title.toUpperCase().indexOf(state.searchBar.toUpperCase()) !== -1
    );
  }
  return state.goals;
}
