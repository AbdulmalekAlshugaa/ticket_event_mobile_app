import { all } from "redux-saga/effects";
import { eventMainRuntime } from "../../event/src/eventSaga";

export default function* rootSaga() {
  // put all your sagas here in order to add more sagas in cases if we scale up our app 
  yield all([ eventMainRuntime() ]);
}
