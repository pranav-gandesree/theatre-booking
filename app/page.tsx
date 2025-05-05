// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, PartyPopper, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src="/main.jpg"
          alt="Home Theatre Experience"
          fill
          className="object-cover brightness-[0.8]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="container relative z-10 flex h-full flex-col justify-center px-4 sm:px-6">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Your Private Cinema <span className="text-primary">Experience</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg text-white/90">
              Transform any occasion into an unforgettable cinematic experience with our premium home theatre booking
              service.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" asChild>
                <Link href="/book-now">
                  Book Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                asChild
              >
                <Link href="/gallery">Explore Gallery</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container px-4 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Premium Experiences For Every Occasion
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Our home theatre offers the perfect setting for a variety of events, from movie nights to special
              celebrations.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                Icon: PartyPopper,
                title: "Birthday Celebrations",
                description:
                  "Make your birthday special with a private screening of your favorite films with friends and family.",
              },
              {
                Icon: Users,
                title: "Private Parties",
                description:
                  "Host an exclusive gathering with state-of-the-art sound and visuals in a comfortable, intimate setting.",
              },
              {
                Icon: Calendar,
                title: "Anniversaries",
                description:
                  "Celebrate your special day with a romantic movie night in our luxurious theatre environment.",
              },
            ].map(({ Icon, title, description }) => (
              <div
                key={title}
                className="group rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{title}</h3>
                <p className="mb-4 text-muted-foreground">{description}</p>
                <Link
                  href="/book-now"
                  className="inline-flex items-center text-sm font-medium text-primary"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/home2.jpg"
            alt="Theatre Background"
            fill
            className="object-cover brightness-[0.8]"
          />
        </div>
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready for an Unforgettable Experience?
            </h2>
            <p className="mb-8 text-lg text-white/80">
              Book our premium home theatre for your next event and create memories that will last a lifetime.
            </p>
            <Button size="lg" className="px-8" asChild>
              <Link href="/book-now">Book Your Experience</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-20">
        <div className="container px-4 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Don't just take our word for it. Here's what people are saying about their experience with us.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              "We celebrated our anniversary here and it was magical. The sound quality and screen size made us feel like we were in our own private cinema!",
              "My son's birthday party was a hit! All the kids loved watching their favorite movie on the big screen with surround sound.",
              "We hosted a corporate event here and it exceeded our expectations. The staff was professional and the setup was perfect.",
            ].map((text, i) => (
              <div key={i} className="rounded-xl bg-white p-6 shadow">
                <div className="mb-4 flex items-center space-x-2">
                  <div className="h-2 w-16 rounded bg-primary" />
                  <div className="h-2 w-4 rounded bg-primary/50" />
                </div>
                <p className="mb-4 italic text-muted-foreground">"{text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
