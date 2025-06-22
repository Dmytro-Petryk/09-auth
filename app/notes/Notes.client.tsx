"use client";
import { useNotesQuery } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient() {
  const { data, isLoading, error } = useNotesQuery();

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return <NoteList notes={data} />;
}
