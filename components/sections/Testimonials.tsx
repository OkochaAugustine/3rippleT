"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Section ref={ref} id="success-stories" className="bg-muted/30 relative overflow-hidden">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.36em] text-accent">
            Success Stories
          </p>
          <Heading as="h2" size="lg" className="mt-3">
            What Our Members Say
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={{
              nextEl: ".testimonial-next",
              prevEl: ".testimonial-prev",
            }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col bg-gradient-to-br from-card to-card/50 border-border/60 shadow-xl">
                    <Quote className="text-accent/20 mb-4" size={56} />
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="text-accent fill-accent size-5" />
                      ))}
                    </div>
                    <p className="text-lg italic flex-1 mb-6 leading-relaxed">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center gap-4 pt-4 border-t border-border/40">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-accent/20 shrink-0">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-base">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Button
            variant="outline"
            size="icon"
            className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 rounded-full bg-card/80 backdrop-blur-sm border-border/60 hover:bg-accent hover:text-accent-foreground hover:border-accent"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 rounded-full bg-card/80 backdrop-blur-sm border-border/60 hover:bg-accent hover:text-accent-foreground hover:border-accent"
          >
            <ChevronRight className="size-5" />
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
