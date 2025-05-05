// "use client";

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CloudinaryGallery from "./CloudinaryGallery";

export default function GalleryPage() {


  return (
    <div className="flex flex-col">

      {/* Gallery Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Experience yovanAV</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Browse through our gallery to see the premium experiences we offer and get inspired for your next booking.
            </p>
          </div>



<CloudinaryGallery />

        </div>
      </section>

      {/* Video Showcase */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">See yovanAV in Action</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Watch our showcase video to get a better feel for the yovanAV experience. From our comfortable
                  seating to our state-of-the-art audio and visual equipment, every detail is designed to create an
                  unforgettable cinema experience.
                </p>
                <p>
                  Our video highlights various setups for different occasions, from intimate date nights to larger
                  celebrations, demonstrating the versatility of our spaces.
                </p>
              </div>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/book-now">Book Your Experience</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full rounded-xl"
                  src="https://res.cloudinary.com/dawavjsrp/video/upload/v1746445565/VID-20250426-WA0002_kyn3yf.mp4"
                />
              </div>


          </div>
        </div>
      </section>

     
    </div>
  )
}






