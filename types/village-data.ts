export interface VillageData {
  population: {
    total: number
    growth: string
  }
  voters: {
    total: number
    male: number
    female: number
    malePercentage: number
    femalePercentage: number
  }
  infrastructure: {
    landArea: number
    temples: number
    govtOffices: number
    schools: number
  }
  location?: {
    latitude: number
    longitude: number
    name: string
  }
}

export interface VillageInfoProps {
  data?: VillageData
}
