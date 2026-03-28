import {
  generateStudentId,
  generateId,
  convertRawNewsItem,
  groupByHomeCountry,
  groupByHostCountry,
  groupByYear,
  type Student,
  type RawNewsItem,
} from "../types";

describe("type utilities", () => {
  describe("generateStudentId", () => {
    it("generates kebab-case ID with type prefix", () => {
      expect(generateStudentId("John Doe", "inbound")).toBe("inbound-john-doe");
    });

    it("strips special characters", () => {
      expect(generateStudentId("José María", "outbound")).toBe("outbound-jos-mara");
    });
  });

  describe("generateId", () => {
    it("converts title to kebab-case", () => {
      expect(generateId("Hello World")).toBe("hello-world");
    });

    it("strips leading and trailing hyphens", () => {
      expect(generateId("--test--")).toBe("test");
    });
  });

  describe("convertRawNewsItem", () => {
    it("converts raw news to normalized format", () => {
      const raw: RawNewsItem = {
        id: 1,
        title: "Test",
        description: "Desc",
        images: "https://img.jpg",
        isPdf: "yes",
        pdf: "https://doc.pdf",
      };

      const result = convertRawNewsItem(raw);
      expect(result.isPdf).toBe(true);
      expect(result.pdfUrl).toBe("https://doc.pdf");
      expect(result.imageUrl).toBe("https://img.jpg");
    });

    it("handles non-PDF items", () => {
      const raw: RawNewsItem = {
        id: 2,
        title: "Article",
        description: "Content",
        images: "https://img.jpg",
        isPdf: "no",
        pdf: null,
      };

      const result = convertRawNewsItem(raw);
      expect(result.isPdf).toBe(false);
      expect(result.pdfUrl).toBeUndefined();
    });
  });

  describe("groupByHomeCountry", () => {
    const students: Student[] = [
      {
        id: "1",
        name: "A",
        bio: "",
        homeCountryCode: "ar",
        hostCountryCode: "nl",
        type: "inbound",
      },
      {
        id: "2",
        name: "B",
        bio: "",
        homeCountryCode: "it",
        hostCountryCode: "nl",
        type: "inbound",
      },
      {
        id: "3",
        name: "C",
        bio: "",
        homeCountryCode: "ar",
        hostCountryCode: "nl",
        type: "inbound",
      },
    ];

    it("groups students by home country", () => {
      const groups = groupByHomeCountry(students);
      expect(groups).toHaveLength(2);
      const arGroup = groups.find((g) => g.countryCode === "ar");
      expect(arGroup?.students).toHaveLength(2);
    });

    it("sorts groups alphabetically by country code", () => {
      const groups = groupByHomeCountry(students);
      expect(groups[0].countryCode).toBe("ar");
      expect(groups[1].countryCode).toBe("it");
    });
  });

  describe("groupByHostCountry", () => {
    const students: Student[] = [
      {
        id: "1",
        name: "A",
        bio: "",
        homeCountryCode: "nl",
        hostCountryCode: "us",
        type: "outbound",
      },
      {
        id: "2",
        name: "B",
        bio: "",
        homeCountryCode: "nl",
        hostCountryCode: "br",
        type: "outbound",
      },
    ];

    it("groups students by host country", () => {
      const groups = groupByHostCountry(students);
      expect(groups).toHaveLength(2);
    });
  });

  describe("groupByYear", () => {
    const students: Student[] = [
      {
        id: "1",
        name: "A",
        bio: "",
        homeCountryCode: "nl",
        hostCountryCode: "us",
        type: "rebound",
        year: "2024-2025",
      },
      {
        id: "2",
        name: "B",
        bio: "",
        homeCountryCode: "nl",
        hostCountryCode: "br",
        type: "rebound",
        year: "2023-2024",
      },
      {
        id: "3",
        name: "C",
        bio: "",
        homeCountryCode: "nl",
        hostCountryCode: "ar",
        type: "rebound",
        year: "2024-2025",
      },
    ];

    it("groups by year, newest first", () => {
      const groups = groupByYear(students);
      expect(groups).toHaveLength(2);
      expect(groups[0].year).toBe("2024-2025");
      expect(groups[0].students).toHaveLength(2);
    });
  });
});
