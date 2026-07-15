/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2, Mail, Phone, Calendar, Loader2 } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useMemberStore, type Member, type MemberStatus, type MembershipPlan } from "@/store/member-store";
import { formatNGN } from "@/lib/payments";

export default function AdminMembersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "pending">("all");
  
  const { 
    members, 
    loading, 
    error, 
    fetchMembers, 
    addMember, 
    updateMember, 
    deleteMember 
  } = useMemberStore();

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleSave = async (data: Omit<Member, "id" | "joinedDate" | "attendanceCount" | "profileComplete">) => {
    try {
      if (editingMember) {
        await updateMember(editingMember.id, data);
      } else {
        await addMember({
          name: data.name,
          email: data.email,
          phone: data.phone,
          status: data.status,
          plan: data.plan,
          role: "MEMBER",
        });
      }
      setIsModalOpen(false);
      setEditingMember(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase()) ||
      (member.phone && member.phone.includes(search));
    
    const matchesStatus = 
      statusFilter === "all" || 
      member.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const planPrices: Record<string, number> = {
    none: 0,
    daily: 3000,
    monthly: 20000,
    premium: 45000,
  };

  return (
    <Section className="bg-background min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <Heading as="h1" size="xl">
              <span className="text-accent">Members</span>
            </Heading>
            <p className="mt-2 text-muted-foreground">
              Manage your member database and accounts.
            </p>
          </div>
          <Button
            className="gap-2"
            onClick={() => {
              setEditingMember(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="h-5 w-5" />
            Add Member
          </Button>
        </motion.div>

        {error && (
          <div className="mt-6 p-4 rounded bg-red-500/20 text-red-300 text-sm font-medium border border-red-500/30 text-center">
            {error}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search members by name, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={statusFilter === "all" ? "primary" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All ({members.length})
              </Button>
              <Button
                variant={statusFilter === "active" ? "primary" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("active")}
              >
                Active ({members.filter((m) => m.status === "active").length})
              </Button>
              <Button
                variant={statusFilter === "pending" ? "primary" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("pending")}
              >
                Pending ({members.filter((m) => m.status === "pending").length})
              </Button>
              <Button
                variant={statusFilter === "inactive" ? "primary" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("inactive")}
              >
                Inactive ({members.filter((m) => m.status === "inactive").length})
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card overflow-hidden">
            {loading && members.length === 0 ? (
              <div className="py-24 flex flex-col items-center justify-center text-muted-foreground gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
                <p>Loading members from database...</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="py-4 px-6 text-left font-semibold">Member</th>
                    <th className="py-4 px-6 text-left font-semibold">Plan</th>
                    <th className="py-4 px-6 text-left font-semibold">Status</th>
                    <th className="py-4 px-6 text-left font-semibold">Joined</th>
                    <th className="py-4 px-6 text-left font-semibold">Role</th>
                    <th className="py-4 px-6 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent font-bold">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold">{member.name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="size-3" />
                              {member.email}
                            </div>
                            {member.phone && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="size-3" />
                                {member.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold capitalize">{member.plan}</p>
                          <p className="text-sm text-muted-foreground">{formatNGN(planPrices[member.plan] || 0)}/mo</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            member.status === "active"
                              ? "bg-green-500/20 text-green-500"
                              : member.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          {member.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-4" />
                          {new Date(member.joinedDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="rounded bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground uppercase">
                          {member.role || "MEMBER"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => {
                              setEditingMember(member);
                              setIsModalOpen(true);
                            }}
                          >
                            <Edit className="size-4" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="gap-1"
                            onClick={async () => {
                              if (confirm(`Delete ${member.name}?`)) {
                                try {
                                  await deleteMember(member.id);
                                } catch (err) {
                                  console.error(err);
                                }
                              }
                            }}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredMembers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-muted-foreground">
                        No members found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>

        <MemberModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingMember(null);
          }}
          onSave={handleSave}
          initialData={editingMember}
        />
      </Container>
    </Section>
  );
}

function MemberModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Member, "id" | "joinedDate" | "attendanceCount" | "profileComplete">) => void;
  initialData: Member | null;
}) {
  const [form, setForm] = useState<Omit<Member, "id" | "joinedDate" | "attendanceCount" | "profileComplete">>({
    name: "",
    email: "",
    phone: "",
    status: "active",
    plan: "monthly",
    role: "MEMBER",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        status: initialData.status || "active",
        plan: initialData.plan || "monthly",
        role: initialData.role || "MEMBER",
      });
    } else {
      setForm({
        name: "",
        email: "",
        phone: "",
        status: "active",
        plan: "monthly",
        role: "MEMBER",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Member" : "Add Member"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full h-12 rounded-md border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full h-12 rounded-md border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="john@example.com"
              disabled={!!initialData}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full h-12 rounded-md border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="+234 801 234 5678"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2">Membership Plan</label>
            <select
              value={form.plan}
              onChange={(e) => setForm({ ...form, plan: e.target.value as MembershipPlan })}
              className="w-full h-12 rounded-md border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="none">No active plan</option>
              <option value="daily">Daily Pass - ₦3,000</option>
              <option value="monthly">Monthly - ₦20,000</option>
              <option value="premium">Premium - ₦45,000</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as MemberStatus })}
              className="w-full h-12 rounded-md border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button type="submit" className="flex-1">Save Member</Button>
        </div>
      </form>
    </Dialog>
  );
}
