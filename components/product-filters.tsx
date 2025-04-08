"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Search, X, SlidersHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [sort, setSort] = useState(searchParams.get("sort") || "")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setSearch(searchParams.get("search") || "")
      setCategory(searchParams.get("category") || "")
      setSort(searchParams.get("sort") || "")
    }
  }, [searchParams, mounted])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters({ search })
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    updateFilters({ category: value })
  }

  const handleSortChange = (value: string) => {
    setSort(value)
    updateFilters({ sort: value })
  }

  const clearFilters = () => {
    setSearch("")
    setCategory("")
    setSort("")
    setPriceRange([0, 300])
    router.push("/products")
  }

  const updateFilters = (updates: { search?: string; category?: string; sort?: string }) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    router.push(`/products?${params.toString()}`)
  }

  if (!mounted) return null

  const categories = [
    { id: "diagnostic", label: "Diagnostic", count: 4 },
    { id: "emergency", label: "Emergency", count: 1 },
    { id: "protection", label: "Protection", count: 3 },
    { id: "mobility", label: "Mobility", count: 2 },
    { id: "respiratory", label: "Respiratory", count: 1 },
  ]

  const sortOptions = [
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
    { id: "name-asc", label: "Name: A to Z" },
    { id: "name-desc", label: "Name: Z to A" },
  ]

  const hasActiveFilters = search || category || sort

  const formatPrice = (value: number) => {
    return `$${value}`
  }

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Filters</h3>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button type="submit" size="sm">
            Search
          </Button>
        </form>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="mb-4 text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear filters
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price", "sort"]}>
        <AccordionItem value="categories" className="border-b">
          <AccordionTrigger className="text-base font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${item.id}`}
                      checked={category === item.id}
                      onCheckedChange={() => {
                        handleCategoryChange(category === item.id ? "" : item.id)
                      }}
                    />
                    <Label htmlFor={`category-${item.id}`} className="text-sm cursor-pointer">
                      {item.label}
                    </Label>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.count}
                  </Badge>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-b">
          <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 300]}
                max={300}
                step={5}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex items-center justify-between">
                <p className="text-sm">{formatPrice(priceRange[0])}</p>
                <p className="text-sm">{formatPrice(priceRange[1])}</p>
              </div>
              <Button size="sm" className="w-full" variant="outline">
                Apply Price Range
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sort" className="border-b">
          <AccordionTrigger className="text-base font-medium">Sort By</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={sort} onValueChange={handleSortChange}>
              {sortOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 py-1">
                  <RadioGroupItem value={option.id} id={`sort-${option.id}`} />
                  <Label htmlFor={`sort-${option.id}`} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability" className="border-b">
          <AccordionTrigger className="text-base font-medium">Availability</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="in-stock" />
                <Label htmlFor="in-stock" className="text-sm cursor-pointer">
                  In Stock Only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="featured" />
                <Label htmlFor="featured" className="text-sm cursor-pointer">
                  Featured Products
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )

  return (
    <>
      {/* Desktop filters */}
      <div className="hidden md:block">
        <Card className="border-none shadow-md bg-gradient-to-br from-background to-muted/50">
          <CardContent className="p-6">
            <FiltersContent />
          </CardContent>
        </Card>
      </div>

      {/* Mobile filters button */}
      <div className="md:hidden mb-6">
        <Button
          variant="outline"
          className="w-full flex items-center justify-between"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <span className="flex items-center">
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
          </span>
          {hasActiveFilters && <Badge className="ml-2">Active</Badge>}
        </Button>
      </div>

      {/* Mobile filters panel */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 bg-background z-50 md:hidden overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <FiltersContent />
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={clearFilters}>
                Clear All
              </Button>
              <Button onClick={() => setMobileFiltersOpen(false)}>Apply Filters</Button>\
