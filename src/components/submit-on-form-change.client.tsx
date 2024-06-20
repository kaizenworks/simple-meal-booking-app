"use client"

import { useEffect } from "react";
import { useWatch } from "react-hook-form";

interface iSubmitOnFormChangeProps {
	debounceMs:number,
	onChange: Function,
	children: any
}

export default function SubmitOnFormChange({debounceMs, onChange,children}:iSubmitOnFormChangeProps) {

	const valChanges = useWatch();

	useEffect(() => {
		console.log(valChanges);
		let timeOut = setTimeout(()=>{
			onChange(valChanges);
		}, debounceMs);

		return () => {
			clearTimeout(timeOut);
		}

	}, [valChanges])


	return <>{ children }</>
}