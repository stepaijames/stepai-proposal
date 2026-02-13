"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Project {
  id: string;
  name: string;
  agency: string;
  status: string;
  deadline: string;
  budget: string;
  progress: number;
  description: string | null;
  created_at: string;
  updated_at: string;
}

function getStatusColor(status: string) {
  switch (status) {
    case "제안서 작성중":
      return "bg-yellow-100 text-yellow-800";
    case "제출완료":
      return "bg-blue-100 text-blue-800";
    case "선정":
      return "bg-green-100 text-green-800";
    case "탈락":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("gov_projects")
          .select("*")
          .order("deadline", { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "데이터를 불러오는데 실패했습니다");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          정부지원사업 현황 대시보드
        </h1>
        <p className="text-gray-600 mt-2">STEP AI 정부지원사업 현황 관리</p>
      </header>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-medium">오류 발생</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>등록된 사업이 없습니다.</p>
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="grid gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {project.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{project.agency}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase">마감일</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(project.deadline).toLocaleDateString("ko-KR")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">예산</p>
                  <p className="text-sm font-medium text-gray-900">{project.budget}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">진행률</p>
                  <p className="text-sm font-medium text-gray-900">{project.progress}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">등록일</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(project.created_at).toLocaleDateString("ko-KR")}
                  </p>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
