"use client";

// inspired from: https://github.com/Aqshola/canvas-next/blob/main/components/Drawer.tsx

import { Stage, Layer, Line } from "react-konva";
import React, { useState, useRef, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Drawer({ getPreview, ...props }) {
  //DRAW
  const [lines, setLines] = useState([]);
  const [lastCenter, setlastCenter] = useState(null);
  const [lastDistance, setlastDistance] = useState(null);
  const supabase = createClientComponentClient();

  const isDrawing = useRef(false);

  //STAGE
  const [mainStage, setMainStage] = useState(null);

  // GENERTE LIVE PREVIEW
  function generatePreview() {
    if (mainStage) {
      const scale = 1;
      const url = mainStage.toDataURL({ pixelRatio: scale });
      return url;
    }
  }

  async function updateDrawingToDB() {
    const { data } = await supabase.auth.getUser();
    const { data: drawing } = await supabase
      .from("drawings")
      .select()
      .eq("drawing_id", props.pageId);
    if (drawing.length == 0) {
      const drawingData = {
        name: "untitled1",
        user_id: data.user.id,
        by: data.user.user_metadata.full_name,
        drawing_id: props.pageId,
        preview_data: generatePreview(),
        type: "draft",
      };
      const { error } = await supabase.from("drawings").insert(drawingData);
      if (error) {
        console.log(`SOMETHING WENT WRONG WHILE SAVING THE DRAWING!`, error);
      }
      console.log("added");
    } else {
      await supabase
        .from("drawings")
        .update({ preview_data: generatePreview() })
        .eq("drawing_id", props.pageId);
      console.log("updated");
    }
  }

  //DRAW
  function initDraw(e) {
    if (props.event !== "DRAW" && props.event !== "ERASE") return;
    isDrawing.current = true;
    const stage = e.target.getStage();
    // set the stage
    setMainStage(stage);
    const pos = relativePointerPosition(stage);
    setLines([...lines, { tool: props.event, points: [pos.x, pos.y] }]);
  }

  function handleDraw(e) {
    if (props.event !== "DRAW" && props.event !== "ERASE") return;
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = relativePointerPosition(stage);
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  }

  function stopDraw() {
    if (props.event !== "DRAW" && props.event !== "ERASE") return;
    isDrawing.current = false;
    const url = generatePreview();
    getPreview && getPreview(url);
    if (url) {
      updateDrawingToDB();
    }
  }

  function handleZoom(e) {
    if (props.event !== "GRAB") return;
    const scaleBy = 1.3;
    e.evt.preventDefault();
    const stage = e.target.getStage();
    let oldScale = stage.scaleX();

    let mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    let newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    stage.scale({ x: newScale, y: newScale });

    let newPos = {
      x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    };
    stage.position(newPos);
  }

  function handlePinchZoom(e) {
    if (props.event !== "GRAB") return;

    const stage = e.target.getStage();
    const touch1 = e.evt.touches[0];
    const touch2 = e.evt.touches[1];

    if (!touch1 || !touch2) return;

    if (stage.isDragging()) {
      stage.stopDrag();
    }

    const point1 = {
      x: touch1.clientX,
      y: touch1.clientY,
    };

    const point2 = {
      x: touch2.clientX,
      y: touch2.clientY,
    };

    if (!lastCenter) {
      setlastCenter(getCenter(point1, point2));
    }

    const newCenter = getCenter(point1, point2);
    const dist = getDistance(point1, point2);

    if (!lastDistance) {
      setlastDistance(dist);
    }

    var pointTo = {
      x: (newCenter.x - stage.x()) / stage.scaleX(),
      y: (newCenter.y - stage.y()) / stage.scaleX(),
    };

    var scale = stage.scaleX() * (dist / lastDistance);

    stage.scaleX(scale);
    stage.scaleY(scale);

    if (!lastCenter) {
      return;
    }
    var dx = newCenter.x - lastCenter.x;
    var dy = newCenter.y - lastCenter.y;

    var newPos = {
      x: newCenter.x - pointTo.x * scale + dx,
      y: newCenter.y - pointTo.y * scale + dy,
    };
  }

  function stopPinchZoom() {
    setlastDistance(0);
    setlastDistance(null);
  }

  function relativePointerPosition(node) {
    var transform = node.getAbsoluteTransform().copy();
    // to detect relative position we need to invert transform
    transform.invert();

    // get pointer (say mouse or touch) position
    var pos = node.getStage().getPointerPosition();

    // now we find relative point
    return transform.point(pos);
  }

  function getCenter(p1, p2) {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  }

  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  if (props.loading || !props.valid) {
    return <></>;
  }
  return (
    <div className="relative w-full h-full">
      <Stage
        onTouchStart={(e) => {
          initDraw(e);
          //initCollabDraw(e);
        }}
        onTouchMove={(e) => {
          handleDraw(e);
          handlePinchZoom(e);
          //collabTouch(e);
          //initCollabDraw(e);
        }}
        onTouchEnd={() => {
          stopDraw();
          stopPinchZoom();
        }}
        draggable={props.event === "GRAB"}
        width={props.size.width}
        height={props.size.height}
        onMouseDown={(e) => {
          initDraw(e);
          //initCollabDraw(e);
        }}
        onMousemove={(e) => {
          handleDraw(e);
          //collabMouse(e);
        }}
        onMouseup={stopDraw}
        onWheel={handleZoom}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#000000"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "ERASE" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
