"use client";

import { deleteLessonAction, renameLessonAction } from "@/app/learn/[id]/actions";
import Swal from "sweetalert2";

export default function LessonActionsMenu({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  async function handleRename() {
    const result = await Swal.fire({
      title: "Rename lesson",
      input: "text",
      inputValue: title,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value.trim()) return "Title cannot be empty";
      },
    });

    if (!result.isConfirmed) return;

    await renameLessonAction(id, result.value.trim());

    Swal.fire({
      icon: "success",
      title: "Title updated",
      timer: 1200,
      showConfirmButton: false,
    });
  }

  async function handleDelete() {
    const result = await Swal.fire({
      title: `Delete ${title}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    await deleteLessonAction(id);

    Swal.fire({
      icon: "success",
      title: "Lesson deleted",
      timer: 1200,
      showConfirmButton: false,
    });
  }

  return (
    <div className="w-32 rounded border bg-white shadow-lg p-2">
      <button
        onClick={handleRename}
        className="block w-full text-left px-2 py-1 hover:bg-gray-100"
      >
        Rename
      </button>

      <button
        onClick={handleDelete}
        className="block w-full text-left px-2 py-1 text-red-600 hover:bg-red-50"
      >
        Delete
      </button>
    </div>
  );
}
