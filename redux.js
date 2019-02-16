const redux = require("redux");

const initialState = {
  counter: 0
};

//Reducer
const reduser = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COUNT":
      return {
        counter: state.counter + 1
      };
    case "SUB_COUNT":
      return {
        counter: state.counter - 1
      };
    case "ADD_NUMBER":
      return {
        counter: state.counter + action.value
      };
  }

  return state;
};

//Store
const store = redux.createStore(reduser);
store.subscribe(() => {
  console.log(store.getState());
});
//Actions

store.dispatch({ type: "ADD_COUNT" });
store.dispatch({ type: "SUB_COUNT" });
store.dispatch({ type: "ADD_NUMBER", value: 10 });
