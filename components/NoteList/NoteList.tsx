"use client";
import { Note } from "@/types/note";
import NoteItem from "../NoteItem/NoteItem";
import css from "./NoteList.module.css";

type Props = {
  notes: Note[];
};

export default function NoteList({ notes }: Props) {
  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id}>
          <NoteItem note={note} />
        </li>
      ))}
    </ul>
  );
}
