import { useEffect, useState } from 'react'

export default function ShowVideo(url:any){
    useEffect(()=>{

    },[url])
    return <>
    <iframe className="w-full h-[75vh]" src={url} frameBorder="0" allowFullScreen></iframe>
    </>
}