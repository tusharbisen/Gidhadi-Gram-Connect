"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Send } from "lucide-react"

const ComplaintForm = () => {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    complaintType: "",
    description: "",
    photo: null as File | null,
  })

  const complaintTypes = [
    { key: "waterSupply", label: t("waterSupply") },
    { key: "roadMaintenance", label: t("roadMaintenance") },
    { key: "streetLights", label: t("streetLights") },
    { key: "drainageCleaning", label: t("drainageCleaning") },
    { key: "other", label: t("other") },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate a random reference ID
    const referenceId = `GP${Date.now().toString().slice(-6)}`

    alert(`${t("complaintSubmitted")}${referenceId}`)

    // Reset form
    setFormData({
      fullName: "",
      phoneNumber: "",
      complaintType: "",
      description: "",
      photo: null,
    })

    setIsSubmitting(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, photo: file })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gov-blue">{t("submitComplaint")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">{t("fullName")} *</Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber">{t("phoneNumber")} *</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="complaintType">{t("complaintType")} *</Label>
            <Select
              value={formData.complaintType}
              onValueChange={(value) => setFormData({ ...formData, complaintType: value })}
              required
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select complaint type" />
              </SelectTrigger>
              <SelectContent>
                {complaintTypes.map((type) => (
                  <SelectItem key={type.key} value={type.key}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">{t("description")} *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="mt-1"
              placeholder="Please describe your complaint in detail..."
            />
          </div>

          <div>
            <Label htmlFor="photo">{t("uploadPhoto")}</Label>
            <div className="mt-1 flex items-center space-x-2">
              <Input id="photo" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("photo")?.click()}
                className="flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Choose File</span>
              </Button>
              {formData.photo && <span className="text-sm text-gray-600">{formData.photo.name}</span>}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {t("loading")}
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                {t("submit")}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ComplaintForm
