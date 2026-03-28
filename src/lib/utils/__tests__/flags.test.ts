import { getCountryName, hasFlagAsset, getAvailableFlags } from "../flags";

describe("flags utils", () => {
  describe("getCountryName", () => {
    it("returns Dutch name for nl", () => {
      expect(getCountryName("nl")).toBe("Nederland");
    });

    it("returns English name for US", () => {
      expect(getCountryName("us")).toBe("United States");
    });

    it("is case-insensitive", () => {
      expect(getCountryName("NL")).toBe("Nederland");
      expect(getCountryName("Us")).toBe("United States");
    });

    it("returns uppercase code for unknown countries", () => {
      expect(getCountryName("xx")).toBe("XX");
    });
  });

  describe("hasFlagAsset", () => {
    it("returns true for known countries", () => {
      expect(hasFlagAsset("nl")).toBe(true);
      expect(hasFlagAsset("us")).toBe(true);
    });

    it("returns false for unknown codes", () => {
      expect(hasFlagAsset("xx")).toBe(false);
    });

    it("is case-insensitive", () => {
      expect(hasFlagAsset("NL")).toBe(true);
    });
  });

  describe("getAvailableFlags", () => {
    it("returns an array of country codes", () => {
      const flags = getAvailableFlags();
      expect(Array.isArray(flags)).toBe(true);
      expect(flags.length).toBeGreaterThan(200);
      expect(flags).toContain("nl");
      expect(flags).toContain("us");
    });
  });
});
