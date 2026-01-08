"use client"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, Thermometer, Droplets, Wind, Sunrise, Sunset, Cloud, CloudRain, CloudSnow, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type WeatherCondition = "sunny" | "partly-cloudy" | "cloudy" | "rainy" | "snowy"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

interface WeatherData {
  temp: number
  condition: string
  humidity: number
  windSpeed: number
  weatherCode: number
}

interface CityWeatherCard {
  city: string
  data: WeatherData | null
  loading: boolean
}

// WMO Weather interpretation codes
const getWeatherDescription = (code: number): string => {
  const weatherCodes: { [key: number]: string } = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
  }
  return weatherCodes[code] || "Unknown"
}

const getConditionFromCode = (code: number): WeatherCondition => {
  if (code === 0 || code === 1) return "sunny"
  if (code === 2 || code === 3) return "partly-cloudy"
  if (code === 45 || code === 48) return "cloudy"
  if (code >= 51 && code <= 82) return "rainy"
  if (code >= 71 && code <= 77 || code >= 85 && code <= 86) return "snowy"
  if (code >= 95) return "rainy"
  return "partly-cloudy"
}

export default function Weather() {
  const [city, setCity] = useState("London")
  const [searchQuery, setSearchQuery] = useState("")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [condition, setCondition] = useState<WeatherCondition>("partly-cloudy")
  const [popularCitiesWeather, setPopularCitiesWeather] = useState<CityWeatherCard[]>([
    { city: "London", data: null, loading: false },
    { city: "New York", data: null, loading: false },
    { city: "Tokyo", data: null, loading: false },
    { city: "Paris", data: null, loading: false },
    { city: "Sydney", data: null, loading: false },
    { city: "Mumbai", data: null, loading: false },
    { city: "Dubai", data: null, loading: false },
    { city: "Singapore", data: null, loading: false }
  ])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)
  
  const bgColor = "bg-gray-100"
  const textColor = "text-gray-800"
  const cardBg = "bg-white"
  const borderColor = "border-gray-200"

  // Geocoding function to get coordinates from city name
  const getCityCoordinates = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
      )
      const data = await response.json()
      
      if (data.results && data.results.length > 0) {
        return {
          lat: data.results[0].latitude,
          lon: data.results[0].longitude,
          name: data.results[0].name
        }
      }
      return null
    } catch (error) {
      console.error("Error fetching coordinates:", error)
      return null
    }
  }

  // Fetch weather data from Open-Meteo API
  const fetchWeatherData = async (cityName: string) => {
    setLoading(true)
    try {
      const coords = await getCityCoordinates(cityName)
      
      if (!coords) {
        alert("City not found. Please try another city.")
        setLoading(false)
        return
      }

      const { lat, lon, name } = coords
      
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
      )
      const data = await response.json()
      
      if (data.current) {
        const weatherData: WeatherData = {
          temp: Math.round(data.current.temperature_2m),
          condition: getWeatherDescription(data.current.weather_code),
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          weatherCode: data.current.weather_code
        }
        
        setWeather(weatherData)
        setCity(name)
        setCondition(getConditionFromCode(data.current.weather_code))
      }
    } catch (error) {
      console.error("Error fetching weather data:", error)
      alert("Failed to fetch weather data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Fetch weather for a city card without changing main display
  const fetchCityCardWeather = async (cityName: string, index: number) => {
    // Update loading state for this card
    setPopularCitiesWeather(prev => 
      prev.map((item, i) => i === index ? { ...item, loading: true } : item)
    )

    try {
      const coords = await getCityCoordinates(cityName)
      
      if (!coords) {
        setPopularCitiesWeather(prev => 
          prev.map((item, i) => i === index ? { ...item, loading: false } : item)
        )
        return
      }

      const { lat, lon } = coords
      
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
      )
      const data = await response.json()
      
      if (data.current) {
        const weatherData: WeatherData = {
          temp: Math.round(data.current.temperature_2m),
          condition: getWeatherDescription(data.current.weather_code),
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          weatherCode: data.current.weather_code
        }
        
        setPopularCitiesWeather(prev => 
          prev.map((item, i) => i === index ? { ...item, data: weatherData, loading: false } : item)
        )
      }
    } catch (error) {
      console.error("Error fetching city card weather:", error)
      setPopularCitiesWeather(prev => 
        prev.map((item, i) => i === index ? { ...item, loading: false } : item)
      )
    }
  }

  // Handle city card click
  const handleCityCardClick = (cityName: string, cityData: WeatherData | null) => {
    if (cityData) {
      setWeather(cityData)
      setCity(cityName)
      setCondition(getConditionFromCode(cityData.weatherCode))
    } else {
      fetchWeatherData(cityName)
    }
  }

  // Fetch default city weather on mount
  useEffect(() => {
    fetchWeatherData(city)
  }, [])

  // Fetch weather for all popular cities on mount
  useEffect(() => {
    const cities = ["London", "New York", "Tokyo", "Paris", "Sydney", "Mumbai", "Dubai", "Singapore"]
    cities.forEach((cityName, index) => {
      fetchCityCardWeather(cityName, index)
    })
  }, [])
  
  // Initialize particles and animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Initialize particles based on condition
    initParticles()
    
    // Start animation
    const animate = () => {
      if (!canvas || !ctx) return
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw particles
      updateParticles(ctx, canvas.width, canvas.height)
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [condition])
  
  // Update particles when condition changes
  useEffect(() => {
    initParticles()
  }, [condition])
  
  const initParticles = () => {
    particles.current = []
    
    const count = condition === "rainy" ? 100 : 
                  condition === "snowy" ? 80 : 
                  condition === "sunny" ? 50 : 30
    
    for (let i = 0; i < count; i++) {
      let particle: Particle
      
      if (condition === "rainy") {
        particle = {
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 7 + 10,
          opacity: Math.random() * 0.5 + 0.5,
          color: 'rgba(0, 90, 190, 0.6)'
        }
      } else if (condition === "snowy") {
        particle = {
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 2,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 + 1,
          opacity: Math.random() * 0.3 + 0.7,
          color: 'rgba(255, 255, 255, 0.8)'
        }
      } else if (condition === "sunny") {
        particle = {
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          color: `rgba(${255}, ${200 + Math.random() * 55}, ${0}, ${Math.random() * 0.7 + 0.3})`
        }
      } else {
        // Clouds
        particle = {
          x: Math.random() * 100,
          y: Math.random() * 30,
          size: Math.random() * 30 + 20,
          speedX: Math.random() * 0.2 - 0.1,
          speedY: 0,
          opacity: Math.random() * 0.2 + 0.1,
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
      
      particles.current.push(particle)
    }
  }
  
  const updateParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    particles.current.forEach(p => {
      // Convert percentage to actual position
      const x = (p.x / 100) * width
      const y = (p.y / 100) * height
      
      // Draw particle
      ctx.beginPath()
      
      if (condition === "rainy") {
        // Draw raindrops
        ctx.strokeStyle = p.color
        ctx.lineWidth = p.size / 2
        ctx.moveTo(x, y)
        ctx.lineTo(x + p.speedX, y + p.size * 2)
        ctx.stroke()
      } else if (condition === "snowy") {
        // Draw snowflakes
        ctx.fillStyle = p.color
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fill()
      } else if (condition === "sunny") {
        // Draw sun particles
        ctx.fillStyle = p.color
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Draw clouds
        ctx.fillStyle = p.color
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Update position
      p.x += p.speedX * 0.1
      p.y += p.speedY * 0.1
      
      // Reset position if out of bounds
      if (condition === "rainy") {
        if (p.y > 100) {
          p.y = 0
          p.x = Math.random() * 100
        }
        if (p.x < 0 || p.x > 100) {
          p.x = Math.random() * 100
        }
      } else if (condition === "snowy") {
        if (p.y > 100) {
          p.y = 0
          p.x = Math.random() * 100
        }
        if (p.x < 0 || p.x > 100) {
          p.x = Math.random() * 100
        }
      } else if (condition === "sunny") {
        // Keep sun particles within bounds
        if (p.x < 0) p.x = 100
        if (p.x > 100) p.x = 0
        if (p.y < 0) p.y = 100
        if (p.y > 100) p.y = 0
      } else {
        // Cloud movement
        if (p.x < -30) p.x = 130
        if (p.x > 130) p.x = -30
      }
    })
  }
  
  const handleSearch = () => {
    const query = searchQuery.trim()
    if (query) {
      fetchWeatherData(query)
      setSearchQuery("")
    }
  }
  
  const getWeatherIcon = (weatherCode: number) => {
    if (weatherCode === 0 || weatherCode === 1) return <Sun className="w-6 h-6" />
    if (weatherCode === 2 || weatherCode === 3) return <Cloud className="w-6 h-6" />
    if (weatherCode >= 51 && weatherCode <= 82) return <CloudRain className="w-6 h-6" />
    if (weatherCode >= 71 && weatherCode <= 86) return <CloudSnow className="w-6 h-6" />
    return <Cloud className="w-6 h-6" />
  }
  
  return (
    <div className={`h-full ${bgColor} ${textColor} flex flex-col relative overflow-hidden`}>
      {/* Canvas for weather effects - covers entire screen */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Content - scrollable */}
      <div className="relative z-10 flex flex-col h-full overflow-y-auto scrollbar-hide">
        {/* Search bar */}
        <div className="p-4 flex items-center space-x-2 shrink-0">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 bg-white border-gray-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <Button 
            onClick={handleSearch}
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Search
          </Button>
        </div>
        
        {/* Current weather */}
        <div className="px-6 py-4 flex flex-col md:flex-row items-start justify-between shrink-0 gap-4">
          {loading ? (
            <div className="text-center w-full py-8">
              <p className="text-gray-500">Loading weather data...</p>
            </div>
          ) : weather ? (
            <>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  <h2 className="text-2xl font-bold">{city}</h2>
                </div>
                <p className="text-gray-500 text-sm mt-1">Today</p>
                
                <div className="flex items-center mt-4">
                  <div className="text-6xl font-light mr-4">{weather.temp}°</div>
                  <div>
                    <p className="text-lg">{weather.condition}</p>
                    <p className="text-sm text-gray-500">Real-time data</p>
                  </div>
                </div>
              </div>
              
              <div className={`${cardBg} p-4 rounded-lg border ${borderColor} grid grid-cols-2 gap-4 w-full md:w-auto`}>
                <div className="flex items-center">
                  <Droplets className="w-5 h-5 mr-2 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Humidity</p>
                    <p className="font-medium">{weather.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Wind className="w-5 h-5 mr-2 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Wind</p>
                    <p className="font-medium">{weather.windSpeed} km/h</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Thermometer className="w-5 h-5 mr-2 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500">Temperature</p>
                    <p className="font-medium">{weather.temp}°C</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {getWeatherIcon(weather.weatherCode)}
                  <div className="ml-2">
                    <p className="text-sm text-gray-500">Condition</p>
                    <p className="font-medium text-xs">{weather.condition}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center w-full py-8">
              <p className="text-gray-500">Search for a city to see weather data</p>
            </div>
          )}
        </div>
        
        {/* Popular Cities Cards */}
        <div className="px-6 py-4 flex-1">
          <h3 className="text-lg font-medium mb-4">Popular Cities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {popularCitiesWeather.map((cityCard, index) => (
              <div
                key={cityCard.city}
                onClick={() => handleCityCardClick(cityCard.city, cityCard.data)}
                className={`${cardBg} p-4 rounded-lg border ${borderColor}  
                  hover:shadow-lg transition-shadow duration-200 
                  ${city === cityCard.city ? 'ring-2 ring-blue-500' : ''}`}
              >
                {cityCard.loading ? (
                  <div className="flex items-center justify-center h-24">
                    <p className="text-xs text-gray-400">Loading...</p>
                  </div>
                ) : cityCard.data ? (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm truncate">{cityCard.city}</h4>
                      {getWeatherIcon(cityCard.data.weatherCode)}
                    </div>
                    <div className="flex items-baseline mb-2">
                      <span className="text-3xl font-light">{cityCard.data.temp}°</span>
                      <span className="text-xs text-gray-500 ml-1">C</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 truncate">{cityCard.data.condition}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Droplets className="w-3 h-3 mr-1" />
                        <span>{cityCard.data.humidity}%</span>
                      </div>
                      <div className="flex items-center">
                        <Wind className="w-3 h-3 mr-1" />
                        <span>{cityCard.data.windSpeed} km/h</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-24">
                    <p className="text-xs text-gray-400">No data</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
