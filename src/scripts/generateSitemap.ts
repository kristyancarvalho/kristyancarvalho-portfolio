import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "../../public");
const outputPath = path.join(publicDir, "sitemap.xml");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}");

if (!serviceAccount.project_id) {
  console.error("❌ Variável FIREBASE_SERVICE_ACCOUNT_KEY ausente ou inválida.");
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

interface BaseRoute {
  loc: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

async function generateSitemap(): Promise<void> {
  console.log("🧭 Gerando sitemap via Firebase Admin...");

  const DOMAIN = "https://kristyan.dev";

  const staticRoutes: BaseRoute[] = [
    { loc: "/", priority: "1.0", changefreq: "weekly" },
    { loc: "/projetos", priority: "0.8", changefreq: "monthly" },
    { loc: "/sobre", priority: "0.6", changefreq: "yearly" },
    { loc: "/posts", priority: "0.7", changefreq: "weekly" },
  ];

  const postsSnapshot = await db.collection("posts").get();
  const postRoutes: BaseRoute[] = postsSnapshot.docs.map((doc) => {
    const data = doc.data() as { createdAt?: admin.firestore.Timestamp };
    const lastmod = data.createdAt?.toDate().toISOString() ?? new Date().toISOString();
    return {
      loc: `/post/${doc.id}`,
      lastmod,
      priority: "0.5",
      changefreq: "monthly",
    };
  });

  console.log(`📝 ${postRoutes.length} posts encontrados no Firestore.`);
  postRoutes.forEach((p) => console.log(`→ ${p.loc}`));

  const allRoutes = [...staticRoutes, ...postRoutes];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    allRoutes
      .map(
        (r) => `  <url>
    <loc>${DOMAIN}${r.loc}</loc>
    ${r.lastmod ? `<lastmod>${r.lastmod}</lastmod>` : ""}
    <priority>${r.priority}</priority>
    <changefreq>${r.changefreq}</changefreq>
  </url>`
      )
      .join("\n") +
    "\n</urlset>\n";

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(outputPath, xml, "utf-8");

  console.log(`✅ Sitemap gerado com sucesso em ${outputPath}`);
  process.exit(0);
}

generateSitemap().catch((err) => {
  console.error("❌ Erro ao gerar sitemap:", err);
  process.exit(1);
});
