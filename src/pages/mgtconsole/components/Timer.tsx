import { useEffect, useState } from 'react'

export const Timer = () => {
  const [counter, changeCounter] = useState(10)

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter === 0) {
        clearInterval(interval)
        document.location.reload()
      } else {
        changeCounter(prevCounter => prevCounter - 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [counter])

  return (
    <span>{counter}</span>
  )
}
