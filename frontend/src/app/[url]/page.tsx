

export default async function UrlRedirectPage({ params }: { params: Promise<{ url: string }> }) {
  const { url } = await params;

  console.log(url)
  return <div>Redirecting...</div>;
}