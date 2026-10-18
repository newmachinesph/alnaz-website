"use server";

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactState = {
  status: "idle" | "ok" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof Fields, string>>;
  /**
   * React resets an uncontrolled form once the action resolves, so a validation
   * error would otherwise wipe everything the user typed. Echoing the submitted
   * values back as defaultValues means the reset restores them instead.
   */
  values?: Fields;
};

const EMPTY: Fields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 80, email: 160, phone: 40, message: 4000 } as const;

function field(data: FormData, key: string, max: number): string {
  const raw = data.get(key);
  return typeof raw === "string" ? raw.trim().slice(0, max) : "";
}

export async function submitEnquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real users never see this input, bots fill everything.
  if (field(formData, "company_website", 100)) {
    return {
      status: "ok",
      message: "Thank you. We will be in touch shortly.",
      values: EMPTY,
    };
  }

  const values: Fields = {
    firstName: field(formData, "firstName", MAX.name),
    lastName: field(formData, "lastName", MAX.name),
    email: field(formData, "email", MAX.email),
    phone: field(formData, "phone", MAX.phone),
    message: field(formData, "message", MAX.message),
  };

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (!values.firstName) fieldErrors.firstName = "Tell us who you are.";
  if (!EMAIL.test(values.email)) fieldErrors.email = "Enter a valid email address.";
  if (values.message.length < 10) fieldErrors.message = "Add a little more detail.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  // ponytail: enquiries are logged server-side only. Wire an email provider
  // (Resend/SES) or a CRM webhook here — nothing else in this action changes.
  console.info("[enquiry]", values);

  return {
    status: "ok",
    message: "Thank you. Our desk will respond within one business day.",
    values: EMPTY,
  };
}
