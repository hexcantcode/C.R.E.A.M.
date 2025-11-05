"use client"

import { useState } from "react"
import { GL } from "./gl"
import { Pill } from "./pill"
import { Button } from "./ui/button"
import { CreateFundModal } from "./create-fund-modal"

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col min-h-svh justify-center pt-20">
        <GL />

        <div className="pb-16 text-center relative">
          <Pill className="mb-6">BUILDING PHASE</Pill>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">
            Become a <br />
            <i className="font-light">fund manager</i> in trenches
          </h1>
          <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[440px] mx-auto">
            The next Warren Buffett isn't going to come from trading stocks.
          </p>

          <div className="contents max-sm:hidden mt-14">
            <Button 
              className="bg-black"
              onClick={() => setIsModalOpen(true)}
            >
              [Create Fund]
            </Button>
          </div>
          <div className="contents sm:hidden mt-14">
            <Button 
              size="sm" 
              className="bg-black"
              onClick={() => setIsModalOpen(true)}
            >
              [Create Fund]
            </Button>
          </div>
        </div>
      </div>

      <CreateFundModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </>
  )
}
