export const initialState = {
  goals: [],
  filter: '',
  searchbar: ''
};

export function goalsReducer(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
