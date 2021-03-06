import { combineReducers } from "redux";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { alertReducer as alert } from "./alert/alertReducer";
import { characterReducer as character } from "./character/characterReducer";
import { combatReducer as combat } from "./combat/combatReducer";
import { loginReducer as login } from "./login/loginReducer";
import { registerReducer as register } from "./register/registerReducer";

const rootReducer = combineReducers({
  alert,
  character,
  combat,
  login,
  register
});

const loggerMiddleware = createLogger();

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, loggerMiddleware)
);

export type AppState = ReturnType<typeof rootReducer>;
