"use client"

import { useState, useCallback } from "react";

export function useNavber() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])
  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  return { isOpen, toggleMenu, closeMenu }
}