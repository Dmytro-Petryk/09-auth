import { fetchNoteById } from '@/lib/api';
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
interface NoteDetails {
  params: Promise<{ id: string }>;
}
export default async function NoteDetails({ params }: NoteDetails) {
  const rawId = Array.isArray((await params).id)
    ? (await params).id[0]
    : (await params).id;
  const id = Number(rawId);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}
