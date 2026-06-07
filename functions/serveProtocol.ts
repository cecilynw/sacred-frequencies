Deno.serve(async (_req) => {
  const fileUrl = "https://base44.app/api/apps/6a2503d75150596e1dadce0f/files/mp/public/6a2503d75150596e1dadce0f/249b22c75_9_Ether_Protocol_Supreme_Lunar.html";
  const resp = await fetch(fileUrl, { redirect: "follow" });
  const html = await resp.text();
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    }
  });
});
