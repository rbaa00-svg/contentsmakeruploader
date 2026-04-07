import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KeyRound, ShieldCheck, TimerReset } from 'lucide-react';

function statusLabel(enabled: boolean, enabledText: string, disabledText: string) {
  return enabled ? enabledText : disabledText;
}

export default function SettingsPage() {
  const hasAiKey = Boolean(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Review how content generation, scheduling, and connected channels behave in this workspace.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>AI Generation</CardTitle>
                  <CardDescription>Server-side Gemini integration with a guided fallback mode.</CardDescription>
                </div>
              </div>
              <Badge variant={hasAiKey ? 'default' : 'secondary'}>
                {statusLabel(hasAiKey, 'Configured', 'Fallback mode')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {hasAiKey
              ? 'A Gemini API key is available on the server, so content requests can use live generation.'
              : 'No Gemini API key is configured. The app will still generate editable multi-channel starter copy so the workflow remains usable.'}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-500/10 p-3 text-blue-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Publishing Safety</CardTitle>
                <CardDescription>Scheduling stays local until platform connectors are fully wired.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Scheduled posts are stored in the local dashboard preview. Use this environment for authoring and review, not live distribution.
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-500/10 p-3 text-amber-600">
                <TimerReset className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Scheduler Behavior</CardTitle>
                <CardDescription>Publishing plans now store both date and time for each generated channel.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Use the schedule step to choose an exact local publish time. The dashboard will reflect the combined date-time so reviews are precise before integration with real posting APIs.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
