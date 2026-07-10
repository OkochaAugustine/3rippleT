import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section className="min-h-[72dvh] items-center pt-32">
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
          404
        </p>
        <Heading as="h1" size="xl" className="mt-4">
          This page is not in training yet.
        </Heading>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          The route exists outside the current foundation. Head back while the
          experience is being built.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <ArrowLeft aria-hidden="true" />
            Back home
          </Link>
        </Button>
      </Container>
    </Section>
  );
}
