import { renderHook, act } from "@testing-library/react";
import useData from "./useData";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: [{ id: 1, name: "Test Node" }] }),
  })
) as jest.Mock;

describe("useData Hook", () => {
  it("fetches nodes successfully", async () => {
    const { result } = renderHook(() => useData());
    act(() => {
      result.current.run("Test Query");
    });
    expect(result.current.loading).toBe(true);
    await act(async () => {});
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([{ id: 1, name: "Test Node" }]);
  });

  it("handles fetch error", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Fetch error"))
    );
    const { result } = renderHook(() => useData());
    act(() => {
      result.current.run("Test Query");
    });
    await act(async () => {});
    expect(result.current.error?.message).toBe("Fetch error");
  });
});
