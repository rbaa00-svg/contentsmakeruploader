'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MultiChannelPreview } from '@/components/MultiChannelPreview';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, CheckCircle2, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useRouter } from 'next/navigation';

const steps = [
  { id: 1, name: 'Keyword' },
  { id: 2, name: 'Concept' },
  { id: 3, name: 'Generate' },
  { id: 4, name: 'Review' },
  { id: 5, name: 'Schedule' },
];

export default function CreateContentPage() {
  const router = useRouter();
  const {
    step, setStep, nextStep, prevStep,
    keyword, setKeyword,
    concept, setConcept,
    generatedContent, setGeneratedContent,
    isGenerating, setIsGenerating,
    scheduleDate, setScheduleDate,
    addScheduledPost, resetEditor
  } = useAppStore();

  const handleGenerate = async () => {
    nextStep(); // Go to step 3 (Generate)
    setIsGenerating(true);
    
    // Reset content
    setGeneratedContent('instagram', '');
    setGeneratedContent('blog', '');
    setGeneratedContent('twitter', '');
    setGeneratedContent('youtube', '');
    setGeneratedContent('linkedin', '');
    setGeneratedContent('tiktok', '');
    setGeneratedContent('threads', '');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      const prompt = `You are an expert social media manager. Create promotional content for a product/service based on the following:
Keyword: ${keyword}
Concept/Tone: ${concept}

Please generate content for 7 different platforms: Instagram, Naver Blog, Twitter, YouTube, LinkedIn, TikTok, and Threads.
Format the output EXACTLY like this:

[INSTAGRAM]
(Write the Instagram caption here, including emojis and hashtags)

[BLOG]
(Write the Naver Blog post here. First line should be the title. Then the body.)

[TWITTER]
(Write a short, engaging tweet here, under 280 characters)

[YOUTUBE]
(Write the YouTube video title on the first line. Then the video description below it.)

[LINKEDIN]
(Write a professional LinkedIn post here)

[TIKTOK]
(Write a short, catchy TikTok video caption and hashtags)

[THREADS]
(Write a conversational, engaging Threads post)`;

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      let fullText = '';
      for await (const chunk of responseStream) {
        fullText += chunk.text;
        
        // Parse the text as it streams
        const instaMatch = fullText.match(/\[INSTAGRAM\]\n([\s\S]*?)(?=\n\[BLOG\]|$)/);
        const blogMatch = fullText.match(/\[BLOG\]\n([\s\S]*?)(?=\n\[TWITTER\]|$)/);
        const twitterMatch = fullText.match(/\[TWITTER\]\n([\s\S]*?)(?=\n\[YOUTUBE\]|$)/);
        const youtubeMatch = fullText.match(/\[YOUTUBE\]\n([\s\S]*?)(?=\n\[LINKEDIN\]|$)/);
        const linkedinMatch = fullText.match(/\[LINKEDIN\]\n([\s\S]*?)(?=\n\[TIKTOK\]|$)/);
        const tiktokMatch = fullText.match(/\[TIKTOK\]\n([\s\S]*?)(?=\n\[THREADS\]|$)/);
        const threadsMatch = fullText.match(/\[THREADS\]\n([\s\S]*?)$/);

        if (instaMatch) setGeneratedContent('instagram', instaMatch[1].trim());
        if (blogMatch) setGeneratedContent('blog', blogMatch[1].trim());
        if (twitterMatch) setGeneratedContent('twitter', twitterMatch[1].trim());
        if (youtubeMatch) setGeneratedContent('youtube', youtubeMatch[1].trim());
        if (linkedinMatch) setGeneratedContent('linkedin', linkedinMatch[1].trim());
        if (tiktokMatch) setGeneratedContent('tiktok', tiktokMatch[1].trim());
        if (threadsMatch) setGeneratedContent('threads', threadsMatch[1].trim());
      }
      
      setIsGenerating(false);
      nextStep(); // Go to step 4 (Review)
    } catch (error) {
      console.error("Error generating content:", error);
      setIsGenerating(false);
      // Handle error appropriately in a real app
    }
  };

  const handleSchedule = () => {
    if (!scheduleDate) return;
    
    // Add posts for each channel
    ['instagram', 'blog', 'twitter', 'youtube', 'linkedin', 'tiktok', 'threads'].forEach((channel) => {
      addScheduledPost({
        id: Math.random().toString(36).substr(2, 9),
        channel: channel as any,
        content: generatedContent[channel as keyof typeof generatedContent],
        date: scheduleDate,
        status: 'scheduled',
      });
    });

    router.push('/');
    resetEditor();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create Content</h1>
        <p className="text-muted-foreground mt-2">Generate and schedule multi-channel promotional content.</p>
      </div>

      {/* Step Progress Bar */}
      <div className="relative mb-12">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 rounded-full" />
        <div 
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full transition-all duration-300"
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors z-10 ${
                step >= s.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {step > s.id ? <CheckCircle2 className="w-5 h-5" /> : s.id}
              </div>
              <span className={`text-xs font-medium ${step >= s.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {step === 1 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>What are we promoting?</CardTitle>
              <CardDescription>Enter the main keyword, product name, or topic.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="e.g., Summer Collection 2026, New AI Feature..." 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="text-lg py-6"
              />
              <div className="flex justify-end">
                <Button onClick={nextStep} disabled={!keyword.trim()}>
                  Next Step <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Choose a Concept</CardTitle>
              <CardDescription>What tone and style should the content have?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {['Professional & Trustworthy', 'Fun & Engaging', 'Urgent & Promotional', 'Storytelling & Emotional'].map((c) => (
                  <div 
                    key={c}
                    onClick={() => setConcept(c)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      concept === c ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'hover:border-primary/50'
                    }`}
                  >
                    <p className="font-medium">{c}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>Back</Button>
                <Button onClick={handleGenerate} disabled={!concept}>
                  <Sparkles className="w-4 h-4 mr-2" /> Generate Content
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                Generating Content...
              </CardTitle>
              <CardDescription>Our AI is crafting the perfect message for each channel.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-muted-foreground">Drafting Text</h3>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-[80%]" />
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg text-sm whitespace-pre-wrap font-mono text-muted-foreground h-[200px] overflow-y-auto">
                    {generatedContent.instagram || generatedContent.blog || generatedContent.twitter || "Initializing..."}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-muted-foreground">Generating Image</h3>
                  <Skeleton className="w-full aspect-square rounded-xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Review & Edit</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)}>Regenerate</Button>
                <Button onClick={nextStep}>Continue to Schedule <ChevronRight className="w-4 h-4 ml-2" /></Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Instagram</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      value={generatedContent.instagram}
                      onChange={(e) => setGeneratedContent('instagram', e.target.value)}
                      className="min-h-[120px]"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Naver Blog</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      value={generatedContent.blog}
                      onChange={(e) => setGeneratedContent('blog', e.target.value)}
                      className="min-h-[150px]"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">X (Twitter)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      value={generatedContent.twitter}
                      onChange={(e) => setGeneratedContent('twitter', e.target.value)}
                      className="min-h-[100px]"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">YouTube</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      value={generatedContent.youtube}
                      onChange={(e) => setGeneratedContent('youtube', e.target.value)}
                      className="min-h-[120px]"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">LinkedIn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      value={generatedContent.linkedin}
                      onChange={(e) => setGeneratedContent('linkedin', e.target.value)}
                      className="min-h-[120px]"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">TikTok</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      value={generatedContent.tiktok}
                      onChange={(e) => setGeneratedContent('tiktok', e.target.value)}
                      className="min-h-[100px]"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Threads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      value={generatedContent.threads}
                      onChange={(e) => setGeneratedContent('threads', e.target.value)}
                      className="min-h-[100px]"
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-7">
                <div className="sticky top-6">
                  <MultiChannelPreview content={generatedContent} />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <Card className="max-w-xl mx-auto">
            <CardHeader>
              <CardTitle>Schedule Upload</CardTitle>
              <CardDescription>When should we publish this content across your channels?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col space-y-2">
                <Popover>
                  <PopoverTrigger
                    className={`w-full justify-start text-left font-normal flex items-center h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm ${!scheduleDate && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduleDate ? format(scheduleDate, "PPP") : <span>Pick a date</span>}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={scheduleDate}
                      onSelect={setScheduleDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h4 className="text-sm font-medium">Ready to schedule for:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">Instagram</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Naver Blog</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">X (Twitter)</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">YouTube</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-200 text-blue-900">LinkedIn</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-900">TikTok</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-100">Threads</span>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={prevStep}>Back to Edit</Button>
                <Button onClick={handleSchedule} disabled={!scheduleDate}>
                  Schedule Posts
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
