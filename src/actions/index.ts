"use server";

import type { ContactFormData, InquiryFormData } from "@/types";

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────

export async function submitContactForm(data: ContactFormData): Promise<{
  success: boolean;
  message: string;
}> {
  // Validate
  if (!data.name || !data.email || !data.message) {
    return { success: false, message: "Please fill in all required fields." };
  }
  if (!data.email.includes("@")) {
    return { success: false, message: "Please provide a valid email address." };
  }

  // In production: send via Resend, SendGrid, or similar
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ from: "...", to: "...", subject: "...", html: "..." });

  console.log("[ContactForm] Received:", {
    name: data.name,
    email: data.email,
    interest: data.interest,
    message: data.message.slice(0, 100),
  });

  // Simulate network latency
  await new Promise((r) => setTimeout(r, 600));

  return {
    success: true,
    message: "Your message has been received. A senior advisor will respond within 2 business hours.",
  };
}

// ─── PROPERTY INQUIRY ─────────────────────────────────────────────────────────

export async function submitPropertyInquiry(data: InquiryFormData): Promise<{
  success: boolean;
  message: string;
}> {
  if (!data.name || !data.email) {
    return { success: false, message: "Please fill in all required fields." };
  }

  console.log("[PropertyInquiry] Received for property:", data.propertyId, {
    name: data.name,
    email: data.email,
  });

  await new Promise((r) => setTimeout(r, 600));

  return {
    success: true,
    message: "Your inquiry has been sent to the listing agent. Expect a response within 2 hours.",
  };
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────

export async function subscribeNewsletter(email: string): Promise<{
  success: boolean;
  message: string;
}> {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please provide a valid email address." };
  }

  // In production: add to Mailchimp / Klaviyo / Resend Audience
  console.log("[Newsletter] Subscribed:", email);

  await new Promise((r) => setTimeout(r, 400));

  return {
    success: true,
    message: "Welcome to the inner circle. Your first briefing arrives Monday morning.",
  };
}

// ─── SCHEDULE VISIT ───────────────────────────────────────────────────────────

export async function scheduleVisit(data: {
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
}): Promise<{ success: boolean; message: string }> {
  console.log("[ScheduleVisit]", data);
  await new Promise((r) => setTimeout(r, 700));
  return {
    success: true,
    message: `Visit scheduled for ${data.preferredDate} at ${data.preferredTime}. Confirmation sent to ${data.email}.`,
  };
}
