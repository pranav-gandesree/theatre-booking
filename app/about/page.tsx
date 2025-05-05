"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, Clock, Film, Star, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[100vh] w-full overflow-hidden">
        <Image
          src="/about.jpg"
          alt="About yovanAV"
          fill
          className="object-cover brightness-[0.6]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="container relative z-10 flex h-full flex-col justify-center px-4 sm:px-6">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Our Story</h1>
          <p className="max-w-xl text-lg text-white/90">
            Learn about how yovanAV is revolutionizing the private cinema experience.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">From Passion to Premium Experience</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  yovanAV was born from a simple idea: everyone deserves access to a premium cinema experience without
                  the crowds and distractions of traditional theaters.
                </p>
                <p>
                  Founded in 2023 by a group of film enthusiasts and tech innovators, we set out to create intimate,
                  customizable cinema spaces that could be booked for private events, celebrations, or simply a special
                  night out.
                </p>
                <p>
                  What started as a single room with a projector has quickly grown into a state-of-the-art facility
                  featuring multiple themed cinema suites, each equipped with the latest in audio-visual technology,
                  comfortable seating, and personalized service.
                </p>
                <p>
                  Today, yovanAV is the premier destination for those seeking to elevate their viewing experience,
                  whether it's for a birthday celebration, anniversary, corporate event, or just a memorable night with
                  friends and family.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-xl md:h-[500px]">
              <Image
                src="/about2.jpg"
                alt="yovanAV Founders"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gradient-to-br from-[#0d0f12] to-[#1a1c20] py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Values</h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              At yovanAV, we're guided by a commitment to excellence and a passion for creating unforgettable
              experiences.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: Film, title: "Quality", desc: "We never compromise on the quality of our equipment, service, or overall experience." },
              { Icon: Users, title: "Personalization", desc: "We tailor every experience to meet the unique needs and preferences of our customers." },
              { Icon: Star, title: "Innovation", desc: "We continuously seek new ways to enhance our offerings and stay ahead of industry trends." },
              { Icon: Award, title: "Excellence", desc: "We strive for excellence in every aspect of our business, from customer service to technical performance." }
            ].map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/5 p-6 shadow-xl backdrop-blur-md transition hover:scale-105 hover:shadow-2xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20 text-red-400 shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
                <p className="text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { Icon: Film, title: "Premium Equipment", desc: "4K projectors, Dolby Atmos sound systems, and comfortable seating." },
                  { Icon: Users, title: "Private Experience", desc: "Exclusive use of the space for you and your guests only." },
                  { Icon: Clock, title: "Flexible Scheduling", desc: "Book for as little as 2 hours or for a full-day event." },
                  { Icon: Star, title: "Concierge Service", desc: "Dedicated staff to assist with setup and throughout your experience." },
                ].map(({ Icon, title, desc }, i) => (
                  <div key={i} className="rounded-xl bg-white p-6 shadow-md">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Why Choose yovanAV?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At yovanAV, we've reimagined what a cinema experience can be. Our private theatre spaces offer a
                  level of comfort, quality, and personalization that traditional cinemas simply can't match.
                </p>
                <p>
                  From the moment you book with us, our team works to ensure every detail is tailored to your
                  preferences. Choose your content, customize your environment, and enjoy a truly immersive experience.
                </p>
                <p>
                  Whether you're celebrating a special occasion, hosting a corporate event, or simply wanting to elevate
                  your movie night, yovanAV provides the perfect setting.
                </p>
              </div>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/book-now">Book Your Experience</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
