"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { PasskeyModal } from "./PasskeyModal";

interface PasskeyModalWrapperProps {
  isAdmin: boolean;
}

export const PasskeyModalWrapper = ({ isAdmin }: PasskeyModalWrapperProps) => {
  const [isOpen, setIsOpen] = useState(isAdmin);
  const path = usePathname();

  return <PasskeyModal isOpen={isOpen} setOpen={setIsOpen} path={path} />;
}; 