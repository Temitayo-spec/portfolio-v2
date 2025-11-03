'use client'

import React, {useEffect, useRef} from 'react'
import gsap from 'gsap'
import {SplitText} from 'gsap/SplitText'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrollTrigger)
}

interface MaskedTextRevealProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  duration?: number
  once?: boolean
  start?: string
  end?: string
}

export const MaskedTextReveal: React.FC<MaskedTextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.15,
  duration = 1,
  once = true,
  start = 'top 80%',
  end = 'top 60%',
}) => {
  const textRef = useRef<HTMLDivElement>(null)
  const splitInstanceRef = useRef<SplitText | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !textRef.current) return

    const ctx = gsap.context(() => {
      if (splitInstanceRef.current) {
        splitInstanceRef.current.revert()
      }

      const split = new SplitText(textRef.current, {
        type: 'lines',
        linesClass: 'split-line',
      })

      splitInstanceRef.current = split

      // Manually wrap lines with proper padding for descenders
      split.lines.forEach((line) => {
        const wrapper = document.createElement('span')
        wrapper.style.overflow = 'hidden'
        wrapper.style.display = 'inline-block'
        wrapper.style.paddingBottom = ''

        if (line.parentNode) {
          line.parentNode.insertBefore(wrapper, line)
          wrapper.appendChild(line)
        }
      })

      gsap.set(split.lines, {
        y: '110%',
        opacity: 0,
      })

      gsap.to(split.lines, {
        y: 0,
        opacity: 1,
        duration: duration,
        stagger: staggerDelay,
        ease: 'power3.out',
        delay: delay,
        scrollTrigger: {
          trigger: textRef.current,
          start: start,
          end: end,
          toggleActions: once ? 'play none none none' : 'play none none reset',
        },
      })
    }, textRef)

    return () => {
      ctx.revert()
      if (splitInstanceRef.current) {
        splitInstanceRef.current.revert()
        splitInstanceRef.current = null
      }
    }
  }, [text, delay, staggerDelay, duration, once, start, end])

  return (
    <span ref={textRef} className={`${className} inline-block`}>
      {text}
    </span>
  )
}
