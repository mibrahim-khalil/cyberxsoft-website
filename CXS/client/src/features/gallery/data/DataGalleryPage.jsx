import GalleryView from "../GalleryView";
import { dataGallery } from "./dataGalleryData";

export default function DataGalleryPage() {
  return <GalleryView gallery={dataGallery} />;
}