// "use client"

// import React, { createContext, useState, useContext, useEffect } from "react"


// interface BookingData {
//   screenId: number
//   screenName: string
//   date: string
//   time: string
//   price: number
//   persons: number
//   customerName?: string
//   email?: string
//   whatsapp?: string
//   wantDecoration?: string
//   occasion?: string
//   occasionName?: string
//   occasionNames?: string[]
//   cake?: {
//     id: string
//     name: string
//     price: number
//   }
//   addons?: Array<{
//     id: string
//     name: string
//     price: number
//   }>
// }

// interface BookingContextType {
//   bookingData: BookingData
//   setBookingData: React.Dispatch<React.SetStateAction<BookingData>>
//   updateBookingData: (data: Partial<BookingData>) => void
//   resetBookingData: () => void
//   currentStep: number
//   setCurrentStep: (step: number) => void
//   formData: {
//     name: string
//     persons: string
//     whatsapp: string
//     email: string
//     wantDecoration: string
//   }
//   setFormData: React.Dispatch<React.SetStateAction<{
//     name: string
//     persons: string
//     whatsapp: string
//     email: string
//     wantDecoration: string
//   }>>
//   selectedOccasion: string | null
//   setSelectedOccasion: React.Dispatch<React.SetStateAction<string | null>>
//   occasionNames: string[]
//   setOccasionNames: React.Dispatch<React.SetStateAction<string[]>>
//   selectedCake: string | null
//   setSelectedCake: React.Dispatch<React.SetStateAction<string | null>>
//   selectedAddons: string[]
//   setSelectedAddons: React.Dispatch<React.SetStateAction<string[]>>
//   termsAccepted: boolean
//   setTermsAccepted: React.Dispatch<React.SetStateAction<boolean>>
// }

// const initialBookingData: BookingData = {
//   screenId: 1,
//   screenName: "Screen 1",
//   date: "",
//   time: "",
//   price: 0,
//   persons: 1,
// }

// const initialFormData = {
//   name: "",
//   persons: "1",
//   whatsapp: "",
//   email: "",
//   wantDecoration: "no",
// }

// const BookingContext = createContext<BookingContextType | undefined>(undefined)

// export const BookingProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
//   const [bookingData, setBookingData] = useState<BookingData>(initialBookingData)
//   const [currentStep, setCurrentStep] = useState(1)
//   const [formData, setFormData] = useState(initialFormData)
//   const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null)
//   const [occasionNames, setOccasionNames] = useState<string[]>(["", ""])
//   const [selectedCake, setSelectedCake] = useState<string | null>(null)
//   const [selectedAddons, setSelectedAddons] = useState<string[]>([])
//   const [termsAccepted, setTermsAccepted] = useState(false)

//   // Load data from sessionStorage on initial mount
//   useEffect(() => {
//     const storedData = sessionStorage.getItem("bookingData")
//     if (storedData) {
//       const parsedData = JSON.parse(storedData)
//       setBookingData(parsedData)
      
//       // Pre-fill form data if available
//       if (parsedData.customerName || parsedData.persons || parsedData.whatsapp || parsedData.email || parsedData.wantDecoration) {
//         setFormData({
//           name: parsedData.customerName || "",
//           persons: parsedData.persons?.toString() || "1",
//           whatsapp: parsedData.whatsapp || "",
//           email: parsedData.email || "",
//           wantDecoration: parsedData.wantDecoration || "no",
//         })
//       }
      
//       // Pre-fill occasion data if available
//       if (parsedData.occasion) {
//         setSelectedOccasion(parsedData.occasion)
//       }
//       if (parsedData.occasionNames && parsedData.occasionNames.length) {
//         setOccasionNames(parsedData.occasionNames)
//       }

//       // Pre-fill cake selection if available
//       if (parsedData.cake && parsedData.cake.id) {
//         setSelectedCake(parsedData.cake.id)
//       }

//       // Pre-fill addons if available
//       if (parsedData.addons && Array.isArray(parsedData.addons)) {
//         setSelectedAddons(parsedData.addons.map((addon: any) => addon.id))
//       }
//     }
//   }, [])

//   // Update session storage whenever booking data changes
//   useEffect(() => {
//     sessionStorage.setItem("bookingData", JSON.stringify(bookingData))
//   }, [bookingData])

//   const updateBookingData = (data: Partial<BookingData>) => {
//     setBookingData(prev => {
//       const updated = { ...prev, ...data }
//       return updated
//     })
//   }

//   const resetBookingData = () => {
//     setBookingData(initialBookingData)
//     setFormData(initialFormData)
//     setSelectedOccasion(null)
//     setOccasionNames(["", ""])
//     setSelectedCake(null)
//     setSelectedAddons([])
//     setTermsAccepted(false)
//     setCurrentStep(1)
//     sessionStorage.removeItem("bookingData")
//   }

//   return (
//     <BookingContext.Provider value={{ 
//       bookingData, 
//       setBookingData,
//       updateBookingData,
//       resetBookingData,
//       currentStep,
//       setCurrentStep,
//       formData,
//       setFormData,
//       selectedOccasion,
//       setSelectedOccasion,
//       occasionNames,
//       setOccasionNames,
//       selectedCake,
//       setSelectedCake,
//       selectedAddons,
//       setSelectedAddons,
//       termsAccepted,
//       setTermsAccepted
//     }}>
//       {children}
//     </BookingContext.Provider>
//   )
// }

// export const useBooking = () => {
//   const context = useContext(BookingContext)
//   if (context === undefined) {
//     throw new Error('useBooking must be used within a BookingProvider')
//   }
//   return context
// }