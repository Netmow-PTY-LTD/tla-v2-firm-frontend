import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";

export function Modal({
  buttonName,
  title,
  description,
  children,
  open,
  onOpenChange,
  width = "max-w-[500px]",
  height = "",
  overflowY = "",
  overlayBg = "",
  paddingTop = "",
  paddingLeft = "",
  paddingRight = "",
  border = "",
  showCloseButton = false,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="z-[99999]">
      <DialogOverlay overlayBg={overlayBg} className="bg-transparent" />

      {buttonName && (
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-[var(--primary-color)] hover:bg-[var(--color-black)] px-4 py-3 text-sm rounded-lg text-white mt-5 hover:text-white cursor-pointer transition-all duration-300"
          >
            {buttonName}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent
        className={`${width} ${height} w-full z-[9999] ${paddingTop} ${paddingLeft} ${paddingRight} ${border} ${
          showCloseButton ? "[&>button.absolute.top-4.right-4]:hidden" : ""
        }`}
      >
        {showCloseButton && (
          <DialogClose asChild>
            <button className="absolute top-3 right-3 p-2 rounded-full bg-white hover:bg-gray-100 transition">
              <X className="w-5 h-5 text-gray-400 hover:text-black transition-all duration-300" />
            </button>
          </DialogClose>
        )}
        {/* Dialog Header */}
        <DialogHeader hidden>
          <DialogTitle>
            {title ? title : <VisuallyHidden>Dialog</VisuallyHidden>}
          </DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : (
            <DialogDescription>
              <VisuallyHidden>No additional information</VisuallyHidden>
            </DialogDescription>
          )}
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
