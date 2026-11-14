package com.caelitechnologies.rotary_nl_rye.camps

import org.w3c.dom.Document
import org.w3c.dom.Element
import java.io.ByteArrayInputStream
import java.util.zip.ZipException
import java.util.zip.ZipInputStream
import javax.xml.parsers.DocumentBuilderFactory

/**
 * The first worksheet of an XLSX file, as rows of cells. An XLSX file is a
 * ZIP archive of XML parts (ECMA-376, SpreadsheetML): java.util.zip unpacks
 * it and the platform's XML parser reads the workbook, its relationships, the
 * shared strings and the sheet. Only what the summer camps need is read:
 * values, not styles or formulas.
 */
class Spreadsheet internal constructor(
    /** Each row: its cells by column, `0` for A, `1` for B. */
    val rows: List<Map<Int, Cell>>,
) {
    /** A cell's value as stored: text, or a number written as text. */
    data class Cell(
        val text: String,
        /** Numbers include dates, which Excel stores as days since 1899-12-30. */
        val isNumber: Boolean,
    )

    /** Why a file is not a spreadsheet the app can read. */
    sealed class ReadError(message: String) : Exception(message) {
        data object NotAnArchive : ReadError("not an archive") {
            private fun readResolve(): Any = NotAnArchive
        }

        data class MissingPart(val path: String) : ReadError("missing $path")

        data class MalformedPart(val path: String) : ReadError("malformed $path")
    }

    companion object {
        /** Reads the first worksheet of an XLSX file. */
        fun read(bytes: ByteArray): Spreadsheet {
            val parts = unzip(bytes)
            val sheetPath = firstSheetPath(parts)
            val sharedStrings = parts["xl/sharedStrings.xml"]?.let { sharedStrings(parse(it, "xl/sharedStrings.xml")) } ?: emptyList()
            val sheet = parts[sheetPath] ?: throw ReadError.MissingPart(sheetPath)
            return Spreadsheet(rows(parse(sheet, sheetPath), sharedStrings))
        }

        private fun unzip(bytes: ByteArray): Map<String, ByteArray> {
            val parts = mutableMapOf<String, ByteArray>()
            try {
                ZipInputStream(ByteArrayInputStream(bytes)).use { zip ->
                    generateSequence { zip.nextEntry }.forEach { entry ->
                        if (!entry.isDirectory) parts[entry.name] = zip.readBytes()
                    }
                }
            } catch (_: ZipException) {
                throw ReadError.NotAnArchive
            }
            if (parts.isEmpty()) throw ReadError.NotAnArchive
            return parts
        }

        /** The path of the workbook's first sheet: `xl/workbook.xml` names it, its relationships say which part holds it. */
        private fun firstSheetPath(parts: Map<String, ByteArray>): String {
            val workbook = parse(parts["xl/workbook.xml"] ?: throw ReadError.MissingPart("xl/workbook.xml"), "xl/workbook.xml")
            val rels = parse(parts["xl/_rels/workbook.xml.rels"] ?: throw ReadError.MissingPart("xl/_rels/workbook.xml.rels"), "xl/_rels/workbook.xml.rels")
            val sheetId = workbook.elements("sheet").firstOrNull()?.let { sheet ->
                (0 until sheet.attributes.length).map { sheet.attributes.item(it) }.firstOrNull { it.localName == "id" }?.nodeValue
            } ?: throw ReadError.MalformedPart("xl/workbook.xml")
            val target = rels.elements("Relationship").firstOrNull { it.getAttribute("Id") == sheetId }?.getAttribute("Target")
                ?: throw ReadError.MalformedPart("xl/_rels/workbook.xml.rels")
            return if (target.startsWith("/")) target.drop(1) else "xl/$target"
        }

        /** The table of strings that text cells point into: each item is all the text of its runs together. */
        private fun sharedStrings(document: Document): List<String> =
            document.elements("si").map { item -> item.elements("t").joinToString("") { it.textContent } }

        /**
         * A worksheet's rows, each cell resolved to its text. Cell types
         * (ECMA-376 18.18.11): `s` points into the shared strings,
         * `inlineStr` holds its text, `str` and `b` hold a value as text, and
         * no type is a number.
         */
        private fun rows(document: Document, sharedStrings: List<String>): List<Map<Int, Cell>> =
            document.elements("row").map { row ->
                val cells = mutableMapOf<Int, Cell>()
                row.elements("c").forEach { c ->
                    val column = columnIndex(c.getAttribute("r")) ?: ((cells.keys.maxOrNull() ?: -1) + 1)
                    val type = c.getAttribute("t").ifEmpty { null }
                    val raw = c.elements("v").firstOrNull()?.textContent ?: c.elements("t").joinToString("") { it.textContent }
                    val text = if (type == "s") raw.toIntOrNull()?.let { sharedStrings.getOrNull(it) }.orEmpty() else raw
                    cells[column] = Cell(text, isNumber = type == null || type == "n")
                }
                cells
            }

        /** A part as a DOM document, namespace aware, without DTDs or external entities. */
        private fun parse(bytes: ByteArray, path: String): Document = try {
            val factory = DocumentBuilderFactory.newInstance().apply {
                isNamespaceAware = true
                isExpandEntityReferences = false
                runCatching { setFeature("http://apache.org/xml/features/disallow-doctype-decl", true) }
            }
            factory.newDocumentBuilder().parse(ByteArrayInputStream(bytes))
        } catch (_: Exception) {
            throw ReadError.MalformedPart(path)
        }

        private fun Document.elements(localName: String): List<Element> = documentElement.elements(localName)

        private fun Element.elements(localName: String): List<Element> {
            val nodes = getElementsByTagNameNS("*", localName)
            return (0 until nodes.length).map { nodes.item(it) as Element }
        }
    }
}

/** The column of a cell reference: `A1` is 0, `K35` is 10, `AA2` is 26. */
internal fun columnIndex(reference: String): Int? {
    val letters = reference.takeWhile { it in 'A'..'Z' || it in 'a'..'z' }.uppercase()
    if (letters.isEmpty()) return null
    return letters.fold(0) { total, letter -> total * 26 + (letter - 'A' + 1) } - 1
}
