import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ronnie Lutaro to discuss product opportunities, collaborations, or consulting.",
  openGraph: {
    title: 'Contact | Ronnie Lutaro',
    description: 'Get in touch with Ronnie Lutaro to discuss product opportunities, collaborations, or consulting.',
    url: 'https://ronnielutaro.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact | Ronnie Lutaro',
    description: 'Get in touch with Ronnie Lutaro to discuss product opportunities.',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}

