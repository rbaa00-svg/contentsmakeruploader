import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

type Channel = 'instagram' | 'blog' | 'twitter' | 'youtube' | 'linkedin' | 'tiktok' | 'threads';

type GeneratedContent = Record<Channel, string>;

const channels: Channel[] = ['instagram', 'blog', 'twitter', 'youtube', 'linkedin', 'tiktok', 'threads'];

const fallbackTitles = {
  instagram: 'Instagram launch-ready caption',
  blog: 'Campaign story draft',
  twitter: 'X short-form post',
  youtube: 'YouTube title and description',
  linkedin: 'LinkedIn professional post',
  tiktok: 'TikTok hook and hashtags',
  threads: 'Threads conversation starter',
} satisfies Record<Channel, string>;

function buildPrompt(keyword: string, concept: string) {
  return `You are an expert social media manager. Create promotional content for a product or service.

Keyword: ${keyword}
Concept/Tone: ${concept}

Generate content for 7 platforms: Instagram, Naver Blog, Twitter/X, YouTube, LinkedIn, TikTok, and Threads.
Format the response exactly with these labels:

[INSTAGRAM]
(Instagram caption with emojis and hashtags)

[BLOG]
(Naver Blog title on the first line, then the body)

[TWITTER]
(Short engaging X post under 280 characters)

[YOUTUBE]
(YouTube title on the first line, then the description)

[LINKEDIN]
(Professional LinkedIn post)

[TIKTOK]
(Short catchy TikTok caption with hashtags)

[THREADS]
(Conversational Threads post)`;
}

function emptyContent(): GeneratedContent {
  return {
    instagram: '',
    blog: '',
    twitter: '',
    youtube: '',
    linkedin: '',
    tiktok: '',
    threads: '',
  };
}

function parseStructuredContent(rawText: string): GeneratedContent {
  const matchers: Record<Channel, RegExp> = {
    instagram: /\[INSTAGRAM\]\s*([\s\S]*?)(?=\n\[BLOG\]|$)/i,
    blog: /\[BLOG\]\s*([\s\S]*?)(?=\n\[TWITTER\]|$)/i,
    twitter: /\[TWITTER\]\s*([\s\S]*?)(?=\n\[YOUTUBE\]|$)/i,
    youtube: /\[YOUTUBE\]\s*([\s\S]*?)(?=\n\[LINKEDIN\]|$)/i,
    linkedin: /\[LINKEDIN\]\s*([\s\S]*?)(?=\n\[TIKTOK\]|$)/i,
    tiktok: /\[TIKTOK\]\s*([\s\S]*?)(?=\n\[THREADS\]|$)/i,
    threads: /\[THREADS\]\s*([\s\S]*?)$/i,
  };

  const parsed = emptyContent();

  for (const channel of channels) {
    const match = rawText.match(matchers[channel]);
    parsed[channel] = match?.[1]?.trim() ?? '';
  }

  return parsed;
}

function buildFallbackContent(keyword: string, concept: string): GeneratedContent {
  return {
    instagram: `Launching ${keyword} with a ${concept.toLowerCase()} tone.\n\nHighlight the biggest benefit in the first line, add one clear CTA, and close with campaign hashtags.\n\n#${keyword.replace(/\s+/g, '')} #Promo #Launch`,
    blog: `${keyword}: campaign draft for ${concept}\n\nOpen with the customer problem, explain the new value clearly, and finish with a concrete next step such as a signup or inquiry.`,
    twitter: `${keyword} is ready for launch. ${concept} message, clear value, and one CTA. Share the key outcome in one sentence and keep it tight.`,
    youtube: `${keyword} launch overview\nShow the transformation ${keyword} delivers, mention why it matters now, and end with the next action viewers should take.`,
    linkedin: `We're preparing a ${concept.toLowerCase()} campaign for ${keyword}. Focus on the business value, supporting proof, and a clear invitation to connect or learn more.`,
    tiktok: `${keyword} in one sharp hook. Lead with the surprise, show the payoff fast, and finish with punchy hashtags.\n\n#${keyword.replace(/\s+/g, '')} #ForYou #Promo`,
    threads: `Working on a ${concept.toLowerCase()} launch for ${keyword}. Start with the angle people will react to first, then turn it into a short conversation starter.`,
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { keyword?: string; concept?: string };
    const keyword = body.keyword?.trim();
    const concept = body.concept?.trim();

    if (!keyword || !concept) {
      return NextResponse.json({ error: 'Keyword and concept are required.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        content: buildFallbackContent(keyword, concept),
        warning: 'No Gemini API key is configured, so promo.pikkto used fallback starter copy.',
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: buildPrompt(keyword, concept),
      });

      const rawText = response.text?.trim() ?? '';
      const content = parseStructuredContent(rawText);
      const hasAllChannels = channels.every((channel) => content[channel].length > 0);

      if (!rawText || !hasAllChannels) {
        return NextResponse.json({
          content: buildFallbackContent(keyword, concept),
          warning: 'Gemini returned an incomplete response, so fallback starter copy was used instead.',
        });
      }

      return NextResponse.json({ content });
    } catch {
      return NextResponse.json({
        content: buildFallbackContent(keyword, concept),
        warning: 'Gemini generation failed, so fallback starter copy was used instead.',
      });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }
}
