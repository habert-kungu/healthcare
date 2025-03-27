"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

interface PasskeyModalProps {
  isOpen?: boolean;
  setOpen?: (open: boolean) => void;
  path?: string;
}

export const PasskeyModal = ({ isOpen, setOpen, path }: PasskeyModalProps) => {
  const router = useRouter();
  const currentPath = usePathname();
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const [internalOpen, setInternalOpen] = useState(false);

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  // Handle opening logic (controlled via props or internal state)
  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    const targetPath = path || currentPath;

    if (targetPath) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setInternalOpen(false);
        if (setOpen) setOpen(false);
        router.push("/admin");
      } else {
        setInternalOpen(true);
        if (setOpen) setOpen(true);
      }
    }
  }, [encryptedKey, currentPath, path, router, setOpen]);

  const closeModal = () => {
    setInternalOpen(false);
    if (setOpen) setOpen(false);
    router.push("/");
  };

  const validatePasskey = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();

    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem("accessKey", encryptedKey);

      setInternalOpen(false);
      if (setOpen) setOpen(false);
      router.push("/admin");
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  // If controlled via props, use the prop values
  const openState = isOpen !== undefined ? isOpen : internalOpen;

  return (
    <AlertDialog open={openState} onOpenChange={setOpen || setInternalOpen}>
      <AlertDialogContent className="shad-alert-dialog py-5">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin Access Verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={closeModal}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={validatePasskey}>
          <div>
            <InputOTP
              maxLength={6}
              value={passkey}
              onChange={(value) => {
                setPasskey(value);
                setError(""); // Clear error on input change
              }}
            >
              <InputOTPGroup className="shad-otp">
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot key={i} className="shad-otp-slot" index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>

            {error && (
              <p className="shad-error text-14-regular mt-4 flex justify-center">
                {error}
              </p>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogAction
              type="submit"
              className="shad-primary-btn w-full mt-6"
            >
              Enter Admin Passkey
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
