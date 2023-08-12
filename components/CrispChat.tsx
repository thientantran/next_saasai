'use client'
import { Crisp } from 'crisp-sdk-web'
import { useEffect } from 'react'
export default function CrispChat() {
  useEffect(()=>{
    Crisp.configure("3dd902dc-ebbb-45d1-a164-8de3223e3a25")
  },[])
  return null
}
