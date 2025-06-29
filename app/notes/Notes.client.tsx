'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import NoteModal from '@/components/NoteModal/NoteModal';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { Note } from '@/types/note';
import { useState, useEffect } from 'react';

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

interface NotesResponse {
  data: Note[];
  totalPages: number;
}

interface NotesClientProps {
  notes: Note[];
}

export default function NotesClient({ notes }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, error } = useQuery<NotesResponse, Error>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, 10, debouncedSearch),
    placeholderData: {
      data: notes,
      totalPages: 1,
    },
  });

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  return (
    <>
      <SearchBox value={search} onChange={handleSearchChange} />
      <button onClick={() => setIsModalOpen(true)}>+ Add Note</button>
      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
      {isLoading && <p>Loading, please wait...</p>}
      {error && <p>Something went wrong.</p>}
      {!isLoading && !error && (
        <>
          {Array.isArray(data?.data) && data.data.length > 0 && (
            <NoteList notes={data.data} />
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
