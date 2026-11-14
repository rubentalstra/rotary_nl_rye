package com.caelitechnologies.rotary_nl_rye.students

import android.icu.text.MessageFormat
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Icon
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.clearAndSetSemantics
import androidx.compose.ui.unit.dp
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeDirection
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeStudent
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeYear
import com.caelitechnologies.rotary_nl_rye.core.students.StudentGuide
import com.caelitechnologies.rotary_nl_rye.ui.components.PersonPhoto
import com.caelitechnologies.rotary_nl_rye.ui.components.currentLocale
import com.caelitechnologies.rotary_nl_rye.ui.components.materialSymbol

/**
 * A class in a list: a few of its students' photos overlapping, its name,
 * and how many students from or to how many countries.
 */
@Composable
fun ClassItem(direction: ExchangeDirection, year: ExchangeYear, onClick: () -> Unit) {
    val students = remember(direction, year) { ExchangeStudent.students(direction, year) }
    val countries = remember(students) { students.map { it.listCountry }.distinct().size }
    val locale = currentLocale()
    val pattern = stringResource(if (direction == ExchangeDirection.Inbound) R.string.students_class_size_inbound else R.string.students_class_size_outbound)
    val size = remember(pattern, locale, students.size, countries) {
        MessageFormat(pattern, locale).format(mapOf("students" to students.size, "countries" to countries))
    }
    ListItem(
        overlineContent = { PhotoStack(students.take(6), remaining = (students.size - 6).coerceAtLeast(0)) },
        headlineContent = { Text(stringResource(R.string.students_class, year.toString()), style = MaterialTheme.typography.titleMedium) },
        supportingContent = { Text(size) },
        modifier = Modifier.clickable(onClick = onClick),
    )
}

/** Photos that overlap, each ringed in the surface colour, and "+20" for the rest. */
@Composable
private fun PhotoStack(students: List<ExchangeStudent>, remaining: Int) {
    val ring = MaterialTheme.colorScheme.surface
    Row(horizontalArrangement = Arrangement.spacedBy((-12).dp), modifier = Modifier.clearAndSetSemantics {}) {
        students.forEach { student ->
            PersonPhoto(student.photoUrl, size = 44.dp, modifier = Modifier.border(3.dp, ring, CircleShape))
        }
        if (remaining > 0) {
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier.size(44.dp).border(3.dp, ring, CircleShape).clip(CircleShape).background(MaterialTheme.colorScheme.surfaceContainerHighest),
            ) {
                Text("+$remaining", style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
    }
}

/** A guide in a list: its symbol, its title and one line on what it tells. */
@Composable
fun GuideListItem(guide: StudentGuide, onClick: () -> Unit) {
    ListItem(
        headlineContent = { Text(stringResource(guide.title)) },
        supportingContent = { Text(stringResource(guide.subtitle)) },
        leadingContent = { Icon(painterResource(materialSymbol(guide.symbol)), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
        modifier = Modifier.clickable(onClick = onClick),
    )
}

/** What a student row says under the name. */
enum class StudentDetail {
    /** The start of the bio, for a list by country. */
    Bio,

    /** The flag and country, for a list by year. */
    Country,

    /** The exchange year, for a list of several years by country. */
    Year,
}

/** A student in a list: photo, name, and the line [detail] asks for. */
@Composable
fun StudentListItem(student: ExchangeStudent, detail: StudentDetail, onClick: () -> Unit) {
    val locale = currentLocale()
    ListItem(
        headlineContent = { Text(student.name.toString()) },
        supportingContent = {
            Column {
                when (detail) {
                    StudentDetail.Bio -> Text(student.bioPreview, maxLines = 2, overflow = androidx.compose.ui.text.style.TextOverflow.Ellipsis)
                    StudentDetail.Country -> Text("${student.listCountry.flag} ${student.listCountry.displayName(locale)}")
                    StudentDetail.Year -> Text(student.exchangeYear.toString())
                }
            }
        },
        leadingContent = { PersonPhoto(student.photoUrl, size = 52.dp) },
        modifier = Modifier.clickable(onClick = onClick),
    )
}
