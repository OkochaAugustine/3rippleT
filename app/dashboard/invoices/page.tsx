"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, CreditCard } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { formatNGN } from "@/lib/payments";

interface Invoice {
  _id: string;
  invoiceId: string;
  amount: number;
  status: string;
  createdAt: string;
  receiptUrl?: string;
  planName?: string;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch("/api/invoices", {
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to load invoices");

        const data = await res.json();
        setInvoices(data.invoices || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <Section className="bg-background min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Heading as="h1" size="xl">
            Invoices & <span className="text-accent">Payments</span>
          </Heading>

          <p className="mt-2 text-muted-foreground">
            View your payment history and download invoices.
          </p>
        </motion.div>

        {/* Empty state CTA if no invoices */}
        {!loading && invoices.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 rounded-2xl border border-border bg-card p-8"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-2xl font-bold">
                  No invoices yet
                </h3>

                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Purchase your first membership package to get started!
                </p>
              </div>

              <Link href="/membership">
                <Button size="lg" className="gap-2">
                  View Membership Packages
                  <CreditCard className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Invoices Table */}
        {invoices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-left">Invoice</th>
                    <th className="px-6 py-4 text-left">Plan</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Amount</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center">
                        Loading invoices...
                      </td>
                    </tr>
                  ) : (
                    invoices.map((invoice) => (
                      <tr
                        key={invoice._id}
                        className="border-b border-border last:border-0"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-accent" />
                            <span className="font-semibold">
                              {invoice.invoiceId}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-muted-foreground">
                          {invoice.planName || "Membership"}
                        </td>

                        <td className="px-6 py-4 text-muted-foreground">
                          {new Date(invoice.createdAt).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4 font-semibold">
                          {formatNGN(invoice.amount)}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-semibold ${
                              invoice.status === "completed"
                                ? "bg-green-500/20 text-green-500"
                                : invoice.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-red-500/20 text-red-500"
                            }`}
                          >
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          {invoice.receiptUrl ? (
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                            >
                              <a
                                href={invoice.receiptUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </a>
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Receipt Pending
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}
