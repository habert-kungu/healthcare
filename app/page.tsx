"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PasskeyModal } from "@/components/PasskeyModal";
// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";
  const [isPasskeyModalOpen, setIsPasskeyModalOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-dark-300">
      {isAdmin && (
        <PasskeyModal
          isOpen={isPasskeyModalOpen}
          setOpen={setIsPasskeyModalOpen}
        />
      )}

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row">
        <div className="flex w-full flex-col items-center justify-center px-4 py-16 lg:w-1/2 lg:px-16">
          <motion.div
            className="w-full max-w-md"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Image
                src="/assets/icons/logo-full.svg"
                height={1000}
                width={1000}
                alt="CarePluse Logo"
                className="mb-10 h-12 w-fit"
              />
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl"
              variants={itemVariants}
            >
              Streamline Your Healthcare Journey
            </motion.h1>

            <motion.p
              className="mb-10 text-lg leading-relaxed text-gray-400"
              variants={itemVariants}
            >
              A comprehensive platform designed to enhance patient care and
              simplify healthcare management through innovative technology.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link
                href="/patient-form"
                className="inline-flex w-full items-center justify-center rounded-lg bg-green-500 px-8 py-4 text-base font-semibold text-white shadow-sm transition-all hover:bg-green-600 hover:shadow-md"
              >
                Get Started
                <svg
                  className="ml-2 size-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="hidden lg:block lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative h-full animate-[green-glow_3s_infinite]">
            <Image
              src="/assets/images/dashboard.png"
              fill
              alt="Healthcare illustration"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-dark-300 py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold tracking-tight text-white"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true, margin: "-100px" }}
          >
            Comprehensive Healthcare Solutions
          </motion.h2>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),
                title: "Patient Management",
                description:
                  "Streamline patient registration, scheduling, and record management with our intuitive interface.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),
                title: "Appointment Scheduling",
                description:
                  "Efficiently manage appointments with automated reminders and calendar integration.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                ),
                title: "Digital Records",
                description:
                  "Access and manage patient records securely with our digital documentation system.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="rounded-lg bg-dark-400 p-8 shadow-lg transition-all hover:shadow-xl hover:translate-y-[-5px]"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <div className="mb-6 text-green-500">
                  <svg
                    className="size-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="mb-4 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-dark-400 py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="mb-16 text-center text-3xl font-bold tracking-tight text-white"
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true, margin: "-100px" }}
          >
            How It Works
          </motion.h2>

          <motion.div
            className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                step: "1",
                title: "Register",
                description: "Create your account and set up your profile",
              },
              {
                step: "2",
                title: "Input Data",
                description: "Enter patient information and medical records",
              },
              {
                step: "3",
                title: "Manage",
                description: "Schedule appointments and track progress",
              },
              {
                step: "4",
                title: "Analyze",
                description: "Review insights and improve care delivery",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
              >
                <motion.div
                  className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-green-500 text-white"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-2xl font-bold">{step.step}</span>
                </motion.div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dark-500 py-20">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          <motion.h2
            className="mb-6 text-3xl font-bold tracking-tight text-white"
            variants={itemVariants}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="mx-auto mb-10 max-w-2xl text-lg text-gray-400"
            variants={itemVariants}
          >
            Join thousands of healthcare providers who trust CarePluse for their
            patient management needs.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="/patient-form"
              className="inline-flex items-center rounded-lg bg-green-500 px-8 py-4 text-lg font-semibold text-white shadow-sm transition-all hover:bg-green-600 hover:shadow-md"
            >
              Start Your Journey
              <svg
                className="ml-2 size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <footer className="border-t border-gray-800 bg-dark-300 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500">
              © 2024 CarePluse. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-white"
              >
                Terms of Service
              </Link>
              <Link
                href="/?admin=true"
                className="text-sm font-medium text-green-500 hover:text-green-400"
              >
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
