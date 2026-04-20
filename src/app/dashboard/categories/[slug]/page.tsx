export default async function CategoryPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  return (
    <div>
      <h1>Category here</h1>
      {/* Here you would fetch and display the category details based on the slug */}
    </div>
  );
}
