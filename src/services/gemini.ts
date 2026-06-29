import { BibleVerse, CounselResponse } from "../types";
import { findMatchingQuote, getPersonaResponse, CounselQuote } from "../data/quotesData";

export async function getPastoralCounsel(situation: string, _customApiKey?: string): Promise<CounselResponse> {
  // Find matching quote based on keywords
  const matchedQuote = findMatchingQuote(situation);

  // Generate personalized persona response with the quote
  const { comfort, verses, prayer } = getPersonaResponse(matchedQuote, situation);

  return {
    comfort,
    verses,
    prayer
  };
}