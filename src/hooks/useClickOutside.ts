"use client"

import { RefObject, useCallback, useEffect } from "react"


export const useClickOutside = (refs:RefObject<HTMLElement>[], callback:(e:MouseEvent) => void) => {


	const handleClick = useCallback((e:MouseEvent) => {
		let isClickInside = false

		for(let item of refs) {
			if(item.current && item.current.contains(e.target as HTMLElement)) {
				isClickInside = true
				break
			}
		}

		if(!isClickInside) {
			callback(e)
		}
	},[callback, refs])
	
	useEffect(() => {
		document.addEventListener('click', handleClick)
		return () => {
			document.removeEventListener('click', handleClick)
		}
	}, [handleClick])
}