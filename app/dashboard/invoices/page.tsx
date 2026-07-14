"use client";

import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function InvoicesPage() {
  return (
    <Section className="bg-background min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading as="h1" size="xl">
            Invoices & <span className="text-accent">Payments</span>
          </Heading>
          <p className="mt-2 text-muted-foreground">
            View your payment history and download invoices.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8"
        >
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 px-6 text-left font-semibold">Invoice</th>
                  <th className="py-4 px-6 text-left font-semibold">Date</th>
                  <th className="py-4 px-6 text-left font-semibold">Amount</th>
                  <th className="py-4 px-6 text-left font-semibold">Status</th>
                  <th className="py-4 px-6 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "INV-2026-007", date: "July 1, 2026", amount: "$149.00", status: "Paid" },
                  { id: "INV-2026-006", date: "June 1, 2026", amount: "$149.00", status: "Paid" },
                  { id: "INV-2026-005", date: "May 1, 2026", amount: "$149.00", status: "Paid" },
                  { id: "INV-2026-004", date: "April 1, 2026", amount: "$149.00", status: "Paid" },
                  { id: "INV-2026-003", date: "March 1, 2026", amount: "$149.00", status: "Paid" },
                ].map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span className="font-semibold">{invoice.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{invoice.date}</td>
                    <td className="py-4 px-6 font-semibold">{invoice.amount}</td>
                    <td className="py-4 px-6">
                      <span className="rounded-full bg-green-500/20 text-green-500 px-3 py-1 text-sm font-semibold">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
