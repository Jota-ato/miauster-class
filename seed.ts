import { db } from "@/db"
import { languagesLevels } from "@/db/schema/languages-levels-schema"

// Define aquí qué niveles aplican a cada idioma
const seedData: Record<string, string[]> = {
    "Inglés": ["A1", "A2", "B1", "B2", "C1", "C2"],
    "Francés": ["A1", "A2", "B1", "B2", "C1"],
    "Alemán": ["A1", "A2", "B1"],
    "Chino": ["Básico 1", "Presscolar 4"],
}

async function seedLanguagesLevels() {
    const allLanguages = await db.query.languages.findMany()
    const allLevels = await db.query.levels.findMany()

    const languageMap = new Map(allLanguages.map(l => [l.name, l.id]))
    const levelMap = new Map(allLevels.map(l => [l.name, l.id]))

    const rowsToInsert: { languageId: string; levelId: string }[] = []

    for (const [languageName, levelNames] of Object.entries(seedData)) {
        const languageId = languageMap.get(languageName)

        if (!languageId) {
            console.warn(`⚠️  Idioma no encontrado: "${languageName}"`)
            continue
        }

        for (const levelName of levelNames) {
            const levelId = levelMap.get(levelName)

            if (!levelId) {
                console.warn(`⚠️  Nivel no encontrado: "${levelName}"`)
                continue
            }

            rowsToInsert.push({ languageId, levelId })
        }
    }

    if (rowsToInsert.length === 0) {
        console.log("No hay filas para insertar.")
        return
    }

    await db.insert(languagesLevels).values(rowsToInsert)

    console.log(`✅ Se insertaron ${rowsToInsert.length} relaciones idioma-nivel.`)
}

seedLanguagesLevels()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error("❌ Error al sembrar languages_levels:", err)
        process.exit(1)
    })