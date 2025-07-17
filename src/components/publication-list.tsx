export default function PublicationList({
  children,
}: {
  children: React.ReactNode
}) {
  return <ul className="divide-y">{children}</ul>
}
