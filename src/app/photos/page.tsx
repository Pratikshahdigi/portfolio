import type { Metadata } from "next";
import PhotosGallery from "./PhotosGallery";

export const metadata: Metadata = {
  title: "Media Gallery & Campaign Proofs | Pratik Shah",
  description: "Visual evidence, screenshots of performance dashboards, marketing campaigns, lead funnels, and personal professional moments of Pratik Shah.",
  keywords: [
    "Pratik Shah Photos",
    "Marketing Case Studies",
    "SEO Performance proof",
    "Lead Generation Screenshots",
    "Think Tank ConReal",
    "Inbox Infotech Vadodara"
  ],
};

export default function PhotosPage() {
  return <PhotosGallery />;
}
