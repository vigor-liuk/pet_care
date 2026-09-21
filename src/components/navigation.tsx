"use client";

import { useState } from "react";
import { BookingButton } from "./booking";

export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <nav className="wrap nav" aria-label="主导航">
        <a className="brand" href="#home" aria-label="爪爪首页">
          <span className="brand-mark">✿</span>
          <span className="brand-name">
            爪爪<small>PAWPAL PET CARE</small>
          </span>
        </a>
        <div className={`nav-links${open ? " open" : ""}`} id="navLinks">
          {[
            ["services", "洗护服务"],
            ["care", "我们的用心"],
            ["environment", "店内环境"],
            ["visit", "来店找我们"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </div>
        <BookingButton className="button">
          预约洗护 <span>↗</span>
        </BookingButton>
        <button
          className="menu"
          aria-label={open ? "收起导航" : "展开导航"}
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </nav>
    </header>
  );
}
