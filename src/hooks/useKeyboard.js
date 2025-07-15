import { useEffect } from 'react'

export const useKeyboard = (key, callback, deps = []) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === key) {
        callback(event)
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, deps)
}

export const useEscapeKey = (callback, deps = []) => {
  useKeyboard('Escape', callback, deps)
}

export const useEnterKey = (callback, deps = []) => {
  useKeyboard('Enter', callback, deps)
}