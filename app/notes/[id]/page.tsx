import { fetchNoteById } from '@/lib/api';
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';

export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string | string[] };
}) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
