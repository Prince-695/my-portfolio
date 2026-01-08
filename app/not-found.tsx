"use client"

import { useRouter } from "next/navigation"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* OS Window */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-300">
          {/* Window Header */}
          <div className="bg-gradient-to-b from-gray-200 to-gray-300 px-4 py-3 flex items-center justify-between border-b border-gray-400">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600" onClick={() => router.push('/')} />
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 " />
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 " />
              </div>
            </div>
            <div className="flex-1 text-center">
              <p className="text-sm font-medium text-gray-700">Error</p>
            </div>
            <div className="w-16"></div>
          </div>

          {/* Window Content */}
          <div className="p-8 md:p-12 text-center">
            {/* Error Icon */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <Search className="w-12 h-12 md:w-16 md:h-16 text-blue-600" strokeWidth={1.5} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                  !
                </div>
              </div>
            </div>

            {/* Error Code */}
            <h1 className="text-7xl md:text-8xl font-bold text-gray-800 mb-4">404</h1>

            {/* Error Message */}
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-8 text-sm md:text-base leading-relaxed max-w-md mx-auto">
              The page you're looking for doesn't exist. It might have been moved, deleted, or the URL might be incorrect.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={() => router.back()}
                className="group px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center shadow-sm hover:shadow-md"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </button>
              <button
                onClick={() => router.push('/')}
                className="group px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center shadow-md hover:shadow-lg"
              >
                <Home className="w-4 h-4" />
                Go Home
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Error Code: 404 | Page Not Found
              </p>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Lost? Don't worry, even the best explorers take wrong turns.
        </p>
      </div>
    </div>
  )
}
