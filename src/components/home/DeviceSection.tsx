"use client";

import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -80px 0px" },
    transition: { duration: 0.5, delay, ease: EASE },
  } as const;
}

function TvIcon() {
  return (
    <svg className="w-10 h-10 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
}

function ComputerIcon() {
  return (
    <svg className="w-10 h-10 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg className="w-10 h-10 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  );
}

function StreamingIcon() {
  return (
    <svg className="w-10 h-10 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z" />
    </svg>
  );
}

interface DeviceCategory {
  readonly title: string;
  readonly devices: readonly string[];
  readonly Icon: () => JSX.Element;
}

const DEVICES: readonly DeviceCategory[] = [
  {
    title: "Smart TV",
    devices: ["Samsung", "LG", "Sony", "Hisense", "TCL", "Philips"],
    Icon: TvIcon,
  },
  {
    title: "Computer",
    devices: ["Windows", "macOS", "Chrome", "Firefox", "Edge"],
    Icon: ComputerIcon,
  },
  {
    title: "Mobile & Tablet",
    devices: ["iPhone", "iPad", "Android Phone", "Android Tablet"],
    Icon: MobileIcon,
  },
  {
    title: "Streaming Devices",
    devices: ["Amazon Firestick", "Roku", "Apple TV", "Chromecast", "MAG Box", "Formuler"],
    Icon: StreamingIcon,
  },
];

export default function DeviceSection() {
  return (
    <section id="devices" className="bg-bg-primary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          {...fadeUp()}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-section-h2 uppercase text-text-primary">
            Available on Your Favourite Devices
          </h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            Watch your IPTV UK subscription on any device, anywhere. One
            subscription, all your screens.
          </p>
        </motion.div>

        {/* Device Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {DEVICES.map((category, i) => (
            <motion.div
              key={category.title}
              {...fadeUp(i * 0.1)}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center text-center p-6 rounded-xl border border-border-glass bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.07)] hover:border-[rgba(24,57,73,0.4)] hover:shadow-teal-glow-sm transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-4 p-4 rounded-full bg-[rgba(24,57,73,0.15)] border border-[rgba(24,57,73,0.25)]">
                <category.Icon />
              </div>

              {/* Title */}
              <h3 className="font-heading text-lg tracking-wider text-text-primary uppercase mb-3">
                {category.title}
              </h3>

              {/* Device List */}
              <ul className="space-y-1.5">
                {category.devices.map((device) => (
                  <li key={device} className="text-sm text-text-muted">
                    {device}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
