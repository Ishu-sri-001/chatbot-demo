"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { db } from "../firebase/config"
import { collection, addDoc, getDocs } from "firebase/firestore"

interface OrganizationSetupProps {
  nextStep: () => void
  prevStep: () => void
  updateOrgData: (data: any) => void
}

export default function OrganizationSetup({ nextStep, prevStep, updateOrgData }: OrganizationSetupProps) {
  const [companyName, setCompanyName] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [description, setDescription] = useState("")
  const [scrapedPages, setScrapedPages] = useState<any[]>([])
  const [selectedPage, setSelectedPage] = useState<any>(null)

  useEffect(() => {
    fetchScrapedPages()
  }, [])

  const fetchScrapedPages = async () => {
    const pagesSnapshot = await getDocs(collection(db, "scrapedPages"))
    const pagesData = pagesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    setScrapedPages(pagesData)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "organizations"), {
        companyName,
        websiteUrl,
        description,
      })
      updateOrgData({ companyName, websiteUrl, description, id: docRef.id })
      nextStep()
    } catch (error) {
      console.error("Error adding organization:", error)
    }
  }

  const handlePageClick = (page: any) => {
    setSelectedPage(page)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input id="websiteUrl" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="description">Company Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
        </form>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Scraped Pages</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scrapedPages.map((page) => (
                <TableRow key={page.id} onClick={() => handlePageClick(page)} className="cursor-pointer">
                  <TableCell>{page.url}</TableCell>
                  <TableCell>{page.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {selectedPage && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Page Chunks</h3>
            <ul className="list-disc pl-5">
              {selectedPage.chunks.map((chunk: string, index: number) => (
                <li key={index}>{chunk}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={prevStep} variant="outline">
          Back
        </Button>
        <Button onClick={handleSubmit}>Next</Button>
      </CardFooter>
    </Card>
  )
}

