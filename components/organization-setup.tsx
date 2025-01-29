import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { db } from "../app/firebase/config"
import { collection, addDoc, getDocs } from "firebase/firestore"
import { ScrapedPage } from "@/types/dummy-pages"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface OrganizationSetupProps {
  nextStep: () => void
  prevStep: () => void
  updateOrgData: (data: any) => void
}

export default function OrganizationSetup({ nextStep, prevStep, updateOrgData }: OrganizationSetupProps) {
  const [companyName, setCompanyName] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [description, setDescription] = useState("")
  const [scrapedPages, setScrapedPages] = useState<ScrapedPage[]>([])
  const [isFetchingMeta, setIsFetchingMeta] = useState(false)
  const [showWebsitePages, setShowWebsitePages] = useState(false)

  useEffect(() => {
    if (showWebsitePages) {
      fetchScrapedPages()
    }
  }, [showWebsitePages])

  const fetchScrapedPages = async () => {
    const pagesSnapshot = await getDocs(collection(db, "scraped-pages"))
    const pagesData = pagesSnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      url: data.url || '', // Required by ScrapedPage interface
      status: data.status || 'detected', // Required by ScrapedPage interface
      chunks: data.chunks || [], // Required by ScrapedPage interface
      lastUpdated: new Date(),
      title: data.title,
      metaDescription: "Sample meta description for the page",
      // Adding dummy data for demonstration
      pageViews: Math.floor(Math.random() * 1000),
      avgTimeOnPage: Math.floor(Math.random() * 300),
      bounceRate: (Math.random() * 100).toFixed(2) + "%",
    } as ScrapedPage
  })
  setScrapedPages(pagesData)
}


  const fetchMetaDescription = async () => {
    if (!websiteUrl) return

    setIsFetchingMeta(true)
    try {
      let url = websiteUrl
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`
      }

      const response = await fetch(`/api/fetch-meta?url=${encodeURIComponent(url)}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.metaDescription) {
        setDescription(data.metaDescription)
      } else {
        throw new Error("No meta description found")
      }
    } catch (error) {
      console.error("Error fetching meta description:", error)
      alert("Cannot fetch meta details right now. Please try again later!")
    } finally {
      setIsFetchingMeta(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "organizations"), {
        companyName,
        websiteUrl,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'setup'
      })
      updateOrgData({ 
        companyName, 
        websiteUrl, 
        description, 
        id: docRef.id 
      })
      nextStep()
    } catch (error) {
      console.error("Error adding organization:", error)
    }
  }

  const handleIntegrate = () => {
    if (companyName && websiteUrl && description) {
      setShowWebsitePages(true)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      detected: "bg-gray-500",
      scraping: "bg-blue-500 animate-pulse",
      completed: "bg-green-500",
      failed: "bg-red-500"
    }
    
    return (
      <Badge className={`${statusStyles[status as keyof typeof statusStyles]}`}>
        {status}
      </Badge>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Organization Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input 
              id="companyName" 
              value={companyName} 
              onChange={(e) => setCompanyName(e.target.value)} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website URL</Label>
            <div className="flex space-x-2">
              <Input 
                id="websiteUrl" 
                value={websiteUrl} 
                onChange={(e) => setWebsiteUrl(e.target.value)} 
                required 
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={fetchMetaDescription}
                disabled={isFetchingMeta || !websiteUrl}
              >
                {isFetchingMeta && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Fetch Meta
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Company Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
              className="h-32"
            />
          </div>

          <Button 
            type="button"
            onClick={handleIntegrate}
            disabled={!companyName || !websiteUrl || !description}
            className="w-full"
          >
            Integrate
          </Button>
        </form>

        {showWebsitePages && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Website Pages</h3>
              <div className="flex space-x-2 text-sm">
                <Badge variant="outline">
                  Detected: {scrapedPages.filter(p => p.status === 'detected').length}
                </Badge>
                <Badge variant="outline">
                  Scraping: {scrapedPages.filter(p => p.status === 'scraping').length}
                </Badge>
                <Badge variant="outline">
                  Completed: {scrapedPages.filter(p => p.status === 'completed').length}
                </Badge>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {scrapedPages.map((page) => (
                <AccordionItem key={page.id} value={page.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="grid grid-cols-4 w-full">
                      <span className="truncate">{page.url}</span>
                      <span>{page.title}</span>
                      <span>{page.lastUpdated.toLocaleDateString()}</span>
                      <span>{getStatusBadge(page.status)}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Page Views</Label>
                          <p className="text-lg font-semibold">{page.pageViews}</p>
                        </div>
                        <div>
                          <Label>Avg. Time on Page</Label>
                          <p className="text-lg font-semibold">{page.avgTimeOnPage}s</p>
                        </div>
                        <div>
                          <Label>Bounce Rate</Label>
                          <p className="text-lg font-semibold">{page.bounceRate}</p>
                        </div>
                      </div>

                      <div>
                        <Label>Meta Description</Label>
                        <p className="text-sm text-gray-600">{page.metaDescription}</p>
                      </div>

                      <div>
                        <Label>Content Chunks</Label>
                        <div className="space-y-2 mt-2">
                          {page.chunks.map((chunk, index) => (
                            <p key={index} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                              {chunk}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button onClick={prevStep} variant="outline">
          Back
        </Button>
        {showWebsitePages && (
            <Button onClick={handleSubmit}>
          Continue Setup
        </Button>
        )}
      </CardFooter>
    </Card>
  )
}