"use client";

import { exportToCanvas, MainMenu } from "@excalidraw/excalidraw";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Whiteboard({ pageId, boardData }) {
  const supabase = createClientComponentClient();
  const [Excalidraw, setExcalidraw] = useState(null);
  const [canvasUrl, setCanvasUrl] = useState(null);
  const [api, setApi] = useState(null);
  const [elements, setElements] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const initialData = boardData?.elements || [];

  const generatePreview = async () => {
    if (!api) return;
    const elements = api.getSceneElements();
    if (!elements || !elements.length) return;
    const canvas = await exportToCanvas({
      elements,
      appState: {
        exportWithDarkMode: false,
      },
      files: api.getFiles(),
      getDimensions: () => {
        return { width: window.innerWidth, height: window.innerHeight };
      },
    });
    return canvas.toDataURL();
  };

  useEffect(() => {
    console.log("fetching started");
    import("@excalidraw/excalidraw").then((comp) => {
      setExcalidraw(comp.Excalidraw);
      console.log("fetching ended");
    });
  }, []);

  // save elements to the back end
  const handleDrawerChange = (elements) => {
    setElements(elements);
  };

  const handleSave = async () => {
    //console.log(elements);
    setIsSaving(true);
    console.log("saving...");
    const { data } = await supabase.auth.getUser();
    const { data: board } = await supabase
      .from("whiteboards")
      .select()
      .eq("whiteboard_id", pageId);
    if (board.length === 0 && !isSaving) {
      const whiteboardData = {
        user_id: data.user.id,
        whiteboard_id: pageId,
        preview_data: await generatePreview(),
        elements,
      };
      await supabase.from("whiteboards").insert(whiteboardData);
      setIsSaving(false);
      console.log("inserted.");
    } else {
      await supabase
        .from("whiteboards")
        .update({ preview_data: await generatePreview(), elements })
        .eq("whiteboard_id", pageId);
      setIsSaving(false);
      console.log("updated.");
    }
  };

  return (
    <>
      <div className="h-screen">
        {initialData !== null && Excalidraw && (
          <Excalidraw
            ref={(api) => setApi(api)}
            initialData={{
              elements: initialData,
              scrollToContent: true,
            }}
            onPointerDown={handleSave}
            onChange={handleDrawerChange}
          ></Excalidraw>
        )}
      </div>
    </>
  );
}
