import { Researcher } from "@/types/sanity.types"

export const researcherRoles: Record<
  NonNullable<Researcher["role"]>,
  string
> = {
  Head: "Head of ISys Research Group",
  Secretary: "Secretary",
  "Research Assistant": "Research Assistant",
  Member: "Member",
  "External Collaborator": "External Collaborator",
  Student: "Student",
}
