import { atom } from "jotai";
import { ApiCoverLetterResponse, UIJobCoverLetter } from "./types";
import { vectorNodesAtom } from "../JobGraph/state";
import { VectorNode } from "../JobGraph/types";
import { GET_COVER_LETTERS_URL } from "./config";

const initialData: UIJobCoverLetter[] = [];

export const coverLettersAtom = atom(initialData);
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
