"use client";
import { ThemeContext } from '@/context/ThemeContext'
import React, { useContext } from 'react'

const DarkModeToggle = () => {
    const {mode, toggle} = useContext(ThemeContext);
  return (
    <div className='w-[48px] h-6 flex items-center justify-between relative cursor-pointer p-0.5 rounded-[30px] border-[1.5px] border-solid border-[#53c28b70]'
    onClick={toggle}>
        <div className='text-xs;'>🌙</div>
        <div className='text-xs;'>🔆</div>
        <div
        className='w-[20px] h-[20px] bg-purple-600 absolute rounded-[50%]'
        style={mode === "light" ? { left: "2px" } : { right: "2px" }}
        />
    </div>
  )
}

export default DarkModeToggle