'use client';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
export default function NoteModalPage() {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(Number(id)),
    enabled: !!id,
  });

  return (
    <Modal onClose={() => router.back()}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading note</p>}
      {!note ? (
        <p>Note not found</p>
      ) : (
        <>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </>
      )}
    </Modal>
  );
}
