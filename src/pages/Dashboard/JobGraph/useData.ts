import { useState } from "react";
import { RAG_NODES_URL } from "./config";
import { VectorNode } from "./types";
import { DEFAULT_FILTERS } from "./constants";
import { toSnakeCase } from "../../../utils/transformers";

type QueryOptions = typeof DEFAULT_FILTERS;

type QueryNodesHook = {
  run: (query: string, options?: Partial<QueryOptions>) => void;
  cancel: () => void;
  data: VectorNode[];
  loading: boolean;
  error: Error | null;
};

type Options = Partial<QueryOptions>;

const useData = (): QueryNodesHook => {
  const [data, setData] = useState<Node[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [controller, setController] = useState<AbortController | null>(null);

  const fetchNodes = async (query: string, options?: Options) => {
    setLoading(true);
    setError(null);
    const abortController = new AbortController();
    setController(abortController);
    try {
      const finalOptions = { ...DEFAULT_FILTERS, ...options };
      const snakeCasedOptions = toSnakeCase(finalOptions);
      const response = await fetch(RAG_NODES_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          ...snakeCasedOptions,
        }),
        signal: abortController.signal,
      });
      if (!response.ok) throw new Error(`Failed: ${response.statusText}`);
      const result = await response.json();
      setData(result.data);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err);
        console.error(err);
      } else {
        console.info(err);
      }
    } finally {
      setLoading(false);
      setController(null);
    }
  };

  const run = (query: string, options?: Options) => {
    if (query) fetchNodes(query, options);
  };
  const cancel = () => {
    if (controller) {
      controller.abort();
      setLoading(false);
      setError(new Error("Request cancelled"));
    }
  };

  return { run, cancel, data, loading, error };
};

export default useData;
