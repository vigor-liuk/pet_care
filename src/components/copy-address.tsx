"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { copyText } from "./copy-text";

const AddressContext = createContext({ status: "", copy: async () => {} });

export function AddressCopyProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState("");
  async function copy() {
    const address = document.getElementById("storeAddress");
    const copied = await copyText(address?.textContent ?? "", address);
    setStatus(
      copied
        ? "地址已复制，出发前记得带好牵引绳或航空箱。"
        : "已选中地址，请长按或使用 Ctrl/Cmd+C 复制。",
    );
  }
  return (
    <AddressContext.Provider value={{ status, copy }}>
      {children}
    </AddressContext.Provider>
  );
}

export function CopyAddressButton() {
  const { copy } = useContext(AddressContext);
  return (
    <button
      className="button outline"
      id="copyAddress"
      type="button"
      onClick={copy}
    >
      复制地址
    </button>
  );
}

export function AddressCopyStatus() {
  const { status } = useContext(AddressContext);
  return (
    <p
      id="addressCopyStatus"
      className="address-copy-status"
      role="status"
      aria-live="polite"
    >
      {status}
    </p>
  );
}
