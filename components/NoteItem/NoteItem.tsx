"use client";
import { Note } from "@/types/note";
import css from "./NoteItem.module.css";
import Link from "next/link";

type Props = {
  note: Note;
};

export default function NoteItem({ note }: Props) {
  return (
    <div className={css.item}>
      <h3 className={css.title}>{note.title}</h3>
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>{note.createdAt}</p>
      <div className={css.actions}>
        <Link href={`/notes/${note.id}`}>View details</Link>
        <button className={css.deleteBtn}>Delete</button>
      </div>
    </div>
  );
}
