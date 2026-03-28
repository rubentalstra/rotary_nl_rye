import { formatPhoneNumber, getInitials, isValidEmail } from "../communications";

describe("communications utils", () => {
  describe("formatPhoneNumber", () => {
    it("formats Dutch mobile numbers", () => {
      expect(formatPhoneNumber("+31612345678")).toBe("+31 6 1234 5678");
    });

    it("returns original string for non-Dutch numbers", () => {
      expect(formatPhoneNumber("+1234567890")).toBe("+1234567890");
    });

    it("handles empty string", () => {
      expect(formatPhoneNumber("")).toBe("");
    });
  });

  describe("isValidEmail", () => {
    it("validates correct emails", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name@domain.nl")).toBe(true);
    });

    it("rejects invalid emails", () => {
      expect(isValidEmail("not-an-email")).toBe(false);
      expect(isValidEmail("@domain.com")).toBe(false);
      expect(isValidEmail("")).toBe(false);
    });
  });

  describe("getInitials", () => {
    it("returns initials from full name", () => {
      expect(getInitials("John Doe")).toBe("JD");
    });

    it("handles single name", () => {
      expect(getInitials("John")).toBe("J");
    });

    it("limits to 2 characters", () => {
      expect(getInitials("John Michael Doe")).toBe("JM");
    });
  });
});
