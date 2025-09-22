// export interface User {
//   id: string;
//   email: string;
//   displayName?: string;
//   photoURL?: string;
// }

// export interface Plant {
//   id: string;
//   nickname: string;
//   species: string;
//   variety?: string;
//   plantedOn: Date;
//   location: string;
//   notes?: string;
//   imageUrl?: string;
//   healthStatus: 'healthy' | 'needs-attention' | 'sick' | 'recovering';
//   lastWateredAt?: Date;
//   lastFertilizedAt?: Date;
//   lastPrunedAt?: Date;
//   createdAt: Date;
//   userId: string;
//   plantLibraryId?: string;
// }

// export interface PlantFormData {
//   nickname: string;
//   species: string;
//   variety?: string;
//   plantedOn: string;
//   location: string;
//   notes?: string;
//   imageUrl?: string;
//   healthStatus: 'healthy' | 'needs-attention' | 'sick' | 'recovering';
//   plantLibraryId?: string;
// }

// export interface PlantLibraryEntry {
//   id: string;
//   commonName: string;
//   scientificName: string;
//   family: string;
//   type: 'vegetable' | 'herb' | 'flower' | 'tree' | 'shrub' | 'succulent' | 'houseplant' | 'fruit';
//   description: string;
//   careInstructions: {
//     watering: string;
//     sunlight: 'full-sun' | 'partial-sun' | 'shade' | 'indirect';
//     soil: string;
//     temperature: string;
//     humidity: string;
//     fertilizing: string;
//     pruning: string;
//   };
//   growingConditions: {
//     hardiness: string;
//     spacing: string;
//     height: string;
//     spread: string;
//   };
//   seasonalCare: {
//     spring: string[];
//     summer: string[];
//     fall: string[];
//     winter: string[];
//   };
//   commonIssues: string[];
//   companionPlants: string[];
//   imageUrl?: string;
//   createdAt: Date;
// }

// export interface JournalEntry {
//   id: string;
//   plantId: string;
//   title: string;
//   content: string;
//   imageUrl?: string;
//   tags: string[];
//   careType?: 'watering' | 'fertilizing' | 'pruning' | 'repotting' | 'pest-treatment' | 'observation';
//   createdAt: Date;
//   userId: string;
// }

// export interface Reminder {
//   id: string;
//   userId: string;
//   plantId: string;
//   type: 'watering' | 'fertilizing' | 'pruning' | 'repotting' | 'pest-check';
//   ruleDays: number;
//   nextRunAt: Date;
//   lastRunAt?: Date;
//   enabled: boolean;
//   weatherDependent?: boolean;
//   createdAt: Date;
// }

// export interface GardenLayout {
//   id: string;
//   userId: string;
//   name: string;
//   width: number;
//   height: number;
//   plants: GardenPlant[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface GardenPlant {
//   id: string;
//   plantId: string;
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

// export interface PestIssue {
//   id: string;
//   userId: string;
//   plantId: string;
//   type: 'pest' | 'disease' | 'nutrient-deficiency' | 'environmental';
//   name: string;
//   description: string;
//   severity: 'low' | 'medium' | 'high' | 'critical';
//   symptoms: string[];
//   treatment: string;
//   preventionTips: string[];
//   imageUrl?: string;
//   status: 'active' | 'treating' | 'resolved';
//   identifiedAt: Date;
//   resolvedAt?: Date;
//   notes?: string;
//   createdAt: Date;
// }

// export interface SeasonalTask {
//   id: string;
//   userId: string;
//   title: string;
//   description: string;
//   category: 'planting' | 'harvesting' | 'pruning' | 'fertilizing' | 'pest-control' | 'maintenance';
//   season: 'spring' | 'summer' | 'fall' | 'winter';
//   month: number;
//   priority: 'low' | 'medium' | 'high';
//   plantTypes: string[];
//   completed: boolean;
//   completedAt?: Date;
//   createdAt: Date;
// }

// export interface HarvestRecord {
//   id: string;
//   userId: string;
//   plantId: string;
//   quantity: number;
//   unit: string;
//   quality: 'excellent' | 'good' | 'fair' | 'poor';
//   notes?: string;
//   imageUrl?: string;
//   harvestedAt: Date;
//   createdAt: Date;
// }

// export interface WeatherData {
//   temperature: number;
//   humidity: number;
//   precipitation: number;
//   windSpeed: number;
//   condition: string;
//   uvIndex: number;
//   date: Date;
// }

// export interface GardeningTip {
//   id: string;
//   title: string;
//   content: string;
//   category: 'watering' | 'fertilizing' | 'pruning' | 'pest-control' | 'planting' | 'harvesting' | 'seasonal';
//   difficulty: 'beginner' | 'intermediate' | 'advanced';
//   season?: 'spring' | 'summer' | 'fall' | 'winter';
//   plantTypes: string[];
//   imageUrl?: string;
//   author: string;
//   createdAt: Date;
// }

// export interface CommunityPost {
//   id: string;
//   userId: string;
//   authorName: string;
//   title: string;
//   content: string;
//   imageUrl?: string;
//   category: 'question' | 'tip' | 'showcase' | 'problem';
//   tags: string[];
//   likes: number;
//   comments: CommunityComment[];
//   createdAt: Date;
// }

// export interface CommunityComment {
//   id: string;
//   userId: string;
//   authorName: string;
//   content: string;
//   createdAt: Date;
// }





// export interface User {
//   id: string;
//   email: string;
//   displayName?: string;
//   photoURL?: string;
// }

// export interface Plant {
//   id: string;
//   nickname: string;
//   species: string;
//   variety?: string;
//   plantedOn: Date;
//   location: string;
//   notes?: string;
//   imageUrl?: string;
//   healthStatus: 'healthy' | 'needs-attention' | 'sick' | 'recovering';
//   lastWateredAt?: Date;
//   lastFertilizedAt?: Date;
//   lastPrunedAt?: Date;
//   createdAt: Date;
//   userId: string;
//   plantLibraryId?: string;
// }

// export interface PlantFormData {
//   plantTypeId?: string;
//   nickname: string;
//   species?: string;
//   variety?: string;
//   plantedOn?: string;
//   location?: string;
//   potSize?: string;
//   locationInGarden?: {
//     x: number;
//     y: number;
//   };
//   notes?: string;
//   imageUrl?: string;
//   healthStatus?: 'healthy' | 'needs-attention' | 'sick' | 'recovering';
//   plantLibraryId?: string;
//   customCadence?: {
//     watering?: number;
//     fertilizing?: number;
//     pruning?: number;
//   };
// }

// export interface PlantLibraryEntry {
//   id: string;
//   commonName: string;
//   scientificName: string;
//   family: string;
//   type: 'vegetable' | 'herb' | 'flower' | 'tree' | 'shrub' | 'succulent' | 'houseplant' | 'fruit';
//   description: string;
//   careInstructions: {
//     watering: string;
//     sunlight: 'full-sun' | 'partial-sun' | 'shade' | 'indirect';
//     soil: string;
//     temperature: string;
//     humidity: string;
//     fertilizing: string;
//     pruning: string;
//   };
//   growingConditions: {
//     hardiness: string;
//     spacing: string;
//     height: string;
//     spread: string;
//   };
//   seasonalCare: {
//     spring: string[];
//     summer: string[];
//     fall: string[];
//     winter: string[];
//   };
//   commonIssues: string[];
//   companionPlants: string[];
//   imageUrl?: string;
//   createdAt: Date;
// }

// export interface JournalEntry {
//   id: string;
//   plantId: string;
//   title: string;
//   content: string;
//   imageUrl?: string;
//   tags: string[];
//   careType?: 'watering' | 'fertilizing' | 'pruning' | 'repotting' | 'pest-treatment' | 'observation';
//   createdAt: Date;
//   userId: string;
// }

// export interface Reminder {
//   id: string;
//   userId: string;
//   plantId: string;
//   type: 'watering' | 'fertilizing' | 'pruning' | 'repotting' | 'pest-check';
//   ruleDays: number;
//   nextRunAt: Date;
//   lastRunAt?: Date;
//   enabled: boolean;
//   weatherDependent?: boolean;
//   createdAt: Date;
// }

// export interface GardenLayout {
//   id: string;
//   userId: string;
//   name: string;
//   width: number;
//   height: number;
//   plants: GardenPlant[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface GardenPlant {
//   id: string;
//   plantId: string;
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

// export interface PestIssue {
//   id: string;
//   userId: string;
//   plantId: string;
//   type: 'pest' | 'disease' | 'nutrient-deficiency' | 'environmental';
//   name: string;
//   description: string;
//   severity: 'low' | 'medium' | 'high' | 'critical';
//   symptoms: string[];
//   treatment: string;
//   preventionTips: string[];
//   imageUrl?: string;
//   status: 'active' | 'treating' | 'resolved';
//   identifiedAt: Date;
//   resolvedAt?: Date;
//   notes?: string;
//   createdAt: Date;
// }

// export interface SeasonalTask {
//   id: string;
//   userId: string;
//   title: string;
//   description: string;
//   category: 'planting' | 'harvesting' | 'pruning' | 'fertilizing' | 'pest-control' | 'maintenance';
//   season: 'spring' | 'summer' | 'fall' | 'winter';
//   month: number;
//   priority: 'low' | 'medium' | 'high';
//   plantTypes: string[];
//   completed: boolean;
//   completedAt?: Date;
//   createdAt: Date;
// }

// export interface HarvestRecord {
//   id: string;
//   userId: string;
//   plantId: string;
//   quantity: number;
//   unit: string;
//   quality: 'excellent' | 'good' | 'fair' | 'poor';
//   notes?: string;
//   imageUrl?: string;
//   harvestedAt: Date;
//   createdAt: Date;
// }

// export interface WeatherData {
//   temperature: number;
//   humidity: number;
//   precipitation: number;
//   windSpeed: number;
//   condition: string;
//   uvIndex: number;
//   date: Date;
// }

// export interface GardeningTip {
//   id: string;
//   title: string;
//   content: string;
//   category: 'watering' | 'fertilizing' | 'pruning' | 'pest-control' | 'planting' | 'harvesting' | 'seasonal';
//   difficulty: 'beginner' | 'intermediate' | 'advanced';
//   season?: 'spring' | 'summer' | 'fall' | 'winter';
//   plantTypes: string[];
//   imageUrl?: string;
//   author: string;
//   createdAt: Date;
// }

// export interface CommunityPost {
//   id: string;
//   userId: string;
//   authorName: string;
//   title: string;
//   content: string;
//   imageUrl?: string;
//   category: 'question' | 'tip' | 'showcase' | 'problem';
//   tags: string[];
//   likes: number;
//   comments: CommunityComment[];
//   createdAt: Date;
// }

// export interface CommunityComment {
//   id: string;
//   userId: string;
//   authorName: string;
//   content: string;
//   createdAt: Date;
// }
















// export interface GardeningTip {
//   id: string;
//   title: string;
//   content: string;
//   category: 'watering' | 'fertilizing' | 'pruning' | 'pest-control' | 'planting' | 'harvesting' | 'seasonal';
//   difficulty: 'beginner' | 'intermediate' | 'advanced';
//   season?: 'spring' | 'summer' | 'fall' | 'winter';
//   plantTypes: string[];
//   author: string;
//   createdAt: Date;
//   rating?: number;
//   tags?: string[];
// }

// export interface Plant {
//   id: string;
//   nickname: string;
//   plantTypeId: string;
//   potSize?: string;
//   notes?: string;
//   healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
//   lastWatered?: string;
//   images?: string[];
//   createdAt: string;
//   customCadence?: {
//     watering?: number;
//     fertilizing?: number;
//     pruning?: number;
//   };
// }

















// export interface GardeningTip {
//   id: string;
//   title: string;
//   content: string;
//   category: 'watering' | 'fertilizing' | 'pruning' | 'pest-control' | 'planting' | 'harvesting' | 'seasonal';
//   difficulty: 'beginner' | 'intermediate' | 'advanced';
//   season?: 'spring' | 'summer' | 'fall' | 'winter';
//   plantTypes: string[];
//   author: string;
//   createdAt: Date;
//   rating?: number;
//   tags?: string[];
// }

// export interface Plant {
//   id: string;
//   nickname: string;
//   plantTypeId: string;
//   potSize?: string;
//   notes?: string;
//   healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
//   lastWatered?: string;
//   images?: string[];
//   createdAt: string;
//   customCadence?: {
//     watering?: number;
//     fertilizing?: number;
//     pruning?: number;
//   };
// }

// export interface HarvestRecord {
//   id: string;
//   userId: string;
//   plantId: string;
//   quantity: number;
//   unit: string;
//   quality: 'excellent' | 'good' | 'fair' | 'poor';
//   notes?: string;
//   harvestedAt: Date;
//   createdAt: Date;
// }

// export interface SeasonalTask {
//   id: string;
//   userId: string;
//   title: string;
//   description: string;
//   category: 'planting' | 'harvesting' | 'pruning' | 'fertilizing' | 'pest-control' | 'maintenance';
//   season: 'spring' | 'summer' | 'fall' | 'winter';
//   month: number;
//   priority: 'low' | 'medium' | 'high';
//   plantTypes: string[];
//   completed: boolean;
//   completedAt?: Date;
//   createdAt: Date;
// }










// export interface GardeningTip {
//   id: string;
//   title: string;
//   content: string;
//   category: 'watering' | 'fertilizing' | 'pruning' | 'pest-control' | 'planting' | 'harvesting' | 'seasonal';
//   difficulty: 'beginner' | 'intermediate' | 'advanced';
//   season?: 'spring' | 'summer' | 'fall' | 'winter';
//   plantTypes: string[];
//   author: string;
//   createdAt: Date;
//   rating?: number;
//   tags?: string[];
// }

// export interface Plant {
//   id: string;
//   nickname: string;
//   plantTypeId: string;
//   potSize?: string;
//   notes?: string;
//   healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
//   lastWatered?: string;
//   images?: string[];
//   createdAt: string;
//   customCadence?: {
//     watering?: number;
//     fertilizing?: number;
//     pruning?: number;
//   };
// }

// export interface HarvestRecord {
//   id: string;
//   userId: string;
//   plantId: string;
//   quantity: number;
//   unit: string;
//   quality: 'excellent' | 'good' | 'fair' | 'poor';
//   notes?: string;
//   harvestedAt: Date;
//   createdAt: Date;
// }

// export interface SeasonalTask {
//   id: string;
//   userId: string;
//   title: string;
//   description: string;
//   category: 'planting' | 'harvesting' | 'pruning' | 'fertilizing' | 'pest-control' | 'maintenance';
//   season: 'spring' | 'summer' | 'fall' | 'winter';
//   month: number;
//   priority: 'low' | 'medium' | 'high';
//   plantTypes: string[];
//   completed: boolean;
//   completedAt?: Date;
//   createdAt: Date;
// }

// export interface JournalEntry {
//   id: string;
//   userId?: string;
//   plantId: string;
//   text: string;
//   careAction?: string;
//   tags: string[];
//   images: string[];
//   createdAt: Date;
// }






// export interface GardeningTip {
//   id: string;
//   title: string;
//   content: string;
//   category: 'watering' | 'fertilizing' | 'pruning' | 'pest-control' | 'planting' | 'harvesting' | 'seasonal';
//   difficulty: 'beginner' | 'intermediate' | 'advanced';
//   season?: 'spring' | 'summer' | 'fall' | 'winter';
//   plantTypes: string[];
//   author: string;
//   createdAt: Date;
//   rating?: number;
//   tags?: string[];
// }

// export interface Plant {
//   id: string;
//   nickname: string;
//   plantTypeId: string;
//   potSize?: string;
//   notes?: string;
//   healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
//   lastWatered?: string;
//   images?: string[];
//   createdAt: string;
//   customCadence?: {
//     watering?: number;
//     fertilizing?: number;
//     pruning?: number;
//   };
// }

// export interface HarvestRecord {
//   id: string;
//   userId: string;
//   plantId: string;
//   quantity: number;
//   unit: string;
//   quality: 'excellent' | 'good' | 'fair' | 'poor';
//   notes?: string;
//   harvestedAt: Date;
//   createdAt: Date;
// }

// export interface SeasonalTask {
//   id: string;
//   userId: string;
//   title: string;
//   description: string;
//   category: 'planting' | 'harvesting' | 'pruning' | 'fertilizing' | 'pest-control' | 'maintenance';
//   season: 'spring' | 'summer' | 'fall' | 'winter';
//   month: number;
//   priority: 'low' | 'medium' | 'high';
//   plantTypes: string[];
//   completed: boolean;
//   completedAt?: Date;
//   createdAt: Date;
// }

// export interface JournalEntry {
//   id: string;
//   userId?: string;
//   plantId: string;
//   text: string;
//   careAction?: string;
//   tags: string[];
//   images: string[];
//   createdAt: Date;
// }

// export interface Reminder {
//   id: string;
//   userId: string;
//   plantId: string;
//   type: 'watering' | 'fertilizing' | 'pruning';
//   ruleDays: number;
//   nextRunAt: Date;
//   lastRunAt?: Date;
//   enabled: boolean;
//   createdAt: Date;
// }

// export interface PlantLibraryEntry {
//   id: string;
//   commonName: string;
//   scientificName: string;
//   family: string;
//   type: 'vegetable' | 'herb' | 'flower' | 'tree' | 'shrub' | 'succulent' | 'houseplant' | 'fruit';
//   description: string;
//   careInstructions: {
//     watering: string;
//     sunlight: 'full-sun' | 'partial-sun' | 'shade' | 'indirect';
//     soil: string;
//     temperature: string;
//     humidity: string;
//     fertilizing: string;
//     pruning: string;
//   };
//   growingConditions: {
//     hardiness: string;
//     spacing: string;
//     height: string;
//     spread: string;
//   };
//   seasonalCare: {
//     spring: string[];
//     summer: string[];
//     fall: string[];
//     winter: string[];
//   };
//   commonIssues: string[];
//   companionPlants: string[];
//   createdAt: Date;
// }





// export interface GardeningTip {
//   id: string;
//   title: string;
//   content: string;
//   category: 'watering' | 'fertilizing' | 'pruning' | 'pest-control' | 'planting' | 'harvesting' | 'seasonal';
//   difficulty: 'beginner' | 'intermediate' | 'advanced';
//   season?: 'spring' | 'summer' | 'fall' | 'winter';
//   plantTypes: string[];
//   author: string;
//   createdAt: Date;
//   rating?: number;
//   tags?: string[];
// }

// export interface Plant {
//   id: string;
//   nickname: string;
//   plantTypeId: string;
//   potSize?: string;
//   notes?: string;
//   healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
//   lastWatered?: string;
//   images?: string[];
//   createdAt: string;
//   customCadence?: {
//     watering?: number;
//     fertilizing?: number;
//     pruning?: number;
//   };
// }

// export interface HarvestRecord {
//   id: string;
//   userId: string;
//   plantId: string;
//   quantity: number;
//   unit: string;
//   quality: 'excellent' | 'good' | 'fair' | 'poor';
//   notes?: string;
//   harvestedAt: Date;
//   createdAt: Date;
// }

// export interface SeasonalTask {
//   id: string;
//   userId: string;
//   title: string;
//   description: string;
//   category: 'planting' | 'harvesting' | 'pruning' | 'fertilizing' | 'pest-control' | 'maintenance';
//   season: 'spring' | 'summer' | 'fall' | 'winter';
//   month: number;
//   priority: 'low' | 'medium' | 'high';
//   plantTypes: string[];
//   completed: boolean;
//   completedAt?: Date;
//   createdAt: Date;
// }

// export interface JournalEntry {
//   id: string;
//   userId?: string;
//   plantId: string;
//   text: string;
//   careAction?: string;
//   tags: string[];
//   images: string[];
//   createdAt: Date;
// }

// export interface Reminder {
//   id: string;
//   userId: string;
//   plantId: string;
//   type: 'watering' | 'fertilizing' | 'pruning';
//   ruleDays: number;
//   nextRunAt: Date;
//   lastRunAt?: Date;
//   enabled: boolean;
//   createdAt: Date;
// }

// export interface PlantLibraryEntry {
//   id: string;
//   commonName: string;
//   scientificName: string;
//   family: string;
//   type: 'vegetable' | 'herb' | 'flower' | 'tree' | 'shrub' | 'succulent' | 'houseplant' | 'fruit';
//   description: string;
//   careInstructions: {
//     watering: string;
//     sunlight: 'full-sun' | 'partial-sun' | 'shade' | 'indirect';
//     soil: string;
//     temperature: string;
//     humidity: string;
//     fertilizing: string;
//     pruning: string;
//   };
//   growingConditions: {
//     hardiness: string;
//     spacing: string;
//     height: string;
//     spread: string;
//   };
//   seasonalCare: {
//     spring: string[];
//     summer: string[];
//     fall: string[];
//     winter: string[];
//   };
//   commonIssues: string[];
//   companionPlants: string[];
//   createdAt: Date;
// }

// export interface WeatherData {
//   temperature: number;
//   humidity: number;
//   precipitation: number;
//   windSpeed: number;
//   condition: string;
//   uvIndex: number;
//   date: Date;
// }






// export interface GardeningTip {
//   id: string;
//   title: string;
//   content: string;
//   category: 'watering' | 'fertilizing' | 'pruning' | 'pest-control' | 'planting' | 'harvesting' | 'seasonal';
//   difficulty: 'beginner' | 'intermediate' | 'advanced';
//   season?: 'spring' | 'summer' | 'fall' | 'winter';
//   plantTypes: string[];
//   author: string;
//   createdAt: Date;
//   rating?: number;
//   tags?: string[];
// }

// export interface Plant {
//   id: string;
//   nickname: string;
//   plantTypeId: string;
//   potSize?: string;
//   notes?: string;
//   healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
//   lastWatered?: string;
//   images?: string[];
//   createdAt: string;
//   customCadence?: {
//     watering?: number;
//     fertilizing?: number;
//     pruning?: number;
//   };
// }

// export interface HarvestRecord {
//   id: string;
//   userId: string;
//   plantId: string;
//   quantity: number;
//   unit: string;
//   quality: 'excellent' | 'good' | 'fair' | 'poor';
//   notes?: string;
//   harvestedAt: Date;
//   createdAt: Date;
// }

// export interface SeasonalTask {
//   id: string;
//   userId: string;
//   title: string;
//   description: string;
//   category: 'planting' | 'harvesting' | 'pruning' | 'fertilizing' | 'pest-control' | 'maintenance';
//   season: 'spring' | 'summer' | 'fall' | 'winter';
//   month: number;
//   priority: 'low' | 'medium' | 'high';
//   plantTypes: string[];
//   completed: boolean;
//   completedAt?: Date;
//   createdAt: Date;
// }

// export interface JournalEntry {
//   id: string;
//   userId?: string;
//   plantId: string;
//   text: string;
//   careAction?: string;
//   tags: string[];
//   images: string[];
//   createdAt: Date;
// }

// export interface Reminder {
//   id: string;
//   userId: string;
//   plantId: string;
//   type: 'watering' | 'fertilizing' | 'pruning';
//   ruleDays: number;
//   nextRunAt: Date;
//   lastRunAt?: Date;
//   enabled: boolean;
//   createdAt: Date;
// }

// export interface PlantLibraryEntry {
//   id: string;
//   commonName: string;
//   scientificName: string;
//   family: string;
//   type: 'vegetable' | 'herb' | 'flower' | 'tree' | 'shrub' | 'succulent' | 'houseplant' | 'fruit';
//   description: string;
//   careInstructions: {
//     watering: string;
//     sunlight: 'full-sun' | 'partial-sun' | 'shade' | 'indirect';
//     soil: string;
//     temperature: string;
//     humidity: string;
//     fertilizing: string;
//     pruning: string;
//   };
//   growingConditions: {
//     hardiness: string;
//     spacing: string;
//     height: string;
//     spread: string;
//   };
//   seasonalCare: {
//     spring: string[];
//     summer: string[];
//     fall: string[];
//     winter: string[];
//   };
//   commonIssues: string[];
//   companionPlants: string[];
//   createdAt: Date;
// }

// export interface WeatherData {
//   temperature: number;
//   humidity: number;
//   precipitation: number;
//   windSpeed: number;
//   condition: string;
//   uvIndex: number;
//   date: Date;
// }

// export interface PestIssue {
//   id: string;
//   userId: string;
//   plantId: string;
//   type: 'pest' | 'disease' | 'nutrient-deficiency' | 'environmental';
//   name: string;
//   description: string;
//   severity: 'low' | 'medium' | 'high' | 'critical';
//   symptoms: string[];
//   treatment: string;
//   preventionTips: string[];
//   status: 'active' | 'treating' | 'resolved';
//   identifiedAt: Date;
//   resolvedAt?: Date;
//   notes?: string;
//   createdAt: Date;
// }






// export interface GardeningTip {
//   id: string;
//   title: string;
//   content: string;
//   category: 'watering' | 'fertilizing' | 'pruning' | 'pest-control' | 'planting' | 'harvesting' | 'seasonal';
//   difficulty: 'beginner' | 'intermediate' | 'advanced';
//   season?: 'spring' | 'summer' | 'fall' | 'winter';
//   plantTypes: string[];
//   author: string;
//   createdAt: Date;
//   rating?: number;
//   tags?: string[];
// }

// export interface Plant {
//   id: string;
//   nickname: string;
//   plantTypeId: string;
//   potSize?: string;
//   notes?: string;
//   healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
//   lastWatered?: string;
//   images?: string[];
//   createdAt: string;
//   customCadence?: {
//     watering?: number;
//     fertilizing?: number;
//     pruning?: number;
//   };
// }

// export interface PlantFormData {
//   nickname: string;
//   plantTypeId: string;
//   potSize?: string;
//   notes?: string;
//   healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
//   lastWatered?: string;
//   images?: string[];
// }

// export interface HarvestRecord {
//   id: string;
//   userId: string;
//   plantId: string;
//   quantity: number;
//   unit: string;
//   quality: 'excellent' | 'good' | 'fair' | 'poor';
//   notes?: string;
//   harvestedAt: Date;
//   createdAt: Date;
// }

// export interface SeasonalTask {
//   id: string;
//   userId: string;
//   title: string;
//   description: string;
//   category: 'planting' | 'harvesting' | 'pruning' | 'fertilizing' | 'pest-control' | 'maintenance';
//   season: 'spring' | 'summer' | 'fall' | 'winter';
//   month: number;
//   priority: 'low' | 'medium' | 'high';
//   plantTypes: string[];
//   completed: boolean;
//   completedAt?: Date;
//   createdAt: Date;
// }

// export interface JournalEntry {
//   id: string;
//   userId?: string;
//   plantId: string;
//   text: string;
//   careAction?: string;
//   tags: string[];
//   images: string[];
//   createdAt: Date;
// }

// export interface Reminder {
//   id: string;
//   userId: string;
//   plantId: string;
//   type: 'watering' | 'fertilizing' | 'pruning';
//   ruleDays: number;
//   nextRunAt: Date;
//   lastRunAt?: Date;
//   enabled: boolean;
//   createdAt: Date;
// }

// export interface PlantLibraryEntry {
//   id: string;
//   commonName: string;
//   scientificName: string;
//   family: string;
//   type: 'vegetable' | 'herb' | 'flower' | 'tree' | 'shrub' | 'succulent' | 'houseplant' | 'fruit';
//   description: string;
//   careInstructions: {
//     watering: string;
//     sunlight: 'full-sun' | 'partial-sun' | 'shade' | 'indirect';
//     soil: string;
//     temperature: string;
//     humidity: string;
//     fertilizing: string;
//     pruning: string;
//   };
//   growingConditions: {
//     hardiness: string;
//     spacing: string;
//     height: string;
//     spread: string;
//   };
//   seasonalCare: {
//     spring: string[];
//     summer: string[];
//     fall: string[];
//     winter: string[];
//   };
//   commonIssues: string[];
//   companionPlants: string[];
//   createdAt: Date;
// }

// export interface WeatherData {
//   temperature: number;
//   humidity: number;
//   precipitation: number;
//   windSpeed: number;
//   condition: string;
//   uvIndex: number;
//   date: Date;
// }

// export interface PestIssue {
//   id: string;
//   userId: string;
//   plantId: string;
//   type: 'pest' | 'disease' | 'nutrient-deficiency' | 'environmental';
//   name: string;
//   description: string;
//   severity: 'low' | 'medium' | 'high' | 'critical';
//   symptoms: string[];
//   treatment: string;
//   preventionTips: string[];
//   status: 'active' | 'treating' | 'resolved';
//   identifiedAt: Date;
//   resolvedAt?: Date;
//   notes?: string;
//   createdAt: Date;
// }

// export interface User {
//   id: string;
//   uid: string;
//   email: string;
//   name: string;
//   createdAt: Date;
// }


















export interface GardeningTip {
  id: string;
  title: string;
  content: string;
  category: 'watering' | 'fertilizing' | 'pruning' | 'pest-control' | 'planting' | 'harvesting' | 'seasonal';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  season?: 'spring' | 'summer' | 'fall' | 'winter';
  plantTypes: string[];
  author: string;
  createdAt: Date;
  rating?: number;
  tags?: string[];
}

export interface Plant {
  id: string;
  nickname: string;
  plantTypeId: string;
  species?: string;
  variety?: string;
  location?: string;
  locationInGarden?: { x: number; y: number };
  potSize?: string;
  notes?: string;
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  lastWatered?: string;
  images?: string[];
  createdAt: string;
  customCadence?: {
    watering?: number;
    fertilizing?: number;
    pruning?: number;
  };
}

export interface PlantFormData {
  nickname: string;
  plantTypeId: string;
  species?: string;
  variety?: string;
  location?: string;
  locationInGarden?: { x: number; y: number };
  potSize?: string;
  notes?: string;
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  lastWatered?: string;
  images?: string[];
  customCadence?: {
    watering?: number;
    fertilizing?: number;
    pruning?: number;
  };
}

export interface HarvestRecord {
  id: string;
  userId: string;
  plantId: string;
  quantity: number;
  unit: string;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  notes?: string;
  harvestedAt: Date;
  createdAt: Date;
}

export interface SeasonalTask {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: 'planting' | 'harvesting' | 'pruning' | 'fertilizing' | 'pest-control' | 'maintenance';
  season: 'spring' | 'summer' | 'fall' | 'winter';
  month: number;
  priority: 'low' | 'medium' | 'high';
  plantTypes: string[];
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
}

export interface JournalEntry {
  id: string;
  userId?: string;
  plantId: string;
  text: string;
  careAction?: string;
  tags: string[];
  images: string[];
  createdAt: Date;
}

export interface Reminder {
  id: string;
  userId: string;
  plantId: string;
  type: 'watering' | 'fertilizing' | 'pruning';
  ruleDays: number;
  nextRunAt: Date;
  lastRunAt?: Date;
  enabled: boolean;
  createdAt: Date;
}

export interface PlantLibraryEntry {
  id: string;
  commonName: string;
  scientificName: string;
  family: string;
  type: 'vegetable' | 'herb' | 'flower' | 'tree' | 'shrub' | 'succulent' | 'houseplant' | 'fruit';
  description: string;
  careInstructions: {
    watering: string;
    sunlight: 'full-sun' | 'partial-sun' | 'shade' | 'indirect';
    soil: string;
    temperature: string;
    humidity: string;
    fertilizing: string;
    pruning: string;
  };
  growingConditions: {
    hardiness: string;
    spacing: string;
    height: string;
    spread: string;
  };
  seasonalCare: {
    spring: string[];
    summer: string[];
    fall: string[];
    winter: string[];
  };
  commonIssues: string[];
  companionPlants: string[];
  createdAt: Date;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  condition: string;
  uvIndex: number;
  date: Date;
}

export interface PestIssue {
  id: string;
  userId: string;
  plantId: string;
  type: 'pest' | 'disease' | 'nutrient-deficiency' | 'environmental';
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  symptoms: string[];
  treatment: string;
  preventionTips: string[];
  status: 'active' | 'treating' | 'resolved';
  identifiedAt: Date;
  resolvedAt?: Date;
  notes?: string;
  createdAt: Date;
}

export interface User {
  id: string;
  uid: string;
  email: string;
  name: string;
  displayName?: string;
  createdAt: Date;
}