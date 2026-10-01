import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Globe,
  Network,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";

const tools = [
  {
    name: "WhatWeb",
    category: "Technology Fingerprinting",
    description:
      "Identify technologies, frameworks, CMS, servers, plugins, and other fingerprints exposed by a website.",
    icon: Globe,
    accent: "bg-soft-pink/30",
  },
  {
    name: "httpx",
    category: "HTTP Probing",
    description:
      "Probe web targets and collect useful HTTP information such as status, title, server, IP, and technologies.",
    icon: Search,
    accent: "bg-soft-pink/30",
  },
  {
    name: "Subfinder",
    category: "Subdomain Discovery",
    description:
      "Discover subdomains from passive sources to build a broader picture of a target's web presence.",
    icon: Network,
    accent: "bg-soft-pink/30",
  },
  {
    name: "Nmap",
    category: "Network Discovery",
    description:
      "Explore hosts, ports, services, and network exposure through structured network reconnaissance.",
    icon: Server,
    accent: "bg-soft-pink/30",
  },
  {
    name: "ffuf",
    category: "Content Discovery",
    description:
      "Discover hidden paths, directories, files, and web resources through controlled content enumeration.",
    icon: Terminal,
    accent: "bg-soft-pink/30",
  },
];

const principles = [
  {
    icon: Search,
    title: "Discover",
    description:
      "Collect information from different reconnaissance perspectives.",
  },
  {
    icon: BookOpen,
    title: "Understand",
    description:
      "Turn raw tool output into information that is easier to explore.",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    description:
      "Use reconnaissance as part of responsible security research.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-cream text-chocolate overflow-hidden">
      {/* HERO */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 md:w-125 md:h-125 bg-soft-pink/30 rounded-full blur-3xl -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-soft-pink/30 border border-soft-pink/50 text-strawberry px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              About ScanCake
            </div>

            <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Peel back the{" "}
              <span className="text-strawberry underline decoration-soft-pink decoration-wavy underline-offset-8">
                layers
              </span>{" "}
              of the web.
            </h1>

            <p className="mt-7 max-w-2xl mx-auto text-base sm:text-lg text-chocolate/70 leading-relaxed font-medium">
              SecLens is a unified security reconnaissance workspace that
              brings multiple open-source security tools into one simple,
              friendly, and organized interface.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-chocolate/60">
              <ShieldCheck className="w-5 h-5 text-strawberry" />
              Built for authorized security research and education
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS SECLENS */}
      <section className="py-20 border-t border-chocolate/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-strawberry">
                What is ScanCake
              </span>

              <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
                One interface.
                <br />
                Multiple perspectives.
              </h2>

              <p className="mt-5 text-chocolate/70 leading-relaxed font-medium">
                Security reconnaissance often means working with several
                command-line tools, different output formats, and scattered
                information. SecLens is designed to bring those workflows
                together without hiding the tools behind the interface.
              </p>

              <p className="mt-4 text-chocolate/70 leading-relaxed font-medium">
                Each engine has its own purpose. SecLens simply gives them a
                common place to live, explore, and understand their results.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-soft-pink/20 blur-3xl rounded-full" />

              <div className="relative bg-white/50 border border-soft-pink/40 rounded-4xl p-8 shadow-xl shadow-chocolate/5">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-soft-pink/40 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-strawberry" />
                  </div>

                  <h3 className="mt-5 text-xl font-black">
                    SecLens Architecture
                  </h3>

                  <div className="mt-7 space-y-3 text-left">
                    {[
                      ["WhatWeb", "Technology"],
                      ["httpx", "HTTP"],
                      ["Subfinder", "Subdomains"],
                      ["Nmap", "Network"],
                      ["ffuf", "Content"],
                    ].map(([tool, purpose]) => (
                      <div
                        key={tool}
                        className="flex items-center justify-between bg-cream border border-chocolate/5 rounded-xl px-4 py-3"
                      >
                        <span className="font-bold">{tool}</span>
                        <span className="text-xs font-bold text-strawberry">
                          {purpose}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="py-20 bg-soft-pink/10 border-y border-chocolate/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-strawberry">
              Recon Toolkit
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">
              The engines behind the layers.
            </h2>

            <p className="mt-4 text-chocolate/65 font-medium">
              Different tools, different perspectives, one organized
              workspace.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => {
              const Icon = tool.icon;

              return (
                <div
                  key={tool.name}
                  className="group bg-cream border border-soft-pink/40 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 ${tool.accent} rounded-2xl flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-strawberry" />
                  </div>

                  <div className="mt-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-xl font-black">{tool.name}</h3>

                      <span className="text-[10px] font-black uppercase tracking-wider text-strawberry bg-soft-pink/30 px-2.5 py-1 rounded-full">
                        Engine
                      </span>
                    </div>

                    <p className="mt-2 text-xs font-bold text-chocolate/50 uppercase tracking-wide">
                      {tool.category}
                    </p>

                    <p className="mt-4 text-sm text-chocolate/65 leading-relaxed font-medium">
                      {tool.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-black uppercase tracking-widest text-strawberry">
              Our Approach
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-black">
              Discover. Understand. Secure.
            </h2>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="text-center bg-white/40 border border-chocolate/5 rounded-3xl p-7"
                >
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-soft-pink/30 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-strawberry" />
                  </div>

                  <h3 className="mt-5 text-lg font-black">{item.title}</h3>

                  <p className="mt-3 text-sm text-chocolate/60 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-chocolate" />

        <div className="absolute -top-20 -right-20 w-72 h-72 bg-strawberry/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-soft-pink/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Sparkles className="mx-auto w-8 h-8 text-soft-pink" />

          <h2 className="mt-5 text-3xl sm:text-4xl font-black text-white">
            Ready to peel back the layers?
          </h2>

          <p className="mt-4 text-white/60 font-medium">
            Explore the reconnaissance tools inside ScanCake.
          </p>

          <Link
            href="/scan"
            className="mt-8 inline-flex items-center gap-2.5 bg-white text-chocolate hover:bg-soft-pink font-black px-7 py-3.5 rounded-full shadow-lg transition-all active:scale-95"
          >
            Explore SecLens
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}