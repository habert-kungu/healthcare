"use client";

import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-dark-300">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row">
        <div className="flex w-full flex-col items-center justify-center px-4 py-16 lg:w-1/2 lg:px-16">
          <div className="w-full max-w-md">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="CarePluse Logo"
              className="mb-10 h-12 w-fit"
            />

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Streamline Your Healthcare Journey
            </h1>

            <p className="mb-10 text-lg leading-relaxed text-gray-400">
              A comprehensive platform designed to enhance patient care and
              simplify healthcare management.
            </p>

            <Link
              href="/patient-form"
              className="inline-flex w-full items-center justify-center rounded-lg bg-green-500 px-8 py-4 text-base font-semibold text-white shadow-sm"
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
          </div>
        </div>

        <div className="hidden lg:block lg:w-1/2 ">
          <div className="relative h-full  animate-[green-glow_2s_infinite]">
            <Image
              src="/assets/images/dashboard.png"
              fill
              alt="Healthcare illustration"
              className="object-cover "
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-dark-300 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white">
            Comprehensive Healthcare Solutions
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg p-8 shadow-lg">
              <div className="mb-6 text-green-500">
                <svg
                  className="size-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-white">
                Patient Management
              </h3>
              <p className="text-gray-400 ">
                Streamline patient registration, scheduling, and record
                management with our intuitive interface.
              </p>
            </div>

            <div className="rounded-lg p-8 shadow-lg">
              <div className="mb-6 text-green-500">
                <svg
                  className="size-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-white">
                Appointment Scheduling
              </h3>
              <p className="text-gray-400 ">
                Efficiently manage appointments with automated reminders and
                calendar integration.
              </p>
            </div>

            <div className="rounded-lg p-8 shadow-lg">
              <div className="mb-6 text-green-500">
                <svg
                  className="size-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold text-white">
                Digital Records
              </h3>
              <p className="text-gray-400 ">
                Access and manage patient records securely with our digital
                documentation system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-dark-400 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-3xl font-bold tracking-tight text-white">
            How It Works
          </h2>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-green-500 text-white">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Register
              </h3>
              <p className="text-gray-400 ">
                Create your account and set up your profile
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-green-500 text-white">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Input Data
              </h3>
              <p className="text-gray-400 ">
                Enter patient information and medical records
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-green-500 text-white">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Manage</h3>
              <p className="text-gray-400 ">
                Schedule appointments and track progress
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-green-500 text-white">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Analyze</h3>
              <p className="text-gray-400 ">
                Review insights and improve care delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dark-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-white">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 ">
            Join thousands of healthcare providers who trust CarePluse for their
            patient management needs.
          </p>
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
        </div>
      </section>

      <footer className="border-t border-gray-800 bg-dark-300 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">© 2024 CarePluse</p>
            <Link
              href="/admin"
              className="text-sm font-medium text-green-500 hover:text-green-400"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
