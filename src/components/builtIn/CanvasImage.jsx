import useImage from "use-image";
import { Image, Text } from "react-konva";

export default function CanvasImage({ url }) {
  const [image] = useImage(url);
  return (
    <>
      {image ? (
        <Image image={image} />
      ) : (
        <Text fontSize="15px" text="Image could not be loaded." />
      )}
    </>
  );
}
