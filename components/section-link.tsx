"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** Animate in-page navigation while preserving normal links between pages. */
export function SectionLink({ href, onClick, ...props }: SectionLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || (props.target && props.target !== "_self")) return;

    const destination = new URL(href, window.location.href);
    if (destination.origin !== window.location.origin || destination.pathname !== window.location.pathname || destination.search !== window.location.search || !destination.hash) return;

    let id: string;
    try { id = decodeURIComponent(destination.hash.slice(1)); } catch { return; }
    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    if (window.location.hash !== destination.hash) {
      window.history.pushState(null, "", destination.hash);
    }

    // Explicit behavior avoids the router's automatic instant anchor scrolling.
    section.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });

    // Keep keyboard navigation at the destination without interrupting the scroll.
    const hadTabIndex = section.hasAttribute("tabindex");
    if (!hadTabIndex) section.setAttribute("tabindex", "-1");
    section.focus({ preventScroll: true });
    if (!hadTabIndex) section.removeAttribute("tabindex");
  }

  return <Link {...props} href={href} onClick={handleClick} />;
}
