import { permanentRedirect } from "next/navigation";

// Keep old bookmarks working while project detail URLs remain unchanged.
export default function PortfolioPage() {
  permanentRedirect("/#portfolio");
}
