"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Download, Eye, Trash2, Check, X, Users, Calendar, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { EVENT_CONFIG } from "@/constants/event-config";

interface Registration {
  _id: string;
  registrationCode: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  location: string;
  fitnessExperience: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export default function DeltaStateCarnivalAdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchRegistrations();
    fetchStats();
  }, [searchQuery, statusFilter]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        search: searchQuery,
        status: statusFilter,
      });
      const response = await fetch(`/api/admin/delta-state-carnival/registrations?${params}`);
      const data = await response.json();
      setRegistrations(data.registrations || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/events/delta-state-fitness-carnival/register");
      const data = await response.json();
      setStats({
        total: data.registrationCount || 0,
        today: data.todayCount || 0,
        pending: data.pendingCount || 0,
        confirmed: data.confirmedCount || 0,
        cancelled: data.cancelledCount || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/delta-state-carnival/registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchRegistrations();
        fetchStats();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteRegistration = async (id: string) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;
    try {
      const response = await fetch(`/api/admin/delta-state-carnival/registrations/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchRegistrations();
        fetchStats();
      }
    } catch (error) {
      console.error("Error deleting registration:", error);
    }
  };

  const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4">
        <div className={`rounded-full ${color} p-3`}>{icon}</div>
        <div>
          <p className="text-sm font-semibold text-white/60">{label}</p>
          <p className="text-3xl font-black text-white">{value}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <Section className="bg-background min-h-screen py-12">
      <Container>
        <Heading as="h1" size="xl" className="text-4xl font-black mb-2">
          Delta State Fitness Carnival
        </Heading>
        <p className="text-muted-foreground mb-8">Manage event registrations</p>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
          <StatCard icon={<Users className="w-6 h-6 text-accent-foreground" />} label="Total Registrations" value={stats.total} color="bg-accent" />
          <StatCard icon={<Calendar className="w-6 h-6 text-blue-500" />} label="Today" value={stats.today} color="bg-blue-500/20" />
          <StatCard icon={<TrendingUp className="w-6 h-6 text-yellow-500" />} label="Pending" value={stats.pending} color="bg-yellow-500/20" />
          <StatCard icon={<Check className="w-6 h-6 text-green-500" />} label="Confirmed" value={stats.confirmed} color="bg-green-500/20" />
          <StatCard icon={<X className="w-6 h-6 text-red-500" />} label="Cancelled" value={stats.cancelled} color="bg-red-500/20" />
        </div>

        {/* Capacity Display */}
        {EVENT_CONFIG.MAX_CAPACITY && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-accent/30 bg-accent/10 p-6 mb-8 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-white">Registration Capacity</span>
              <span className="text-accent font-black">{stats.total} / {EVENT_CONFIG.MAX_CAPACITY}</span>
            </div>
            <div className="h-3 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(stats.total / EVENT_CONFIG.MAX_CAPACITY) * 100}%` }}
                className="h-full bg-accent"
              />
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-4 mb-6"
        >
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search registrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background focus:border-accent focus:outline-none"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-border bg-background focus:border-accent focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </motion.div>

        {/* Registrations Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Code</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Experience</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                      Loading...
                    </td>
                  </tr>
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                      No registrations found
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg._id} className="border-t border-border hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-sm font-bold text-accent">{reg.registrationCode}</td>
                      <td className="px-4 py-3 text-sm font-medium">{reg.fullName}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{reg.email}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{reg.phone}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{reg.location}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground capitalize">{reg.fitnessExperience}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                            reg.status === "confirmed"
                              ? "bg-green-500/20 text-green-500"
                              : reg.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          {reg.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {new Date(reg.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {reg.status === "pending" && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-green-500"
                              onClick={() => updateStatus(reg._id, "confirmed")}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-500"
                            onClick={() => deleteRegistration(reg._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
