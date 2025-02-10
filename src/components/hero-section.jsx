import { Zap, Shield } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-8">
            Let's find you
            <br />
            <span className="text-blue-600">the Best Insurance</span>
          </h1>
          <div className="flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              <p className="text-gray-600 dark:text-gray-300">50 insurers offering lowest prices</p>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-orange-500" />
              <p className="text-gray-600 dark:text-gray-300">Quick, easy & hassle free</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

