"use client";
import dynamic from "next/dynamic";

const AssignmentGrading = dynamic(
  () => import("@/components/teacher/AssignmentGrading"),
  { loading: () => <div className="w-full h-[600px] bg-gray-50 rounded-2xl animate-pulse" /> }
);

export default function AssignmentsPage() {
  return <AssignmentGrading />;
}
