'use client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { Note } from '@/types/note';
import { useState, useEffect } from 'react';
import NoteForm from '@/components/NoteForm/NoteForm';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface NotesClientProps {
  notes: Note[];
  tag?: string;
}

export default function NotesClient({ notes, tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () => fetchNotes(page, tag),
    placeholderData: keepPreviousData,
    initialData: () => ({
      notes: notes || [],
      totalPages: notes?.length ? Math.ceil(notes.length / 10) : 1,
    }),
  });

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  return (
    <>
      <SearchBox value={search} onChange={handleSearchChange} />
      <button onClick={() => setIsModalOpen(true)}>+ Add Note</button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
      {isLoading && <p>Loading, please wait...</p>}
      {error && <p>Something went wrong.</p>}
      {!isLoading && !error && (
        <>
          {Array.isArray(data?.notes) && data.notes.length > 0 && (
            <NoteList notes={data.notes} />
          )}
          {(data?.totalPages ?? 0) > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data?.totalPages ?? 1}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </>
  );
}
