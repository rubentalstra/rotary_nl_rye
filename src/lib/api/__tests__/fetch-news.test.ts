import { fetchNewsItems } from "../fetch-news";

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("fetchNewsItems", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("fetches and transforms news items", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        news: [
          {
            id: 1,
            title: "Test News",
            description: "Test description",
            images: "https://example.com/image.jpg",
            isPdf: "no",
            pdf: null,
            text: [{ heading: "Section 1", body: [{ paragraph: ["Hello world"] }] }],
          },
          {
            id: 2,
            title: "PDF News",
            description: "PDF description",
            images: "https://example.com/pdf-image.jpg",
            isPdf: "yes",
            pdf: "https://example.com/doc.pdf",
          },
        ],
      }),
    });

    const items = await fetchNewsItems();

    expect(items).toHaveLength(2);
    expect(items[0].id).toBe(1);
    expect(items[0].title).toBe("Test News");
    expect(items[0].isPdf).toBe(false);
    expect(items[0].imageUrl).toBe("https://example.com/image.jpg");
    expect(items[1].isPdf).toBe(true);
    expect(items[1].pdfUrl).toBe("https://example.com/doc.pdf");
  });

  it("throws on HTTP error", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchNewsItems()).rejects.toThrow("HTTP error! status: 500");
  });
});
