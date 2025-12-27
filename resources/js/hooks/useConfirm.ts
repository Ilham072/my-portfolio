import { useCallback, useState } from "react";

export function useConfirm() {
  const [open, setOpen] = useState(false);

  const confirm = useCallback(() => setOpen(true), []);
  const cancel = useCallback(() => setOpen(false), []);
  const close = useCallback(() => setOpen(false), []);

  return { open, confirm, cancel, close };
}
