"use client"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import QuestionFlow from "./components/QuestionFlow"
import ReviewPage from "./components/ReviewPage"
import { OnboardingData, UserType } from "./types"
import { ENTREPRENEUR_QUESTIONS } from "./components/QuestionFlow"

const entrepreneurImages = [
  {
    src: "/Merlian Perkin 07-12.png",
    name: "Melanie Perkins",
    title: "CEO, Canva",
    position: "bottom-right"
  },
  {
    src: "/Elon Musk 07-12.jpg",
    name: "Elon Musk",
    title: "CEO, Tesla & X",
    position: "bottom-right"
  },
  {
    src: "/Jeff Bezos 07-12.jpg",
    name: "Jeff Bezos",
    title: "Founder, Amazon",
    position: "bottom-right"
  },
  {
    src: "/Jensen Huang 07-12.jpg",
    name: "Jensen Huang",
    title: "CEO, NVIDIA",
    position: "bottom-right"
  },
  {
    src: "/Mark Zuckerberg 07-12.jpg",
    name: "Mark Zuckerberg",
    title: "CEO, Meta",
    position: "bottom-right"
  },
  {
    src: "/Emma Grade 07-12.jpg",
    name: "Emma Grede",
    title: "Co-Founder, Good American & SKIMS",
    position: "bottom-right"
  },
  {
    src: "/Robert f smith 07-12.jpg",
    name: "Robert F. Smith",
    title: "Founder, Vista Equity Partners",
    position: "bottom-right"
  },
  {
    src: "/Satya Nadella 07-12.jpg",
    name: "Satya Nadella",
    title: "CEO, Microsoft",
    position: "bottom-right"
  },
  {
    src: "/sarah_blakely 07-12.jpg",
    name: "Sara Blakely",
    title: "Founder, Spanx",
    position: "bottom-right"
  }
]

type Screen = 'welcome' | 'questions' | 'review'

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome')
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({})
  const [userType] = useState<UserType>('entrepreneur')
  const [questionToEdit, setQuestionToEdit] = useState<string | null>(null)
  const [isEditingFromReview, setIsEditingFromReview] = useState(false)

  useEffect(() => {
    if (currentScreen === 'welcome') {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % entrepreneurImages.length)
      }, 5000) // Change image every 5 seconds

      return () => clearInterval(interval)
    }
  }, [currentScreen])

  // Preload next image
  const nextIndex = (currentIndex + 1) % entrepreneurImages.length
  const nextImage = entrepreneurImages[nextIndex]

  const currentImage = entrepreneurImages[currentIndex]
  const isTopRight = currentImage.position === "top-right"
  const isBottomRight = currentImage.position === "bottom-right"

  const handleNext = () => {
    setCurrentScreen('questions')
  }

  const handleUpdate = (data: OnboardingData) => {
    setOnboardingData(data)
  }

  const handleComplete = (data: OnboardingData) => {
    setOnboardingData(data)
    // Handle completion - you can add review screen logic here
    console.log('Onboarding completed:', data)
  }

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome')
  }

  const handleReview = (data: OnboardingData) => {
    setOnboardingData(data)
    // If editing from review, go back to review after updating
    if (isEditingFromReview) {
      setQuestionToEdit(null)
      setIsEditingFromReview(false)
      setCurrentScreen('review')
    } else {
      // First time completing questions, go to review
      setCurrentScreen('review')
    }
  }

  const handleEditQuestion = (questionId: string) => {
    const questions = ENTREPRENEUR_QUESTIONS.filter(q => q.type !== 'story')
    const questionIndex = questions.findIndex(q => q.id === questionId)
    if (questionIndex !== -1) {
      setQuestionToEdit(questionId)
      setIsEditingFromReview(true)
      setCurrentScreen('questions')
    }
  }

  const handleBackToQuestions = () => {
    setQuestionToEdit(null)
    setIsEditingFromReview(false)
    setCurrentScreen('questions')
  }

  const handleSubmit = (data: OnboardingData) => {
    setOnboardingData(data)
    console.log('Final onboarding data:', data)
    // You can add submission logic here (e.g., API call)
    alert('Thank you! Your answers have been submitted successfully.')
  }

  // Show review page if on review screen
  if (currentScreen === 'review') {
    return (
      <ReviewPage
        userType={userType}
        data={onboardingData}
        onEdit={handleEditQuestion}
        onSubmit={handleSubmit}
        onBack={handleBackToQuestions}
      />
    )
  }

  // Show questions flow if on questions screen
  if (currentScreen === 'questions') {
    const questions = ENTREPRENEUR_QUESTIONS.filter(q => q.type !== 'story')
    const initialStep = questionToEdit 
      ? questions.findIndex(q => q.id === questionToEdit)
      : 0
    
    return (
      <QuestionFlow
        userType={userType}
        data={onboardingData}
        onUpdate={handleUpdate}
        onComplete={handleComplete}
        onBackToSelection={handleBackToWelcome}
        onReview={handleReview}
        initialStep={initialStep >= 0 ? initialStep : 0}
        onBackToReview={handleBackToQuestions}
        isEditingFromReview={isEditingFromReview}
      />
    )
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4 py-6">
      <div className="max-w-2xl w-full space-y-4 flex flex-col items-center">
        {/* Welcome Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2"
        >
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to <span className="bg-gradient-to-r from-[#191970] to-[#4169E1] bg-clip-text text-transparent">DreamScale</span>
          </h1>
          <p className="text-muted-foreground text-base">
            We're excited to help you build, scale, and grow your business. Let's get started by learning more about your entrepreneurial journey.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative w-full max-w-md aspect-square">
          {/* Preload next image */}
          <div className="hidden">
            <Image
              src={nextImage.src}
              alt={nextImage.name}
              width={500}
              height={500}
              quality={95}
              priority={false}
            />
          </div>
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full rounded-lg overflow-hidden shadow-2xl"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.name}
                fill
                className="object-cover object-top"
                quality={95}
                priority={currentIndex === 0}
                sizes="(max-width: 768px) 100vw, 500px"
              />
              {/* Disclaimer Notice - Bottom Left */}
              <div className="absolute bottom-2 left-2 bg-black/30 backdrop-blur-sm rounded px-2 py-1">
                <p className="text-white/70 text-[10px] font-light">
                  Images: Not our property
                </p>
              </div>
              {/* Name and Title Overlay - Top Right */}
              {isTopRight && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-md px-4 py-2 text-right"
                >
                  <h3 className="text-white font-bold text-base mb-1">{currentImage.name}</h3>
                  <p className="text-white/90 text-sm">{currentImage.title}</p>
                </motion.div>
              )}
              {/* Name and Title Overlay - Bottom Right */}
              {isBottomRight && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-md px-4 py-2 text-right"
                >
                  <h3 className="text-white font-bold text-base mb-1">{currentImage.name}</h3>
                  <p className="text-white/90 text-sm">{currentImage.title}</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md mt-2"
        >
          <Button 
            size="lg" 
            className="w-full bg-[#191970] hover:bg-[#191970]/90 text-white"
            onClick={handleNext}
          >
            Next
          </Button>
        </motion.div>
      </div>
    </main>
  )
}
