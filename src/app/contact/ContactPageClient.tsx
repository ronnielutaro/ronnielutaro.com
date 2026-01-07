"use client";

import Link from "next/link";
import { Mail, Linkedin, Twitter } from "lucide-react";

export default function ContactPageClient() {
  return (
    <main className="pt-32 pb-24">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 mb-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-white/50 mb-8">
            <Link href="/" className="hover:text-white/70 transition-colors">
              Home
            </Link>
            <span>›</span>
            <span className="text-white/70">Contact</span>
          </div>

          <h1
            className="text-white mb-8 text-4xl md:text-6xl lg:text-7xl"
            style={{
              fontWeight: "800",
              letterSpacing: "-0.03em",
              lineHeight: "1",
            }}
          >
            {`Let's Connect`}
          </h1>
          <p
            className="text-white/60 max-w-2xl mx-auto mb-12 text-base md:text-lg lg:text-xl"
            style={{ lineHeight: "1.7" }}
          >
            Whether you&apos;re looking to discuss an opportunity, seek guidance, explore a
            collaboration, or just connect, I&apos;m always open to meaningful
            conversations.
          </p>

          {/* Quick Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {/* Email */}
            <a
              href="mailto:ronnielutaro@gmail.com"
              className="group p-6 rounded-2xl transition-all hover:scale-[1.02]"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(96, 165, 250, 0.2)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto transition-colors group-hover:bg-blue-500/20"
                style={{ background: "rgba(96, 165, 250, 0.1)" }}
              >
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white mb-1" style={{ fontWeight: 600, fontSize: 16 }}>
                Email
              </h3>
              <p className="text-white/50" style={{ fontSize: 13 }}>
                ronnielutaro@gmail.com
              </p>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/ronnielutaro"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl transition-all hover:scale-[1.02]"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(96, 165, 250, 0.2)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto transition-colors group-hover:bg-blue-500/20"
                style={{ background: "rgba(96, 165, 250, 0.1)" }}
              >
                <Linkedin className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white mb-1" style={{ fontWeight: 600, fontSize: 16 }}>
                LinkedIn
              </h3>
              <p className="text-white/50" style={{ fontSize: 13 }}>
                Connect professionally
              </p>
            </a>

            {/* Twitter */}
            <a
              href="https://x.com/ronnielutaro"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl transition-all hover:scale-[1.02]"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(96, 165, 250, 0.2)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto transition-colors group-hover:bg-blue-500/20"
                style={{ background: "rgba(96, 165, 250, 0.1)" }}
              >
                <Twitter className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white mb-1" style={{ fontWeight: 600, fontSize: 16 }}>
                Twitter
              </h3>
              <p className="text-white/50" style={{ fontSize: 13 }}>
                Follow or DM me
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 mb-0">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.3), transparent)",
          }}
        />
      </div>
    </main>
  );
}
