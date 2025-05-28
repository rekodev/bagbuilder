'use server';

import { and, eq } from 'drizzle-orm';

import { db } from './db';
import { bag } from './schema';
import { tryCatch } from './utils';

export async function getBagDiscsAction(userId: number) {
  const result = tryCatch(
    db
      .select({ id: bag.id, discId: bag.discId })
      .from(bag)
      .where(eq(bag.userId, userId))
  );

  return result;
}

export async function addToBagAction({
  userId,
  discId
}: {
  userId: number;
  discId: string;
}) {
  const result = tryCatch(
    db.insert(bag).values({ userId, discId }).returning({ id: bag.id })
  );

  return result;
}

export async function removeFromBagAction({
  userId,
  discId
}: {
  userId: number;
  discId: string;
}) {
  const result = tryCatch(
    db
      .delete(bag)
      .where(and(eq(bag.userId, userId), eq(bag.discId, discId)))
      .returning({ id: bag.id })
  );

  return result;
}
