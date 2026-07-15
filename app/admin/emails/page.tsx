/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Search,
  Filter,
  History,
  TrendingUp,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

type EmailLog = {
  id: string;
  recipient: string;
  subject: string;
  type: "verification" | "welcome" | "password_reset" | "broadcast";
  status: "sent" | "failed" | "pending";
  error: string;
  sentAt: string;
};

type EmailStats = {
  successCount: number;
  failureCount: number;
  totalSent: number;
};

export default function AdminEmailsPage() {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [stats, setStats] = useState<EmailStats>({
    successCount: 0,
    failureCount: 0,
    totalSent: 0,
  });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // Form State
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Notifications/Alerts State
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const fetchEmailData = async () => {
    try {
      const res = await fetch("/api/admin/emails");
      if (!res.ok) throw new Error("Failed to fetch email logs");
      const data = await res.json();
      setLogs(data.logs || []);
      setStats(data.stats || { successCount: 0, failureCount: 0, totalSent: 0 });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmailData();
  }, []);

  const handleBroadcastSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setFormError("");
    setFormSuccess("");

    if (!subject.trim() || !message.trim()) {
      setFormError("Subject and Message content are required.");
      setSending(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          message,
          buttonText: buttonText || undefined,
          buttonUrl: buttonUrl || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to trigger broadcast");

      setFormSuccess(
        `Broadcast completed successfully. Sent: ${data.stats.successCount}, Failed: ${data.stats.failureCount}`
      );
      setSubject("");
      setMessage("");
      setButtonText("");
      setButtonUrl("");

      // Refresh logs & statistics
      await fetchEmailData();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Failed to execute email broadcast.");
    } finally {
      setSending(false);
    }
  };

  // Filtered Logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.error.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    const matchesType = typeFilter === "all" || log.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const successRate = stats.totalSent
    ? Math.round((stats.successCount / stats.totalSent) * 100)
    : 100;

  return (
    <Section className="bg-background min-h-screen">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-border/40 pb-6"
        >
          <div>
            <Heading as="h1" size="xl">
              Email <span className="text-accent">Communication</span>
            </Heading>
            <p className="mt-2 text-muted-foreground">
              Send responsive broadcasts to gym members and audit outgoing transactional logs.
            </p>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4"
            >
              <div className="rounded-lg border border-border bg-card p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Outgoing</p>
                  <p className="mt-2 text-3xl font-bold">{stats.totalSent}</p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="h-4 w-4 text-accent" />
                  <span>All transactional + bulk mails</span>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Delivered successfully</p>
                  <p className="mt-2 text-3xl font-bold text-green-500">{stats.successCount}</p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-green-500">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Successfully processed by SMTP</span>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Delivery failures</p>
                  <p className="mt-2 text-3xl font-bold text-red-500">{stats.failureCount}</p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-red-500">
                  <XCircle className="h-4 w-4" />
                  <span>Bounces, bad addresses, or config issues</span>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Delivery Success Rate</p>
                  <p className="mt-2 text-3xl font-bold text-accent">{successRate}%</p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-accent">
                  <TrendingUp className="h-4 w-4" />
                  <span>Target rate &gt; 95%</span>
                </div>
              </div>
            </motion.div>

            {/* Main Layout Grid */}
            <div className="grid gap-8 mt-10 lg:grid-cols-12">
              {/* Broadcast Composer */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="lg:col-span-5 rounded-lg border border-border bg-card p-6"
              >
                <div className="flex items-center gap-2 border-b border-border/40 pb-4 mb-6">
                  <Send className="h-5 w-5 text-accent" />
                  <h3 className="font-bold text-lg">Broadcast Composer</h3>
                </div>

                {formError && (
                  <div className="mb-4 p-4 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {formSuccess && (
                  <div className="mb-4 p-4 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <span>{formSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleBroadcastSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Subject</label>
                    <input
                      required
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full h-11 px-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="e.g. Schedule Updates for Next Week"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Message Body</label>
                    <textarea
                      required
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                      placeholder="Type your broadcast message details here (line breaks are preserved)..."
                    />
                  </div>

                  <div className="border-t border-border/40 pt-4 mt-2">
                    <p className="text-xs text-muted-foreground mb-4">
                      Optional: Attach a call-to-action button to the bottom of the email.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold mb-2">Button Text</label>
                        <input
                          type="text"
                          value={buttonText}
                          onChange={(e) => setButtonText(e.target.value)}
                          className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                          placeholder="e.g., View Schedule"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-2">Button URL</label>
                        <input
                          type="url"
                          value={buttonUrl}
                          onChange={(e) => setButtonUrl(e.target.value)}
                          className="w-full h-10 px-3 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2 mt-4"
                    disabled={sending}
                  >
                    {sending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending to all users...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Email Broadcast</span>
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Logs & Audit History */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="lg:col-span-7 rounded-lg border border-border bg-card p-6"
              >
                <div className="flex items-center gap-2 border-b border-border/40 pb-4 mb-6">
                  <History className="h-5 w-5 text-accent" />
                  <h3 className="font-bold text-lg">Communication History</h3>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full h-10 pl-9 pr-4 rounded-md border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Search logs by recipient or subject..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 h-10">
                      <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                      <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="bg-transparent border-none text-xs font-semibold focus:outline-none cursor-pointer pr-1"
                      >
                        <option value="all">All Types</option>
                        <option value="verification">Verification</option>
                        <option value="welcome">Welcome</option>
                        <option value="password_reset">Reset</option>
                        <option value="broadcast">Broadcast</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-md border border-border bg-background px-3 h-10">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-transparent border-none text-xs font-semibold focus:outline-none cursor-pointer pr-1"
                      >
                        <option value="all">All Statuses</option>
                        <option value="sent">Sent</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded border border-border/40">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-border/40 bg-muted/35 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <th className="p-3">Recipient</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Subject / Details</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Sent At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-muted/15 transition-colors">
                          <td className="p-3 font-medium whitespace-nowrap">{log.recipient}</td>
                          <td className="p-3 whitespace-nowrap">
                            <span className="capitalize text-xs rounded-full px-2 py-0.5 font-medium border border-border bg-muted text-foreground">
                              {log.type === "password_reset" ? "reset" : log.type}
                            </span>
                          </td>
                          <td className="p-3 min-w-[200px]">
                            <p className="font-semibold line-clamp-1">{log.subject}</p>
                            {log.status === "failed" && log.error && (
                              <p className="text-xs text-red-400 font-medium mt-1 leading-tight flex items-center gap-1">
                                <AlertCircle className="h-3 w-3 shrink-0" />
                                <span>{log.error}</span>
                              </p>
                            )}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1 text-xs font-bold rounded px-2.5 py-0.5 ${
                                log.status === "sent"
                                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                  : "bg-red-500/10 text-red-400 border border-red-500/20"
                              }`}
                            >
                              {log.status === "sent" ? "Delivered" : "Failed"}
                            </span>
                          </td>
                          <td className="p-3 text-right text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(log.sentAt).toLocaleString([], {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                        </tr>
                      ))}
                      {filteredLogs.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-muted-foreground">
                            No matching communication logs found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
