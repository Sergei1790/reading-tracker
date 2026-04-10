export type Reading = {
  id: number;
  type: string;
  title: string;
  link: string | null;
  chapter: number;
  status: string;
  rating: number | null;
  image: string | null;
};