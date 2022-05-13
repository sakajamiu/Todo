import { useState, useEffect } from 'react'

export  default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    media.onchange = () => {
      if(media.matches === matches){
        setMatches(media.matches)
      }
    }

  }, [matches, query])

  return matches
}