'use client';

import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Instagram, Twitter, BookOpen, Plus, Calendar, Youtube, Linkedin, Music, AtSign } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function DashboardPage() {
  const { snsConnections, toggleConnection, scheduledPosts } = useAppStore();

  const channels = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
    { id: 'blog', name: 'Naver Blog', icon: BookOpen, color: 'text-green-500' },
    { id: 'twitter', name: 'X (Twitter)', icon: Twitter, color: 'text-blue-500' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700' },
    { id: 'tiktok', name: 'TikTok', icon: Music, color: 'text-black dark:text-white' },
    { id: 'threads', name: 'Threads', icon: AtSign, color: 'text-black dark:text-white' },
  ] as const;

  return (
    <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your connected accounts (including TikTok & Threads) and scheduled posts.</p>
        </div>
        <Link href="/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Content
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((channel) => {
          const isConnected = snsConnections[channel.id];
          const Icon = channel.icon;
          return (
            <Card key={channel.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${channel.color}`} />
                  {channel.name}
                </CardTitle>
                {isConnected ? (
                  <Badge variant="default" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-muted-foreground">
                    Disconnected
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground mt-2 mb-4">
                  {isConnected ? 'Account is synced and ready for posting.' : 'Connect your account to schedule posts.'}
                </div>
                <Button 
                  variant={isConnected ? "outline" : "default"} 
                  className="w-full"
                  onClick={() => toggleConnection(channel.id)}
                >
                  {isConnected ? 'Disconnect' : 'Connect Account'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Scheduled Posts</h2>
        {scheduledPosts.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <Calendar className="w-8 h-8 mb-4 opacity-50" />
              <p>No posts scheduled yet.</p>
              <Link href="/create" className="mt-2 text-primary hover:underline text-sm">
                Create your first post
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scheduledPosts.map((post) => {
              const channelInfo = channels.find(c => c.id === post.channel);
              const Icon = channelInfo?.icon || Calendar;
              
              return (
                <Card key={post.id} className="overflow-hidden">
                  <div className="flex items-start p-6 gap-4">
                    <div className={`p-3 rounded-full bg-muted ${channelInfo?.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">{channelInfo?.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {format(post.date, 'MMM d, yyyy h:mm a')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                        {post.content}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
