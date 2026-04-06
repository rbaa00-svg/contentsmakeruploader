'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Instagram, Twitter, BookOpen, Heart, MessageCircle, Send, Bookmark, Repeat2, Share, Youtube, Linkedin, ThumbsUp, ThumbsDown, Share2, MoreVertical, Globe, Music, AtSign } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface MultiChannelPreviewProps {
  content: {
    instagram: string;
    blog: string;
    twitter: string;
    youtube: string;
    linkedin: string;
    tiktok: string;
    threads: string;
  };
  imageSrc?: string;
}

export function MultiChannelPreview({ content, imageSrc = "https://picsum.photos/seed/promo/800/800" }: MultiChannelPreviewProps) {
  return (
    <Tabs defaultValue="instagram" className="w-full">
      <TabsList className="flex flex-wrap w-full h-auto mb-6 gap-1 justify-start bg-muted p-1 rounded-lg">
        <TabsTrigger value="instagram" className="flex items-center gap-2 flex-1 min-w-[100px]">
          <Instagram className="w-4 h-4" /> <span className="hidden sm:inline">Instagram</span>
        </TabsTrigger>
        <TabsTrigger value="blog" className="flex items-center gap-2 flex-1 min-w-[100px]">
          <BookOpen className="w-4 h-4" /> <span className="hidden sm:inline">Blog</span>
        </TabsTrigger>
        <TabsTrigger value="twitter" className="flex items-center gap-2 flex-1 min-w-[100px]">
          <Twitter className="w-4 h-4" /> <span className="hidden sm:inline">X</span>
        </TabsTrigger>
        <TabsTrigger value="youtube" className="flex items-center gap-2 flex-1 min-w-[100px]">
          <Youtube className="w-4 h-4" /> <span className="hidden sm:inline">YouTube</span>
        </TabsTrigger>
        <TabsTrigger value="linkedin" className="flex items-center gap-2 flex-1 min-w-[100px]">
          <Linkedin className="w-4 h-4" /> <span className="hidden sm:inline">LinkedIn</span>
        </TabsTrigger>
        <TabsTrigger value="tiktok" className="flex items-center gap-2 flex-1 min-w-[100px]">
          <Music className="w-4 h-4" /> <span className="hidden sm:inline">TikTok</span>
        </TabsTrigger>
        <TabsTrigger value="threads" className="flex items-center gap-2 flex-1 min-w-[100px]">
          <AtSign className="w-4 h-4" /> <span className="hidden sm:inline">Threads</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="instagram" className="flex justify-center">
        <Card className="w-full max-w-[400px] overflow-hidden bg-white border-gray-200">
          <div className="flex items-center p-3 gap-3 border-b">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
              <div className="w-full h-full bg-white rounded-full border-2 border-white overflow-hidden relative">
                <Image src="https://picsum.photos/seed/avatar/100/100" alt="Avatar" fill referrerPolicy="no-referrer" />
              </div>
            </div>
            <span className="font-semibold text-sm">promo.pikkto</span>
          </div>
          <div className="relative aspect-square w-full bg-muted">
            <Image src={imageSrc} alt="Post image" fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <Heart className="w-6 h-6 hover:text-gray-500 cursor-pointer" />
                <MessageCircle className="w-6 h-6 hover:text-gray-500 cursor-pointer" />
                <Send className="w-6 h-6 hover:text-gray-500 cursor-pointer" />
              </div>
              <Bookmark className="w-6 h-6 hover:text-gray-500 cursor-pointer" />
            </div>
            <div className="text-sm whitespace-pre-wrap">
              <span className="font-semibold mr-2">promo.pikkto</span>
              {content.instagram || "Your Instagram caption will appear here..."}
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="blog" className="flex justify-center">
        <Card className="w-full max-w-[600px] bg-white border-gray-200 p-6">
          <div className="text-2xl font-bold mb-4">
            {content.blog ? content.blog.split('\n')[0] : "Blog Title"}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <div className="w-6 h-6 rounded-full overflow-hidden relative">
              <Image src="https://picsum.photos/seed/avatar/100/100" alt="Avatar" fill referrerPolicy="no-referrer" />
            </div>
            <span>promo.pikkto</span>
            <span>·</span>
            <span>Just now</span>
          </div>
          <div className="relative w-full aspect-[16/9] bg-muted mb-6 rounded-lg overflow-hidden">
            <Image src={imageSrc} alt="Blog cover" fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="text-base leading-relaxed whitespace-pre-wrap text-gray-800">
            {content.blog ? content.blog.substring(content.blog.indexOf('\n') + 1) : "Your Naver Blog content will appear here..."}
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="twitter" className="flex justify-center">
        <Card className="w-full max-w-[500px] bg-white border-gray-200 p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0">
              <Image src="https://picsum.photos/seed/avatar/100/100" alt="Avatar" fill referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm">Promo Pikkto</span>
                <span className="text-gray-500 text-sm">@promopikkto</span>
                <span className="text-gray-500 text-sm">· 1m</span>
              </div>
              <div className="text-sm whitespace-pre-wrap mt-1 mb-3 text-gray-900">
                {content.twitter || "Your tweet will appear here..."}
              </div>
              <div className="relative w-full aspect-video bg-muted rounded-xl overflow-hidden border border-gray-100">
                <Image src={imageSrc} alt="Tweet media" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex items-center justify-between mt-3 text-gray-500 max-w-md">
                <MessageCircle className="w-4 h-4 hover:text-blue-500 cursor-pointer" />
                <Repeat2 className="w-4 h-4 hover:text-green-500 cursor-pointer" />
                <Heart className="w-4 h-4 hover:text-pink-500 cursor-pointer" />
                <Share className="w-4 h-4 hover:text-blue-500 cursor-pointer" />
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="youtube" className="flex justify-center">
        <Card className="w-full max-w-[600px] bg-white border-gray-200 overflow-hidden">
          <div className="relative w-full aspect-video bg-black flex items-center justify-center group cursor-pointer">
            <Image src={imageSrc} alt="Video thumbnail" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold line-clamp-2 mb-2">{content.youtube ? content.youtube.split('\n')[0] : "YouTube Video Title"}</h3>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0">
                  <Image src="https://picsum.photos/seed/avatar/100/100" alt="Channel Avatar" fill referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="font-bold text-sm">promo.pikkto</div>
                  <div className="text-xs text-gray-500">1.2M subscribers</div>
                </div>
                <Button variant="secondary" className="ml-2 rounded-full h-8 px-4 text-xs font-bold bg-black text-white hover:bg-gray-800">Subscribe</Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-100 rounded-full h-8">
                  <button className="flex items-center gap-1 px-3 hover:bg-gray-200 rounded-l-full h-full border-r border-gray-300"><ThumbsUp className="w-4 h-4"/> <span className="text-xs font-medium">12K</span></button>
                  <button className="flex items-center px-3 hover:bg-gray-200 rounded-r-full h-full"><ThumbsDown className="w-4 h-4"/></button>
                </div>
                <button className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 rounded-full h-8 px-3"><Share2 className="w-4 h-4"/> <span className="text-xs font-medium">Share</span></button>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl p-3 text-sm whitespace-pre-wrap">
              <div className="font-bold mb-1">123K views  2 hours ago</div>
              {content.youtube ? content.youtube.substring(content.youtube.indexOf('\n') + 1) : "Your YouTube description will appear here..."}
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="linkedin" className="flex justify-center">
        <Card className="w-full max-w-[500px] bg-white border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0">
              <Image src="https://picsum.photos/seed/avatar/100/100" alt="Avatar" fill referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm flex items-center gap-1">Promo Pikkto <span className="text-gray-500 text-xs font-normal">• 1st</span></div>
              <div className="text-xs text-gray-500 line-clamp-1">AI-powered multi-channel promotional content creator</div>
              <div className="text-xs text-gray-500 flex items-center gap-1">1h • <Globe className="w-3 h-3"/></div>
            </div>
            <MoreVertical className="w-5 h-5 text-gray-500 cursor-pointer" />
          </div>
          <div className="text-sm whitespace-pre-wrap mb-3 text-gray-900">
            {content.linkedin || "Your LinkedIn post will appear here..."}
          </div>
          <div className="relative w-full aspect-[1.91/1] bg-muted mb-2 overflow-hidden border border-gray-100">
            <Image src={imageSrc} alt="Post media" fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100 text-xs text-gray-500">
            <div className="flex items-center gap-1"><div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"><ThumbsUp className="w-2 h-2 text-white fill-current"/></div> 1,234</div>
            <div>123 comments • 45 reposts</div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"><ThumbsUp className="w-5 h-5"/> <span className="text-sm font-medium">Like</span></button>
            <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"><MessageCircle className="w-5 h-5"/> <span className="text-sm font-medium">Comment</span></button>
            <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"><Repeat2 className="w-5 h-5"/> <span className="text-sm font-medium">Repost</span></button>
            <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"><Send className="w-5 h-5"/> <span className="text-sm font-medium">Send</span></button>
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="tiktok" className="flex justify-center">
        <Card className="w-full max-w-[350px] overflow-hidden bg-black text-white border-gray-800 relative aspect-[9/16]">
          <Image src={imageSrc} alt="TikTok video" fill className="object-cover opacity-80" referrerPolicy="no-referrer" />
          <div className="absolute right-4 bottom-20 flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-1"><div className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center"><Heart className="w-6 h-6"/></div><span className="text-xs font-medium shadow-black drop-shadow-md">123K</span></div>
            <div className="flex flex-col items-center gap-1"><div className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center"><MessageCircle className="w-6 h-6"/></div><span className="text-xs font-medium shadow-black drop-shadow-md">456</span></div>
            <div className="flex flex-col items-center gap-1"><div className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center"><Bookmark className="w-6 h-6"/></div><span className="text-xs font-medium shadow-black drop-shadow-md">789</span></div>
            <div className="flex flex-col items-center gap-1"><div className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center"><Share className="w-6 h-6"/></div><span className="text-xs font-medium shadow-black drop-shadow-md">Share</span></div>
          </div>
          <div className="absolute left-4 bottom-4 right-16">
            <div className="font-bold mb-1 shadow-black drop-shadow-md">@promo.pikkto</div>
            <div className="text-sm line-clamp-3 mb-2 shadow-black drop-shadow-md">{content.tiktok || "Your TikTok caption will appear here..."}</div>
            <div className="flex items-center gap-2 text-sm shadow-black drop-shadow-md"><Music className="w-4 h-4"/> <span>Original Sound - promo.pikkto</span></div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="threads" className="flex justify-center">
        <Card className="w-full max-w-[500px] bg-white border-gray-200 p-4">
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0">
                <Image src="https://picsum.photos/seed/avatar/100/100" alt="Avatar" fill referrerPolicy="no-referrer" />
              </div>
              <div className="w-0.5 h-full bg-gray-200 mt-2 rounded-full"></div>
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">promo.pikkto</span>
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="text-sm">1m</span>
                  <MoreVertical className="w-4 h-4" />
                </div>
              </div>
              <div className="text-sm whitespace-pre-wrap mt-1 mb-3 text-gray-900">
                {content.threads || "Your Threads post will appear here..."}
              </div>
              <div className="relative w-full aspect-video bg-muted rounded-xl overflow-hidden border border-gray-100">
                <Image src={imageSrc} alt="Threads media" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex items-center gap-4 mt-3 text-gray-900">
                <Heart className="w-5 h-5 cursor-pointer" />
                <MessageCircle className="w-5 h-5 cursor-pointer" />
                <Repeat2 className="w-5 h-5 cursor-pointer" />
                <Send className="w-5 h-5 cursor-pointer" />
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
