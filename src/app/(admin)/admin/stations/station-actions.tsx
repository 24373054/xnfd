"use client";
import { useState } from "react";

export function StationActions({ id, isActive }: { id: string; isActive: boolean }) {
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    try {
      await fetch(`/api/stations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    if (!confirm("确认删除该活动？")) return;
    setLoading(true);
    try {
      await fetch(`/api/stations/${id}`, { method: "DELETE" });
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggle}
        disabled={loading}
        className={`px-3 py-1 text-xs font-semibold rounded transition-colors disabled:opacity-50 ${
          isActive
            ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
            : "bg-green-50 text-green-700 hover:bg-green-100"
        }`}
      >
        {isActive ? "标记结束" : "重新激活"}
      </button>
      <button
        onClick={remove}
        disabled={loading}
        className="px-3 py-1 text-xs font-semibold rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
      >
        删除
      </button>
    </div>
  );
}
