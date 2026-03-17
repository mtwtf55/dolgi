import { useCounter } from "./store";

function App() {
  const counter = useCounter((state) => state.counter);
  const increment = useCounter((state) => state.increment);
  const decrement = useCounter((state) => state.decrement);

  return (
    <div>
      <h2 className="text-amber-950">Counter: {counter}</h2>
      <button
        onClick={increment}
        className="p-4 border-amber-300 bg-amber-700 hover:cursor-pointer"
      >
        Increment
      </button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default App;
