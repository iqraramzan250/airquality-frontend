import { memo, useCallback } from 'react'
import './Counter.css'

const Counter = memo(({ count, onIncrement }) => {
  const handleClick = useCallback(() => {
    onIncrement()
  }, [onIncrement])

  return (
    <div className="counter">
      <button 
        onClick={handleClick}
        aria-label={`Increment counter. Current count is ${count}`}
        className="counter-button"
      >
        count is {count}
      </button>
      <p className="counter-description">
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
    </div>
  )
})

Counter.displayName = 'Counter'

export default Counter
