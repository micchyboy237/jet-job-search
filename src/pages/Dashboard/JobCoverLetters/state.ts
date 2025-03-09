import { atom } from "jotai";
import { ApiCoverLetterResponse, UIJobCoverLetter } from "./types";
import { vectorNodesAtom } from "../JobSearch/state";
import { VectorNode } from "../JobSearch/types";
import { GET_COVER_LETTERS_URL } from "./config";

const API_BASE_URL = "http://0.0.0.0:8002/api/v1/job/cover-letter";

const initialData: UIJobCoverLetter[] = [];

export const coverLettersAtom = atom(initialData);
export const coverLetterAtom = atom<{
  subject: string;
  message: string;
} | null>(null);

export const loadingAtom = atom(false);
export const errorAtom = atom<Error | null>(null);

export const fetchCoverLettersAtom = atom(null, async (get, set) => {
  set(loadingAtom, true);
  set(errorAtom, null);

  try {
    const response = await fetch(GET_COVER_LETTERS_URL);

    if (!response.ok) throw new Error(`Failed: ${response.statusText}`);
    const result: { data: ApiCoverLetterResponse[] } = await response.json();

    const coverLetters: UIJobCoverLetter[] = result.data.map((d) => ({
      id: d["id"],
      link: d["link"],
      posted_date: d["posted_date"],
      subject: d["response"]["subject"],
      message: d["response"]["message"],
    }));

    set(coverLettersAtom, coverLetters);
  } catch (err: any) {
    set(errorAtom, err);
    console.error(err);
  } finally {
    set(loadingAtom, false);
  }
});

export const relevantJobsAtom = atom<UIJobCoverLetter[]>((get) => {
  const coverLetters: UIJobCoverLetter[] = get(coverLettersAtom);
  const vectorNodes: VectorNode[] = get(vectorNodesAtom);

  const coverLettersObj: Record<string, UIJobCoverLetter> = coverLetters.reduce(
    (acc, item) => {
      acc[item.id] = item;
      return acc;
    },
    {}
  );

  const highScoreNodes = vectorNodes.filter((item) => item.score >= 0.7);

  const highScoreNodesWithCoverLetters: UIJobCoverLetter[] = highScoreNodes.map(
    (item) => {
      return {
        id: item.id,
        link: item.link,
        posted_date: item.posted_date,
        subject: coverLettersObj[item.id]?.subject || null,
        message: coverLettersObj[item.id]?.message || null,
      };
    }
  );

  return highScoreNodesWithCoverLetters;
});

export const fetchCoverLetterAtom = atom(
  null,
  async (get, set, jobId: string) => {
    set(loadingAtom, true);
    set(errorAtom, null);
    try {
      const response = await fetch(`${API_BASE_URL}/${jobId}`);
      if (!response.ok) throw new Error(`Failed: ${response.statusText}`);

      const result = await response.json();
      set(coverLetterAtom, {
        subject: result.subject,
        message: result.message,
      });
    } catch (err: any) {
      set(errorAtom, err);
      console.error(err);
    } finally {
      set(loadingAtom, false);
    }
  }
);

export const generateCoverLetterAtom = atom(
  null,
  async (get, set, jobId: string) => {
    set(loadingAtom, true);
    set(errorAtom, null);
    try {
      const response = await fetch(`${API_BASE_URL}/generate-cover-letter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id: jobId }),
      });
      if (!response.ok) throw new Error(`Failed: ${response.statusText}`);

      const result = await response.json();
      set(coverLetterAtom, {
        subject: result.subject,
        message: result.message,
      });
    } catch (err: any) {
      set(errorAtom, err);
      console.error(err);
    } finally {
      set(loadingAtom, false);
    }
  }
);
