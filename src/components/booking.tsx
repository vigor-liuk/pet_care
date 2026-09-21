"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ButtonHTMLAttributes,
  type FormEvent,
  type MouseEvent,
} from "react";
import { copyText } from "./copy-text";

const BookingContext = createContext<(service?: string) => void>(() => {});

export function BookingButton({
  service,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { service?: string }) {
  const open = useContext(BookingContext);
  return (
    <button {...props} type="button" onClick={() => open(service)}>
      {children}
    </button>
  );
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLButtonElement>(null);
  const [result, setResult] = useState("");
  const [minDate, setMinDate] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    if (result) copyRef.current?.focus();
    else if (dialogRef.current?.open)
      (
        formRef.current?.elements.namedItem("petName") as HTMLInputElement
      )?.focus();
  }, [result]);

  function open(service?: string) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    setMinDate(date.toISOString().slice(0, 10));
    setResult("");
    setCopyStatus("");
    if (service && formRef.current)
      (
        formRef.current.elements.namedItem("service") as HTMLSelectElement
      ).value = service;
    dialogRef.current?.showModal();
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(
      `你好，我想预约宠物洗护：\n宠物：${data.get("petName")}（${data.get("petType")}）\n服务：${data.get("service")}\n期望日期：${data.get("date")}\n期望时段：${data.get("time")}\n请帮我确认是否有空位，以及具体费用，谢谢！`,
    );
    setCopyStatus("");
  }

  function edit() {
    setResult("");
  }

  async function copy() {
    const copied = await copyText(result, resultRef.current);
    setCopyStatus(
      copied
        ? "已复制，可粘贴给门店。"
        : "请长按上方文字或使用 Ctrl/Cmd+C 复制。",
    );
  }

  function onBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      event.currentTarget.close();
  }

  return (
    <BookingContext.Provider value={open}>
      {children}
      <dialog
        id="booking"
        ref={dialogRef}
        aria-labelledby="bookingTitle"
        onClick={onBackdropClick}
      >
        <div className="dialog-top">
          <h2 id="bookingTitle">预约一份宠爱</h2>
          <button
            className="close"
            onClick={() => dialogRef.current?.close()}
            type="button"
            aria-label="关闭预约窗口"
          >
            ×
          </button>
        </div>
        <p className="dialog-intro">
          填写爱宠的洗护需求，生成信息后发给门店确认。此处不会直接提交预约。
        </p>
        <form
          id="bookingForm"
          ref={formRef}
          className={result ? "hidden" : undefined}
          onSubmit={submit}
        >
          <div className="form-grid">
            <label className="field">
              毛孩子的名字
              <input
                name="petName"
                placeholder="例如：豆豆"
                maxLength={30}
                required
              />
            </label>
            <label className="field">
              宠物类型
              <select name="petType">
                <option>狗狗</option>
                <option>猫咪</option>
              </select>
            </label>
            <label className="field full">
              想要的服务
              <select name="service">
                <option>香香基础洗护</option>
                <option>精致造型美容</option>
                <option>舒适 SPA 护理</option>
              </select>
            </label>
            <label className="field">
              期望日期
              <input type="date" name="date" min={minDate} required />
            </label>
            <label className="field">
              期望时段
              <select name="time">
                <option>10:00 — 12:00</option>
                <option>12:00 — 14:00</option>
                <option>14:00 — 16:00</option>
                <option>16:00 — 18:00</option>
                <option>18:00 — 20:00</option>
              </select>
            </label>
          </div>
          <button className="button submit" type="submit">
            生成预约信息 <span>↗</span>
          </button>
        </form>
        <div id="bookingResult" className={result ? undefined : "hidden"}>
          <p className="dialog-intro">
            信息已生成。请发送给门店，具体时间及价格以门店确认为准。
          </p>
          <div className="result" id="resultText" ref={resultRef} tabIndex={0}>
            {result}
          </div>
          <button
            className="button submit"
            id="copyButton"
            type="button"
            ref={copyRef}
            onClick={copy}
          >
            复制预约信息
          </button>
          <button
            className="button outline submit"
            id="editButton"
            type="button"
            onClick={edit}
          >
            返回修改
          </button>
          <p id="copyStatus" className="dialog-intro" role="status">
            {copyStatus}
          </p>
        </div>
      </dialog>
    </BookingContext.Provider>
  );
}
