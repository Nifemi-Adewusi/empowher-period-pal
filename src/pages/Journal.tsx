import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Heart, Calendar as CalendarIcon, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  timestamp: number;
}

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [todayEntry, setTodayEntry] = useState<JournalEntry | null>(null);
  const { toast } = useToast();

  const today = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const stored = localStorage.getItem("gratitude_journal");
    if (stored) {
      const parsed = JSON.parse(stored);
      setEntries(parsed);
      const todaysEntry = parsed.find((entry: JournalEntry) => entry.date === today);
      if (todaysEntry) {
        setTodayEntry(todaysEntry);
        setCurrentEntry(todaysEntry.content);
      }
    }
  };

  const saveEntry = () => {
    if (!currentEntry.trim()) {
      toast({
        title: "Empty entry",
        description: "Please write something before saving.",
        variant: "destructive",
      });
      return;
    }

    let updatedEntries;
    if (todayEntry) {
      // Update existing entry
      updatedEntries = entries.map((entry) =>
        entry.id === todayEntry.id
          ? { ...entry, content: currentEntry, timestamp: Date.now() }
          : entry
      );
      toast({
        title: "Entry updated! ✨",
        description: "Your gratitude has been saved.",
      });
    } else {
      // Create new entry
      const newEntry: JournalEntry = {
        id: `${Date.now()}-${Math.random()}`,
        date: today,
        content: currentEntry,
        timestamp: Date.now(),
      };
      updatedEntries = [newEntry, ...entries];
      setTodayEntry(newEntry);
      toast({
        title: "Entry saved! 💖",
        description: "Thank you for practicing gratitude today.",
      });
    }

    localStorage.setItem("gratitude_journal", JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
  };

  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    localStorage.setItem("gratitude_journal", JSON.stringify(updatedEntries));
    setEntries(updatedEntries);
    
    if (todayEntry?.id === id) {
      setTodayEntry(null);
      setCurrentEntry("");
    }

    toast({
      title: "Entry deleted",
      description: "Your journal entry has been removed.",
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (dateStr === today) return "Today";
    return format(date, "EEEE, MMMM d, yyyy");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-500 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Gratitude Journal
            </h1>
            <Heart className="h-8 w-8 text-pink-500 animate-pulse" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Taking a moment each day to reflect on what you're grateful for can
            transform your mindset and boost your well-being. 🌸
          </p>
        </div>

        {/* Today's Entry Card */}
        <Card className="mb-8 border-none shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CalendarIcon className="h-6 w-6 text-purple-500" />
              What are you grateful for today?
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              {todayEntry
                ? "You've already written today. Feel free to update your entry!"
                : "Take a moment to reflect on the good things in your life right now."}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="I'm grateful for..."
              className="min-h-[150px] text-base resize-none"
              maxLength={1000}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {currentEntry.length}/1000 characters
              </span>
              <Button
                onClick={saveEntry}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {todayEntry ? "Update Entry" : "Save Entry"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Past Entries */}
        {entries.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Your Gratitude Journey 📖
            </h2>
            <div className="space-y-4">
              {entries.map((entry) => (
                <Card
                  key={entry.id}
                  className="border-none shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-semibold text-foreground">
                          {formatDate(entry.date)}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(entry.timestamp), "h:mm a")}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteEntry(entry.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground whitespace-pre-wrap">
                      {entry.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {entries.length === 0 && (
          <Card className="border-none shadow-lg bg-white/60 backdrop-blur-sm text-center py-12">
            <CardContent>
              <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Start Your Gratitude Journey
              </h3>
              <p className="text-muted-foreground">
                Write your first entry above to begin cultivating a grateful
                mindset! ✨
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Journal;
