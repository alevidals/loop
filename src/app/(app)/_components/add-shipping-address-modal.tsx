// import { useMediaQuery } from "@/hooks/use-media-query";
import { addOrUpdateShippingAddressAction } from "@/app/(auth)/_actions";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import type { ActionState } from "@/lib/auth/middleware";
import type { ShippingAddress } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/ui/drawer";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { Loader2 } from "lucide-react";
import {
  type ComponentProps,
  type Dispatch,
  type SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

type Props = {
  shippingAddress?: ShippingAddress;
  trigger: React.ReactNode;
  type: "add" | "edit";
};

type ShippingAddressFormProps = ComponentProps<"form"> & {
  shippingAddress?: ShippingAddress;
  type: "add" | "edit";
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function ShippingAddressForm({
  className,
  shippingAddress,
  type,
  setOpen,
}: ShippingAddressFormProps) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    addOrUpdateShippingAddressAction,
    {
      error: "",
      success: "",
    },
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      setOpen(false);
    }

    if (state.error) {
      toast.error(state.error);
    }
  }, [state, setOpen]);

  return (
    <form
      action={formAction}
      className={cn("grid items-start gap-4", className)}
    >
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="id" value={shippingAddress?.id} />
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={state.data?.name ?? shippingAddress?.name}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="surnames">Surnames</Label>
        <Input
          id="surnames"
          name="surnames"
          defaultValue={state.data?.surnames ?? shippingAddress?.surnames}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          name="country"
          defaultValue={state.data?.country ?? shippingAddress?.country}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="phone-number">Phone number</Label>
        <Input
          id="phone-number"
          name="phoneNumber"
          defaultValue={state.data?.phoneNumber ?? shippingAddress?.phoneNumber}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          defaultValue={state.data?.address ?? shippingAddress?.address}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="additional-address">Additional address</Label>
        <Input
          id="additional-address"
          name="additionalAddress"
          defaultValue={
            state.data?.additionalAddress ?? shippingAddress?.additionalAddress
          }
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="remarks">Remarks</Label>
        <Textarea
          id="remarks"
          name="remarks"
          defaultValue={state.data?.remarks ?? shippingAddress?.remarks}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="postal-code">Postal code</Label>
        <Input
          id="postal-code"
          name="postalCode"
          defaultValue={state.data?.postalCode ?? shippingAddress?.postalCode}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="population">Population</Label>
        <Input
          id="population"
          name="population"
          defaultValue={state.data?.population ?? shippingAddress?.population}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="province">Province</Label>
        <Input
          id="province"
          name="province"
          defaultValue={state.data?.province ?? shippingAddress?.province}
        />
      </div>

      {state?.error && (
        <div className="text-red-500 text-sm">{state.error}</div>
      )}

      <Button
        type="submit"
        className="bg-white text-black w-full hover:text-white text-base font-bold"
      >
        {pending ? (
          <>
            <Loader2 className="animate-spin mr-2 h-4 w-4" /> Loading...
          </>
        ) : (
          <>{type === "add" ? "Add" : "Update"}</>
        )}
      </Button>
    </form>
  );
}

export function AddShippingAddressModal({
  shippingAddress,
  trigger,
  type,
}: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const title =
    type === "add" ? "Add shipping address" : "Edit shipping address";
  const description =
    type === "add"
      ? "Add a new shipping address to your account."
      : "Edit the shipping address.";

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[80%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <ShippingAddressForm
            shippingAddress={shippingAddress}
            type={type}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <ShippingAddressForm
          setOpen={setOpen}
          className="px-4"
          type={type}
          shippingAddress={shippingAddress}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
