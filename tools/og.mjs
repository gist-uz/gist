import fs from "fs"
import path from "path"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"

// Font tanlash
let pick = () => {
  let a = fs.readdirSync("static/fonts").filter(x => x.endsWith(".ttf") || x.endsWith(".otf"))
  if (!a.length) throw "TTF/OTF kerak"
  return "static/fonts/" + a[0]
}
let fp = fs.existsSync("static/fonts/ZedTextL-Regular.ttf") ? "static/fonts/ZedTextL-Regular.ttf" : pick()
let font = fs.readFileSync(fp)

// Logo olish
let svg = await (await fetch("https://gist.uz/icons/favicon.svg")).text()
let logo = "data:image/svg+xml;utf8," + encodeURIComponent(svg)

// Output papkani yaratish
let outDir = "static/og"
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

// Frontmatter o'qish funksiyasi
function parseFrontmatter(content) {
  let match = content.match(/^\+\+\+\n([\s\S]*?)\n\+\+\+/)
  if (!match) return {}
  let fm = {}
  for (let line of match[1].split("\n")) {
    let [key, ...rest] = line.split("=")
    if (key && rest.length) {
      let val = rest.join("=").trim()
      // String qiymatlarni tozalash
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1)
      // Escaped qo'shtirnoqlarni tozalash
      val = val.replace(/\\"/g, '"')
      fm[key.trim()] = val
    }
  }
  return fm
}

// OG rasm yaratish funksiyasi
async function generateOG(slug, title, desc, section) {
  // Seksiya nomini formatlash
  let sectionLabel = section.toUpperCase()
  let sectionDesc = {
    posts: "Ochiq kodli tex blog",
    talks: "Konferensiya ma'ruzalari",
    projects: "Ochiq manbali loyihalar"
  }[section] || "Gist.uz"

  let el = {
    type: "div",
    props: {
      style: { width: 1200, height: 630, background: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72 },
      children: [
        // Header: Logo va sayt nomi
        {
          type: "div",
          props: {
            style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column", gap: 18 },
                  children: [
                    { type: "div", props: { style: { display: "flex", fontSize: 76, fontWeight: 700, color: "#1f2937", letterSpacing: -1 }, children: `GIST.UZ/${sectionLabel}` } },
                    { type: "div", props: { style: { display: "flex", fontSize: 34, color: "#6b7280", fontWeight: 400 }, children: sectionDesc } }
                  ]
                }
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", alignItems: "center", justifyContent: "center" },
                  children: { type: "img", props: { src: logo, width: 140, height: 140 } }
                }
              }
            ]
          }
        },
        // Kontent: Title, description, link va chiziq
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 },
            children: [
              { type: "div", props: { style: { display: "flex", fontSize: 58, lineHeight: 1.12, fontWeight: 700, color: "#111827", letterSpacing: -.6 }, children: title } },
              desc ? { type: "div", props: { style: { display: "flex", fontSize: 30, lineHeight: 1.35, color: "#6b7280", fontWeight: 400 }, children: desc } } : null,
              { type: "div", props: { style: { display: "flex", marginTop: 8, fontSize: 24, color: "#9ca3af" }, children: `gist.uz/${section}/${slug}/` } },
              // Qizil chiziq - link ostida
              { type: "div", props: { style: { display: "flex", height: 10, background: "#EF5350", borderRadius: 8, marginTop: 20, width: "100%" } } }
            ].filter(Boolean)
          }
        }
      ]
    }
  }

  let out = await satori(el, { width: 1200, height: 630, fonts: [{ name: "Zed", data: font, weight: 400 }, { name: "Zed", data: font, weight: 700 }] })
  let png = new Resvg(out).render().asPng()
  fs.writeFileSync(`${outDir}/${slug}.png`, png)
  console.log(`✓ ${slug}.png`)
}

// Seksiyalarni qayta ishlash
const sections = ["posts", "talks", "projects"]

for (let section of sections) {
  let dir = `content/${section}`
  if (!fs.existsSync(dir)) continue
  
  let files = fs.readdirSync(dir).filter(f => f.endsWith(".md") && !f.startsWith("_"))
  console.log(`\n${section}: ${files.length} ta fayl topildi`)
  
  for (let file of files) {
    let fileSlug = path.basename(file, ".md")
    let content = fs.readFileSync(path.join(dir, file), "utf-8")
    let fm = parseFrontmatter(content)
    
    // Frontmatter'dagi slug yoki fayl nomi
    let slug = fm.slug || fileSlug
    let title = fm.title || slug
    let desc = fm.description || ""
    
    // Titleni qisqartirish (juda uzun bo'lsa)
    if (title.length > 80) title = title.slice(0, 77) + "..."
    if (desc.length > 120) desc = desc.slice(0, 117) + "..."

    await generateOG(slug, title, desc, section)
  }
}

console.log(`\nBarcha OG rasmlar ${outDir}/ papkasiga saqlandi!`)
