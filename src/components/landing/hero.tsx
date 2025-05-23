"use client";

import { TextEffect } from "@/components/motion/text-effect";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-0">
      <TextEffect
        per="char"
        delay={0.5}
        className="text-7xl font-medium bg-gradient-to-r bg-clip-text text-transparent from-white via-primary to-primary"
        variants={{
          container: {
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          },
          item: {
            hidden: {
              opacity: 0,
              rotateX: 90,
              y: 10,
            },
            visible: {
              opacity: 1,
              rotateX: 0,
              y: 0,
              transition: {
                duration: 0.2,
              },
            },
          },
        }}
      >
        The Ultimate Platform
      </TextEffect>
      <TextEffect
        per="char"
        delay={1.5}
        className="text-7xl font-medium"
        variants={{
          container: {
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          },
          item: {
            hidden: {
              opacity: 0,
              rotateX: 90,
              y: 10,
            },
            visible: {
              opacity: 1,
              rotateX: 0,
              y: 0,
              transition: {
                duration: 0.2,
              },
            },
          },
        }}
      >
        for Interview Preparation
      </TextEffect>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="my-10"
      >
        <p className="text-lg text-muted-foreground">
          Get instant feedback, personalized insights, and <br /> AI-driven
          coaching to improve your interview skills.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 1 }}
        className="flex items-center gap-2"
      >
        <Button variant="outline" className="px-6">Upgrade</Button>
        <Button variant="outline" className="px-6">Explore</Button>
      </motion.div>
    </div>
  );
}
