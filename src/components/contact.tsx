"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { submitEnquiry, type ContactState } from "@/app/actions";
import { MaskedLines, Reveal } from "@/components/motion-primitives";
import { CONTACT } from "@/lib/content";

const INITIAL: ContactState = { status: "idle" };

const inputBase =
  "peer w-full border-b border-cream/25 bg-transparent pb-3 pt-6 font-text text-base text-cream outline-none transition-colors duration-300 placeholder:text-transparent focus:border-signal";
const labelBase =
  "pointer-events-none absolute left-0 top-6 font-text text-sm text-cream/50 transition-all duration-300 peer-focus:top-0 peer-focus:text-[0.68rem] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-signal peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.68rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em]";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group mt-4 inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 font-text text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-500 hover:bg-signal hover:text-cream disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? "Sending" : "Send enquiry"}
      <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
        &rarr;
      </span>
    </button>
  );
}

function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-2 font-text text-xs text-signal">
      {children}
    </p>
  );
}

export function Contact() {
  const [state, formAction] = useActionState(submitEnquiry, INITIAL);
  const errors = state.fieldErrors ?? {};
  const values = state.values;

  return (
    <section id="contact" className="grain relative overflow-hidden bg-ink py-24 md:py-36">
      <div className="mx-auto grid max-w-[92rem] gap-16 px-6 md:px-10 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mb-8 flex items-center gap-3 font-text text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-cream/60">
              <span className="h-px w-10 bg-signal" />
              Contact
            </p>
          </Reveal>

          <MaskedLines
            lines={["Let's move", "something."]}
            className="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-extrabold text-cream"
          />

          <Reveal delay={0.1}>
            <address className="mt-12 space-y-8 not-italic">
              <div>
                <p className="font-text text-[0.68rem] uppercase tracking-[0.2em] text-cream/45">
                  Headquarters
                </p>
                <p className="mt-2 max-w-xs font-text text-base leading-relaxed text-cream/85">
                  {CONTACT.company}
                  <br />
                  {CONTACT.address}
                </p>
              </div>
              <div className="flex flex-wrap gap-x-12 gap-y-6">
                <div>
                  <p className="font-text text-[0.68rem] uppercase tracking-[0.2em] text-cream/45">
                    Telephone
                  </p>
                  <a
                    href={`tel:${CONTACT.telHref}`}
                    className="rule-link mt-2 inline-block font-display text-lg font-semibold text-cream"
                  >
                    {CONTACT.tel}
                  </a>
                </div>
                <div>
                  <p className="font-text text-[0.68rem] uppercase tracking-[0.2em] text-cream/45">
                    Email
                  </p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="rule-link mt-2 inline-block font-display text-lg font-semibold text-cream"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>
            </address>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <form action={formAction} className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {/* Honeypot — hidden from humans and from assistive tech. */}
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="hidden"
              />

              <div className="relative">
                <input
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  required
                  defaultValue={values?.firstName}
                  aria-invalid={Boolean(errors.firstName)}
                  className={inputBase}
                />
                <label htmlFor="firstName" className={labelBase}>
                  First name *
                </label>
                <FieldError>{errors.firstName}</FieldError>
              </div>

              <div className="relative">
                <input
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  defaultValue={values?.lastName}
                  className={inputBase}
                />
                <label htmlFor="lastName" className={labelBase}>
                  Last name
                </label>
              </div>

              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  defaultValue={values?.email}
                  aria-invalid={Boolean(errors.email)}
                  className={inputBase}
                />
                <label htmlFor="email" className={labelBase}>
                  Email *
                </label>
                <FieldError>{errors.email}</FieldError>
              </div>

              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  defaultValue={values?.phone}
                  className={inputBase}
                />
                <label htmlFor="phone" className={labelBase}>
                  Phone
                </label>
              </div>

              <div className="relative sm:col-span-2">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Message"
                  required
                  defaultValue={values?.message}
                  aria-invalid={Boolean(errors.message)}
                  className={`${inputBase} resize-none`}
                />
                <label htmlFor="message" className={labelBase}>
                  What do you need sourced? *
                </label>
                <FieldError>{errors.message}</FieldError>
              </div>

              <div className="sm:col-span-2">
                <SubmitButton />

                <AnimatePresence mode="wait">
                  {state.status !== "idle" && state.message && (
                    <motion.p
                      key={state.message}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      role="status"
                      className={`mt-6 font-text text-sm ${
                        state.status === "ok" ? "text-cream" : "text-signal"
                      }`}
                    >
                      {state.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
