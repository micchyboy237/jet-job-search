export interface ApiCoverLetterResponse {
  id: string;
  link: string;
  posted_date: string;
  text: string;
  response: {
    subject: string;
    message: string;
  };
}

export interface UIJobCoverLetter {
  id: string;
  link: string;
  posted_date: string;
  subject: string | null;
  message: string | null;
}
