'use client';

import { useState } from 'react';
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
import { AlertCircle, CalendarIcon, CheckCircle2, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Channel } from '@/store/useAppStore';

const steps = [
  { id: 1, name: 'Keyword' },
  { id: 2, name: 'Concept' },
  { id: 3, name: 'Generate' },
  { id: 4, name: 'Review' },
  { id: 5, name: 'Schedule' },
];

const channels: Channel[] = ['instagram', 'blog', 'twitter', 'youtube', 'linkedin', 'tiktok', 'threads'];

export default function CreateContentPage() {
  const router = useRouter();
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generationWarning, setGenerationWarning] = useState<string | null>(null);
  const {
    step, setStep, nextStep, prevStep,
    keyword, setKeyword,
    concept, setConcept,
    generatedContent, setGeneratedContent,
    isGenerating, setIsGenerating,
    scheduleDate, setScheduleDate,
    scheduleTime, setScheduleTime,
    addScheduledPost, resetEditor
  } = useAppStore();

  const handleGenerate = async () => {
    setGenerationError(null);
    setGenerationWarning(null);
    nextStep();
    setIsGenerating(true);

    channels.forEach((channel) => {
      setGeneratedContent(channel, '');
    });

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword, concept }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? 'Unable to generate content.');
      }

      channels.forEach((channel) => {
        setGeneratedContent(channel, payload.content?.[channel] ?? '');
      });

      if (payload.warning) {
        setGenerationWarning(payload.warning);
      }

      setIsGenerating(false);
      nextStep();
    } catch (error) {
      console.error('Error generating content:', error);
      setIsGenerating(false);
      setGenerationError(error instanceof Error ? error.message : 'Unable to generate content.');
    }
  };

  const handleSchedule = () => {
    if (!scheduleDate) return;

    const [hours, minutes] = scheduleTime.split(':').map((value) => Number(value));
    const scheduledAt = new Date(scheduleDate);
    scheduledAt.setHours(Number.isFinite(hours) ? hours : 9, Number.isFinite(minutes) ? minutes : 0, 0, 0);

    channels.forEach((channel) => {
      addScheduledPost({
        id: crypto.randomUUID(),
        channel,
        content: generatedContent[channel],
        date: scheduledAt,
        status: 'scheduled',
      });
    });

    router.push('/');
    resetEditor();
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 p-4 sm:p-6 lg:p-8">
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
              <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          <Card className="mx-auto max-w-4xl">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                {generationError ? (
                  <AlertCircle className="h-5 w-5 text-destructive" />
                ) : (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                )}
                {generationError ? 'Generation failed' : 'Generating Content...'}
              </CardTitle>
              <CardDescription>
                {generationError
                  ? 'The request did not complete. Adjust the concept or retry the request.'
                  : 'promo.pikkto is preparing channel-specific copy for review.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generationError ? (
                <div className="space-y-6">
                  <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
                    {generationError}
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back to Concept
                    </Button>
                    <Button onClick={handleGenerate}>
                      Try Again
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Drafting Text</h3>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-[90%]" />
                      <Skeleton className="h-4 w-[95%]" />
                      <Skeleton className="h-4 w-[80%]" />
                    </div>
                    <div className="h-[200px] overflow-y-auto rounded-lg bg-muted/50 p-4 font-mono text-sm text-muted-foreground whitespace-pre-wrap">
                      {generatedContent.instagram || generatedContent.blog || generatedContent.twitter || 'Initializing...'}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Next in the workflow</h3>
                    <div className="rounded-xl border border-dashed bg-muted/30 p-6 text-sm text-muted-foreground">
                      Image generation is not wired in this build yet. Finish copy review first, then attach creative assets during publishing integration.
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <div className="space-y-6">
            {generationWarning ? (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-700">
                {generationWarning}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="text-2xl font-bold">Review & Edit</h2>
              <div className="flex flex-col gap-2 sm:flex-row">
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
              <CardDescription>Choose the exact local date and time for this scheduled publishing batch.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
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
                <div className="space-y-2">
                  <label htmlFor="publish-time" className="text-sm font-medium">
                    Publish time
                  </label>
                  <Input
                    id="publish-time"
                    type="time"
                    value={scheduleTime}
                    onChange={(event) => setScheduleTime(event.target.value)}
                  />
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <h4 className="text-sm font-medium">Ready to schedule for:</h4>
                <p className="text-sm text-muted-foreground">
                  {scheduleDate ? `${format(scheduleDate, 'PPP')} at ${scheduleTime}` : 'Pick a date and time to preview the schedule.'}
                </p>
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
