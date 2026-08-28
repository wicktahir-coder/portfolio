/**
 * Production-grade email validation and genuineness verification
 * Hardened against ReDoS (Regular Expression Denial of Service)
 */

// Known disposable / temporary email provider domains
const DISPOSABLE_DOMAINS = new Set([
  "tempmail.com",
  "temp-mail.org",
  "temp-mail.io",
  "guerrillamail.com",
  "guerrillamailblock.com",
  "sharklasers.com",
  "grr.la",
  "guerrillamail.biz",
  "guerrillamail.de",
  "guerrillamail.net",
  "guerrillamail.org",
  "10minutemail.com",
  "10minutemail.net",
  "10minemail.com",
  "mailinator.com",
  "dispostable.com",
  "throwawaymail.com",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "trashmail.com",
  "trashmail.net",
  "trashmail.me",
  "burnermail.io",
  "getairmail.com",
  "mytemp.email",
  "fakemailgenerator.com",
  "crazymailing.com",
  "nada.ltd",
  "inboxkitten.com",
  "mohmal.com",
  "minutemailbox.com",
  "dropmail.me",
  "tempail.com",
  "emailondeck.com",
  "generator.email",
  "crazymail.com",
  "tmail.com",
  "maildrop.cc",
  "harakirimail.com",
  "mailcatch.com",
  "trash-mail.com",
  "throwawayemailaddress.com",
  "fakeinbox.com",
  "boun.cr",
  "discard.email",
  "discardmail.com",
  "spam4.me",
  "trbvm.com",
  "fakemail.net",
]);

// Fake / dummy / testing domains
const DUMMY_DOMAINS = new Set([
  "example.com",
  "example.org",
  "example.net",
  "test.com",
  "testing.com",
  "fake.com",
  "fakemail.com",
  "invalid.com",
  "sample.com",
  "dummy.com",
  "asdf.com",
  "qwerty.com",
  "none.com",
  "noemail.com",
  "xyz.com",
  "abc.com",
  "123.com",
]);

// Common domain typos and their corrections
const DOMAIN_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmil.com": "gmail.com",
  "gmeil.com": "gmail.com",
  "gnail.com": "gmail.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "yaho.co": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "hotamail.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "outloo.com": "outlook.com",
  "icoud.com": "icloud.com",
  "iclod.com": "icloud.com",
  "prton.me": "proton.me",
  "protonmial.com": "protonmail.com",
};

// Obvious dummy / placeholder usernames
const DUMMY_USERNAMES = new Set([
  "test",
  "testing",
  "asdf",
  "asdfgh",
  "qwerty",
  "admin",
  "administrator",
  "user",
  "noemail",
  "none",
  "null",
  "fake",
  "dummy",
  "sample",
  "aaa",
  "123",
  "12345",
  "123456",
  "abc",
  "xyz",
]);

import { portfolioData } from "@/data/portfolio";

export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  suggestion?: string;
}

/**
 * Validates whether an email address is syntactically valid and appears genuine.
 * Uses strict linear parsing to prevent ReDoS attacks.
 */
export function validateEmail(rawEmail: string): EmailValidationResult {
  if (!rawEmail || typeof rawEmail !== "string") {
    return { isValid: false, error: "Email address is required." };
  }

  const email = rawEmail.trim().toLowerCase();

  // Prevent entering the website owner's own email address
  const ownerEmail = portfolioData.personal.email?.trim().toLowerCase();
  if (ownerEmail && email === ownerEmail) {
    return {
      isValid: false,
      error: "You cannot enter my email address. Please provide your own email so I can get back to you.",
    };
  }

  // Strict length limits (RFC 5321)
  if (email.length < 5) {
    return { isValid: false, error: "Email address is too short." };
  }

  if (email.length > 254) {
    return { isValid: false, error: "Email address cannot exceed 254 characters." };
  }

  // Split into username and domain
  const atIndex = email.indexOf("@");
  const lastAtIndex = email.lastIndexOf("@");

  if (atIndex === -1 || atIndex !== lastAtIndex || atIndex === 0 || atIndex === email.length - 1) {
    return { isValid: false, error: "Email must contain exactly one '@' sign." };
  }

  const username = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (username.length > 64) {
    return { isValid: false, error: "Username portion cannot exceed 64 characters." };
  }

  // Linear ReDoS-safe character check for username
  const usernameRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
  if (!usernameRegex.test(username)) {
    return { isValid: false, error: "Invalid characters in email username." };
  }

  // Check domain structure
  const domainParts = domain.split(".");
  if (domainParts.length < 2) {
    return { isValid: false, error: "Email domain must include a top-level domain (e.g. .com)." };
  }

  for (const part of domainParts) {
    if (part.length === 0 || part.length > 63) {
      return { isValid: false, error: "Invalid domain segment length." };
    }
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(part)) {
      return { isValid: false, error: "Invalid domain name formatting." };
    }
  }

  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2 || !/^[a-z]+$/.test(tld)) {
    return { isValid: false, error: "Email must have a valid top-level domain." };
  }

  // Check for common domain typos
  if (DOMAIN_TYPOS[domain]) {
    const suggested = `${username}@${DOMAIN_TYPOS[domain]}`;
    return {
      isValid: false,
      error: `Did you mean ${suggested}?`,
      suggestion: suggested,
    };
  }

  // Check for disposable / throwaway email domains
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      isValid: false,
      error: "Temporary or disposable email addresses are not accepted.",
    };
  }

  // Check for dummy / testing domains
  if (DUMMY_DOMAINS.has(domain)) {
    return {
      isValid: false,
      error: "Please enter a genuine, active email address.",
    };
  }

  // Check for dummy / placeholder username
  if (DUMMY_USERNAMES.has(username)) {
    return {
      isValid: false,
      error: "Please provide a genuine email username instead of a placeholder.",
    };
  }

  // Check for repetitive characters e.g. "aaaaa@...", "11111@..."
  if (/^(.)\1{4,}@/.test(email)) {
    return {
      isValid: false,
      error: "Please provide a valid, active email address.",
    };
  }

  return { isValid: true };
}
