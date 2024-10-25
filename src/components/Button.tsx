import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { decrement, increment } from "../states/counterSlice";

export function Button() {
  const counterState = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <h4>{counterState}</h4>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
