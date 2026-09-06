import type { Metadata } from "next";
import { Book } from "@/components/Book";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book the free proposal",
  description: site.description,
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return (
    <main className="border-b border-line">
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <Book compact />
      </div>
    </main>
  );
}
