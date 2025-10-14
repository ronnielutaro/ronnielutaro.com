import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact | Ronnie Lutaro",
  description:
    "Get in touch with Ronnie Lutaro to discuss product opportunities, collaborations, or consulting.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}

