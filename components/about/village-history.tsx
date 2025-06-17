"use client"

import { useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

const VillageHistory = () => {
  const { t, language } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)

  const shortHistory = {
    en: "Gidhadi is a historic village with rich cultural heritage. Established in the early 18th century, it has been a center of agricultural activities and traditional crafts.",
    hi: "गिधाड़ी एक ऐतिहासिक गांव है जिसकी समृद्ध सांस्कृतिक विरासत है। 18वीं शताब्दी की शुरुआत में स्थापित, यह कृषि गतिविधियों और पारंपरिक शिल्प का केंद्र रहा है।",
    mr: "गिधाडी हे एक ऐतिहासिक गाव आहे ज्याचा समृद्ध सांस्कृतिक वारसा आहे. 18व्या शतकाच्या सुरुवातीला स्थापन झालेले, हे कृषी क्रियाकलाप आणि पारंपारिक हस्तकलेचे केंद्र आहे.",
  }

  const fullHistory = {
    en: "Gidhadi is a historic village with rich cultural heritage. Established in the early 18th century, it has been a center of agricultural activities and traditional crafts. The village is known for its ancient temple dedicated to Lord Shiva, which attracts pilgrims from neighboring regions. Over the centuries, Gidhadi has maintained its traditional values while embracing modern development. The village has a population of approximately 2,500 residents, primarily engaged in agriculture, animal husbandry, and small-scale industries. The Gram Panchayat was formally established in 1995 as part of the 73rd Constitutional Amendment, bringing democratic governance to the grassroots level.",
    hi: "गिधाड़ी एक ऐतिहासिक गांव है जिसकी समृद्ध सांस्कृतिक विरासत है। 18वीं शताब्दी की शुरुआत में स्थापित, यह कृषि गतिविधियों और पारंपरिक शिल्प का केंद्र रहा है। यह गांव भगवान शिव को समर्पित अपने प्राचीन मंदिर के लिए प्रसिद्ध है, जो पड़ोसी क्षेत्रों से तीर्थयात्रियों को आकर्षित करता है। सदियों से, गिधाड़ी ने आधुनिक विकास को अपनाते हुए अपने पारंपरिक मूल्यों को बनाए रखा है। गांव में लगभग 2,500 निवासी हैं, जो मुख्यतः कृषि, पशुपालन और छोटे पैमाने के उद्योगों में लगे हुए हैं। ग्राम पंचायत की औपचारिक स्थापना 1995 में 73वें संविधान संशोधन के हिस्से के रूप में हुई थी।",
    mr: "गिधाडी हे एक ऐतिहासिक गाव आहे ज्याचा समृद्ध सांस्कृतिक वारसा आहे. 18व्या शतकाच्या सुरुवातीला स्थापन झालेले, हे कृषी क्रियाकलाप आणि पारंपारिक हस्तकलेचे केंद्र आहे. हे गाव भगवान शिवाला समर्पित असलेल्या प्राचीन मंदिरासाठी प्रसिद्ध आहे, जे शेजारच्या प्रदेशातील यात्रेकरूंना आकर्षित करते. शतकानुशतके, गिधाडीने आधुनिक विकास स्वीकारताना आपली पारंपारिक मूल्ये कायम ठेवली आहेत. गावात अंदाजे 2,500 रहिवासी आहेत, जे मुख्यतः शेती, पशुपालन आणि लघु उद्योगांमध्ये गुंतलेले आहेत. ग्रामपंचायतची औपचारिक स्थापना 1995 मध्ये 73व्या घटनादुरुस्तीचा भाग म्हणून झाली.",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gov-blue">About Gidhadi Village</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed mb-4">
          {isExpanded ? fullHistory[language] : shortHistory[language]}
        </p>
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gov-blue hover:bg-blue-50 p-0 h-auto font-medium"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export default VillageHistory
