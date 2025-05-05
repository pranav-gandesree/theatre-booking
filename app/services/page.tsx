import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Check, Settings, Speaker, Tv } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="flex flex-col">


      {/* Services Overview */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Premium <span className="text-red-500">AV</span> Experiences
                </h2>

            <p className="mx-auto max-w-2xl text-muted-foreground">
              From private theatre bookings to custom home installations, we offer comprehensive solutions for cinema
              enthusiasts.
            </p>
          </div>

          <Tabs defaultValue="private-theatres" className="mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
              <TabsTrigger value="private-theatres">Private Theatres</TabsTrigger>
              <TabsTrigger value="custom-setups">Custom Home Setups</TabsTrigger>
              <TabsTrigger value="acoustics">Acoustics Solutions</TabsTrigger>
            </TabsList>

            {/* Private Theatres Tab */}
            <TabsContent value="private-theatres" className="mt-8">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                  <Image
                    src="https://res.cloudinary.com/dawavjsrp/image/upload/v1746445156/IMG-20250426-WA0015_bpazbm.jpg"
                    alt="Private Theatre"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-bold">Private Theatre Experiences</h3>
                  <p className="mb-6 text-muted-foreground">
                    Our private theatre spaces offer an exclusive cinema experience for you and your guests. With
                    state-of-the-art projection systems, immersive sound, and luxurious seating, you'll enjoy the
                    perfect movie experience without the distractions of a public theatre.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Exclusive Access</p>
                        <p className="text-sm text-muted-foreground">
                          Private use of the entire theatre space for you and your guests only.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Premium Equipment</p>
                        <p className="text-sm text-muted-foreground">
                          4K laser projectors, Dolby Atmos sound systems, and luxury recliner seating.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Customizable Experience</p>
                        <p className="text-sm text-muted-foreground">
                          Control lighting, temperature, and sound levels to your preference.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button asChild>
                      <Link href="/book-now">
                        Book a Private Theatre <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>


<div className="mt-16  text-black py-16">
  <div className="container mx-auto px-4">
    <h3 className="mb-10 text-3xl font-bold text-center">Available Theatre Options</h3>
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {/* Standard Theatre */}
      <Card className=" border border-primary rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-black">Standard Theatre</CardTitle>
          <CardDescription className="text-gray-800">Perfect for small groups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 aspect-video overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Standard Theatre"
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
          <ul className="space-y-2 text-sm text-gray-800">
            <li className="flex items-center">
              <Tv className="mr-2 h-4 w-4 text-primary" />
              <span>4K Projection</span>
            </li>
            <li className="flex items-center">
              <Speaker className="mr-2 h-4 w-4 text-primary" />
              <span>7.1 Surround Sound</span>
            </li>
            <li className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-primary" />
              <span>Up to 10 guests</span>
            </li>
          </ul>
          <p className="mt-4 text-lg font-bold text-black">$150/hour</p>
        </CardContent>
        <CardFooter>  
          <Button
            variant="outline"
            className="w-full border border-primary text-primary hover:bg-primary hover:text-white transition"
            asChild
          >
            <Link href="/book-now">Book Now</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Premium Theatre */}
      <Card className="bg-[#1a1a1a] border border-[#333] rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-white">Premium Theatre</CardTitle>
          <CardDescription className="text-gray-400">Enhanced experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 aspect-video overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Premium Theatre"
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center">
              <Tv className="mr-2 h-4 w-4 text-blue-500" />
              <span>4K Laser Projection</span>
            </li>
            <li className="flex items-center">
              <Speaker className="mr-2 h-4 w-4 text-blue-500" />
              <span>Dolby Atmos Sound</span>
            </li>
            <li className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-blue-500" />
              <span>Up to 15 guests</span>
            </li>
          </ul>
          <p className="mt-4 text-lg font-bold text-white">$250/hour</p>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
            asChild
          >
            <Link href="/book-now">Book Now</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* VIP Suite */}
      <Card className="bg-[#1a1a1a] border border-[#333] rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-white">VIP Suite</CardTitle>
          <CardDescription className="text-gray-400">Ultimate luxury</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 aspect-video overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="VIP Suite"
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center">
              <Tv className="mr-2 h-4 w-4 text-blue-500" />
              <span>8K Projection</span>
            </li>
            <li className="flex items-center">
              <Speaker className="mr-2 h-4 w-4 text-blue-500" />
              <span>Premium Dolby Atmos</span>
            </li>
            <li className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-blue-500" />
              <span>Up to 8 guests with luxury recliners</span>
            </li>
          </ul>
          <p className="mt-4 text-lg font-bold text-white">$350/hour</p>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
            asChild
          >
            <Link href="/book-now">Book Now</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</div>



            </TabsContent>

            {/* Custom Home Setups Tab */}
            <TabsContent value="custom-setups" className="mt-8">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div className="order-2 md:order-1">
                  <h3 className="mb-4 text-2xl font-bold">Customized Home Theatre Setups</h3>
                  <p className="mb-6 text-muted-foreground">
                    Transform any room in your home into a professional-grade cinema experience. Our expert team designs
                    and installs custom home theatre systems tailored to your space, preferences, and budget. From basic
                    setups to elaborate dedicated theatre rooms, we handle every aspect of the project.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Professional Consultation</p>
                        <p className="text-sm text-muted-foreground">
                          Expert advice on equipment selection, room layout, and acoustics.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Custom Installation</p>
                        <p className="text-sm text-muted-foreground">
                          Professional installation of all equipment, wiring, and control systems.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Smart Integration</p>
                        <p className="text-sm text-muted-foreground">
                          Integration with smart home systems for seamless control.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button asChild>
                      <Link href="/contact">
                        Request a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="relative order-1 aspect-[4/3] md:order-2 overflow-hidden rounded-xl">
                  <Image
                    src="/placeholder.svg?height=800&width=1000"
                    alt="Custom Home Theatre"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-16">
                <h3 className="mb-6 text-xl font-bold">Our Home Theatre Packages</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Starter Package</CardTitle>
                      <CardDescription>Entry-level home cinema</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Starter Home Theatre"
                          width={600}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Tv className="mr-2 h-4 w-4 text-primary" />
                          <span>4K Projector or 65" OLED TV</span>
                        </li>
                        <li className="flex items-center">
                          <Speaker className="mr-2 h-4 w-4 text-primary" />
                          <span>5.1 Surround Sound System</span>
                        </li>
                        <li className="flex items-center">
                          <Settings className="mr-2 h-4 w-4 text-primary" />
                          <span>Basic Control System</span>
                        </li>
                      </ul>
                      <p className="mt-4 text-lg font-bold">Starting at $5,000</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/contact">Get Quote</Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Premium Package</CardTitle>
                      <CardDescription>High-end home cinema</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Premium Home Theatre"
                          width={600}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Tv className="mr-2 h-4 w-4 text-primary" />
                          <span>4K Laser Projector with 120" Screen</span>
                        </li>
                        <li className="flex items-center">
                          <Speaker className="mr-2 h-4 w-4 text-primary" />
                          <span>7.1.4 Dolby Atmos System</span>
                        </li>
                        <li className="flex items-center">
                          <Settings className="mr-2 h-4 w-4 text-primary" />
                          <span>Advanced Control System</span>
                        </li>
                      </ul>
                      <p className="mt-4 text-lg font-bold">Starting at $15,000</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/contact">Get Quote</Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Ultimate Package</CardTitle>
                      <CardDescription>Reference-level cinema</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Ultimate Home Theatre"
                          width={600}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Tv className="mr-2 h-4 w-4 text-primary" />
                          <span>8K Projection with 150"+ Screen</span>
                        </li>
                        <li className="flex items-center">
                          <Speaker className="mr-2 h-4 w-4 text-primary" />
                          <span>Reference-Grade Audio System</span>
                        </li>
                        <li className="flex items-center">
                          <Settings className="mr-2 h-4 w-4 text-primary" />
                          <span>Full Automation & Custom Seating</span>
                        </li>
                      </ul>
                      <p className="mt-4 text-lg font-bold">Starting at $30,000</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/contact">Get Quote</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Acoustics Tab */}
            <TabsContent value="acoustics" className="mt-8">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src="/placeholder.svg?height=800&width=1000"
                    alt="Acoustic Treatment"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-bold">Acoustic Solutions</h3>
                  <p className="mb-6 text-muted-foreground">
                    Perfect sound requires perfect acoustics. Our acoustic solutions enhance the audio quality in your
                    home theatre or private cinema by eliminating unwanted reflections, resonances, and external noise.
                    We provide professional acoustic analysis, design, and installation services to create the optimal
                    listening environment.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Acoustic Analysis</p>
                        <p className="text-sm text-muted-foreground">
                          Professional measurement and analysis of your room's acoustic properties.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Custom Treatment</p>
                        <p className="text-sm text-muted-foreground">
                          Tailored acoustic panels, bass traps, and diffusers designed for your space.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Soundproofing</p>
                        <p className="text-sm text-muted-foreground">
                          Solutions to minimize sound transfer between rooms and external noise.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button asChild>
                      <Link href="/contact">
                        Schedule an Acoustic Analysis <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-16">
                <h3 className="mb-6 text-xl font-bold">Acoustic Treatment Options</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Absorption Panels</CardTitle>
                      <CardDescription>Control reflections</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Absorption Panels"
                          width={600}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Acoustic absorption panels reduce sound reflections and echo, improving clarity and
                        intelligibility. Our panels are available in various sizes, thicknesses, and fabric finishes to
                        complement your décor.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/contact">Learn More</Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Bass Traps</CardTitle>
                      <CardDescription>Low frequency control</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Bass Traps"
                          width={600}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Bass traps manage low-frequency resonances that can cause boomy or muddy bass response.
                        Strategically placed in corners and wall-ceiling junctions, they ensure tight, accurate bass
                        throughout your listening space.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/contact">Learn More</Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Soundproofing</CardTitle>
                      <CardDescription>Noise isolation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Soundproofing"
                          width={600}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Our soundproofing solutions prevent sound from escaping your theatre room and block external
                        noise from entering. Options include acoustic doors, wall insulation, floating floors, and
                        isolated ceiling systems.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/contact">Learn More</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Process Section */}
      {/* <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Our Process</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              We follow a comprehensive approach to ensure your cinema experience or installation exceeds expectations.
            </p>
          </div>
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative">
                <div className="absolute left-[22px] top-10 h-[calc(100%-40px)] w-px bg-border md:left-1/2 lg:left-[22px]"></div>
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <div className="ml-4 md:hidden lg:block">
                    <h3 className="text-lg font-bold">Consultation</h3>
                  </div>
                </div>
                <div className="mt-2 md:mt-4 md:text-center lg:mt-2 lg:text-left">
                  <h3 className="hidden text-lg font-bold md:block lg:hidden">Consultation</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We begin with a detailed consultation to understand your needs, preferences, and budget.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-[22px] top-10 h-[calc(100%-40px)] w-px bg-border md:left-1/2 lg:left-[22px]"></div>
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <div className="ml-4 md:hidden lg:block">
                    <h3 className="text-lg font-bold">Design</h3>
                  </div>
                </div>
                <div className="mt-2 md:mt-4 md:text-center lg:mt-2 lg:text-left">
                  <h3 className="hidden text-lg font-bold md:block lg:hidden">Design</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Our experts create a custom design plan tailored to your space and requirements.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-[22px] top-10 h-[calc(100%-40px)] w-px bg-border md:left-1/2 lg:left-[22px]"></div>
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <div className="ml-4 md:hidden lg:block">
                    <h3 className="text-lg font-bold">Implementation</h3>
                  </div>
                </div>
                <div className="mt-2 md:mt-4 md:text-center lg:mt-2 lg:text-left">
                  <h3 className="hidden text-lg font-bold md:block lg:hidden">Implementation</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Our skilled technicians handle the installation with meticulous attention to detail.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    4
                  </div>
                  <div className="ml-4 md:hidden lg:block">
                    <h3 className="text-lg font-bold">Calibration & Support</h3>
                  </div>
                </div>
                <div className="mt-2 md:mt-4 md:text-center lg:mt-2 lg:text-left">
                  <h3 className="hidden text-lg font-bold md:block lg:hidden">Calibration & Support</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We fine-tune your system for optimal performance and provide ongoing support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}





<section className="bg-muted/30 py-16 md:py-24">
  <div className="container px-4 sm:px-6">
    <div className="mb-12 text-center">
      <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Our Process</h2>
      <p className="mx-auto max-w-2xl text-muted-foreground">
        We follow a comprehensive approach to ensure your cinema experience or installation exceeds expectations.
      </p>
    </div>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
    
      <div className="card bg-white shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2">
        <div className="card-body p-6 text-center">
          <div className="flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
              1
            </div>
          </div>
          <h3 className="mt-4 text-lg font-bold">Consultation</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We begin with a detailed consultation to understand your needs, preferences, and budget.
          </p>
        </div>
      </div>

    
      <div className="card bg-white shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2">
        <div className="card-body p-6 text-center">
          <div className="flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
              2
            </div>
          </div>
          <h3 className="mt-4 text-lg font-bold">Design</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Our experts create a custom design plan tailored to your space and requirements.
          </p>
        </div>
      </div>

      
      <div className="card bg-white shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2">
        <div className="card-body p-6 text-center">
          <div className="flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
              3
            </div>
          </div>
          <h3 className="mt-4 text-lg font-bold">Implementation</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Our skilled technicians handle the installation with meticulous attention to detail.
          </p>
        </div>
      </div>

     
      <div className="card bg-white shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2">
        <div className="card-body p-6 text-center">
          <div className="flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
              4
            </div>
          </div>
          <h3 className="mt-4 text-lg font-bold">Calibration & Support</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We fine-tune your system for optimal performance and provide ongoing support.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>



    </div>
  )
}

function Users({ className, ...props }: React.ComponentProps<typeof Tv>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

