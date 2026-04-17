import ContentCard from './ContentCard'

export default function ContentGrid({ items }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item: any) => (
        <ContentCard key={item._id} item={item} />
      ))}
    </div>
  )
}
