import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GalleryPage() {
  // Array of gallery images
  const galleryImages = [
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Luxury Home Theatre Setup",
      caption: "Our premium theatre setup with reclining seats",
    },
    {
      src: "/placeholder.svg?height=800&width=600",
      alt: "Birthday Celebration",
      caption: "A birthday celebration in our main theatre",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Couples Movie Night",
      caption: "Romantic movie night setup for couples",
    },
    {
      src: "/placeholder.svg?height=800&width=800",
      alt: "Concession Stand",
      caption: "Our fully stocked concession stand",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Corporate Event",
      caption: "Corporate presentation in our largest theatre",
    },
    {
      src: "/placeholder.svg?height=800&width=600",
      alt: "Kids Movie Party",
      caption: "Special setup for children's movie parties",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Projection System",
      caption: "Our state-of-the-art 4K projection system",
    },
    {
      src: "/placeholder.svg?height=800&width=800",
      alt: "Sound System",
      caption: "Dolby Atmos surround sound speakers",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "VIP Lounge",
      caption: "Exclusive VIP lounge for premium bookings",
    },
    {
      src: "/placeholder.svg?height=800&width=600",
      alt: "Anniversary Setup",
      caption: "Special anniversary celebration setup",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1920"
          alt="CineSuite Gallery"
          fill
          className="object-cover brightness-[0.6]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="container relative z-10 flex h-full flex-col justify-center px-4 sm:px-6">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Our Gallery</h1>
          <p className="max-w-xl text-lg text-white/90">
            Take a visual tour of our premium home theatre experiences and setups.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Experience CineSuite</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Browse through our gallery to see the premium experiences we offer and get inspired for your next booking.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl">
                <div className="aspect-square sm:aspect-[4/3]">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="font-medium">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">See CineSuite in Action</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Watch our showcase video to get a better feel for the CineSuite experience. From our comfortable
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
              <Image
                src="/placeholder.svg?height=720&width=1280"
                alt="CineSuite Video Showcase"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1920"
            alt="Theatre Background"
            fill
            className="object-cover brightness-[0.3]"
          />
        </div>
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Create Your Own Memories?
            </h2>
            <p className="mb-8 text-lg text-white/80">
              Book your private cinema experience today and be part of our growing gallery of happy customers.
            </p>
            <Button size="lg" className="px-8" asChild>
              <Link href="/book-now">Book Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

