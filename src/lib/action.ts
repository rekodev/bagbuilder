'use server';

import { and, eq } from 'drizzle-orm';

import { AiDiscRecommendation, Disc } from '@/types/disc';
import { openAiPrompt } from '@/constants/openai';

import { db } from './db';
import { bag } from './schema';
import { tryCatch } from './utils';
import { openAiClient } from './openai';

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

type GetAiDiscRecommendationsActionResp =
  | { ok: true; recommendations: Array<AiDiscRecommendation> }
  | { ok: false; error: Error };

export async function getAiDiscRecommendationsAction(
  discs: Array<Disc>
): Promise<GetAiDiscRecommendationsActionResp> {
  const bag = discs.map((disc) => ({
    name: disc.name,
    brand: disc.brand,
    category: disc.category
  }));

  const response = await tryCatch(
    openAiClient.responses.create({
      model: 'gpt-3.5-turbo',
      input: openAiPrompt(bag)
    })
  );

  if (response.error) return { ok: false, error: response.error };
  try {
    const jsonMatch = response.data.output_text.match(/\[[\s\S]*\]/);

    if (!jsonMatch) {
      return {
        ok: false,
        error: new Error('No valid JSON array found in AI response')
      };
    }

    const jsonString = jsonMatch[0];

    return {
      ok: true,
      recommendations: JSON.parse(jsonString)
    };
  } catch (parseError) {
    console.error(parseError);
    return {
      ok: false,
      error: new Error('Failed to parse AI response as JSON')
    };
  }
}
