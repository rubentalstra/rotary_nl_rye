package com.caelitechnologies.rotary_nl_rye.students

import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.consumeWindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.PlainTooltip
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TooltipAnchorPosition
import androidx.compose.material3.TooltipBox
import androidx.compose.material3.TooltipDefaults
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.rememberTooltipState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.foundation.clickable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.caelitechnologies.rotary_nl_rye.R
import com.caelitechnologies.rotary_nl_rye.core.programmes.ExchangeProgramme
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeDirection
import com.caelitechnologies.rotary_nl_rye.core.students.ExchangeStudent
import com.caelitechnologies.rotary_nl_rye.core.students.InboundGuide
import com.caelitechnologies.rotary_nl_rye.core.students.outboundGuides
import com.caelitechnologies.rotary_nl_rye.programmes.ProgrammeItem
import com.caelitechnologies.rotary_nl_rye.programmes.ProgrammePhoto
import com.caelitechnologies.rotary_nl_rye.programmes.ProgrammePhotoViewer
import com.caelitechnologies.rotary_nl_rye.programmes.ProgrammePhotos
import com.caelitechnologies.rotary_nl_rye.programmes.photos
import com.caelitechnologies.rotary_nl_rye.ui.components.ListSectionHeader

/**
 * For Dutch students going abroad: this year's class first, then the three
 * programmes, each opening a page with everything about going on it.
 */
@Composable
fun OutboundScreen(onBack: () -> Unit, onClass: (StudentListRoute.Class) -> Unit, onProgramme: (ExchangeProgramme) -> Unit) {
    val year = ExchangeStudent.years(ExchangeDirection.Outbound).firstOrNull()
    StudentsScaffold(stringResource(R.string.home_outbound), onBack) {
        if (year != null) {
            item(key = "studentsHeader", contentType = "header") { ListSectionHeader(stringResource(R.string.students_heading)) }
            item(key = "class", contentType = "class") {
                ClassItem(ExchangeDirection.Outbound, year, onClick = { onClass(StudentListRoute.Class(ExchangeDirection.Outbound, year.startYear)) })
            }
        }
        item(key = "programmesHeader", contentType = "header") { ListSectionHeader(stringResource(R.string.home_programmes)) }
        items(ExchangeProgramme.entries, key = { it.name }, contentType = { "programme" }) { programme ->
            ProgrammeItem(programme, onClick = { onProgramme(programme) })
        }
    }
}

/**
 * One programme for outbounds: its photos, this year's class for the year
 * exchange, the v13 pages on it, and a link to the programme's own page
 * with the facts and costs; for the summer camps also this year's camps.
 */
@Composable
fun OutboundProgrammeScreen(
    programme: ExchangeProgramme,
    onBack: () -> Unit,
    onClass: (StudentListRoute.Class) -> Unit,
    onGuide: (OutboundGuideRoute) -> Unit,
    onProgramme: () -> Unit,
    onSummerCamps: () -> Unit,
) {
    val year = if (programme == ExchangeProgramme.LongTerm) ExchangeStudent.years(ExchangeDirection.Outbound).firstOrNull() else null
    var fullScreen by rememberSaveable { mutableStateOf<ProgrammePhoto?>(null) }
    StudentsScaffold(stringResource(programme.title), onBack) {
        if (programme.photos.isNotEmpty()) {
            item(key = "photos", contentType = "photos") { ProgrammePhotos(programme.photos, onPhoto = { fullScreen = it }) }
        }
        item(key = "tagline", contentType = "tagline") {
            Text(stringResource(programme.tagline), style = MaterialTheme.typography.titleLarge, modifier = Modifier.padding(start = 16.dp, end = 16.dp, top = 16.dp))
        }
        if (year != null) {
            item(key = "studentsHeader", contentType = "header") { ListSectionHeader(stringResource(R.string.students_heading)) }
            item(key = "class", contentType = "class") {
                ClassItem(ExchangeDirection.Outbound, year, onClick = { onClass(StudentListRoute.Class(ExchangeDirection.Outbound, year.startYear)) })
            }
        }
        item(key = "guidesHeader", contentType = "header") { ListSectionHeader(stringResource(R.string.students_need_to_know)) }
        items(programme.outboundGuides, key = { it.name }, contentType = { "guide" }) { guide ->
            GuideListItem(guide, onClick = { onGuide(OutboundGuideRoute(guide)) })
        }
        item(key = "facts", contentType = "link") {
            LinkItem(stringResource(R.string.students_programme_facts), R.drawable.ic_checklist, onProgramme, Modifier.padding(top = 16.dp))
        }
        if (programme == ExchangeProgramme.SummerCamps) {
            item(key = "camps", contentType = "link") { LinkItem(stringResource(R.string.programme_view_camps), R.drawable.ic_dest_summer_camps, onSummerCamps) }
        }
    }
    fullScreen?.let { ProgrammePhotoViewer(it, onDismiss = { fullScreen = null }) }
}

/**
 * For students coming to the Netherlands: this year's class and the pages on
 * welcome, flight, language, insurance and travel. The earlier classes are
 * the top bar's action.
 */
@Composable
fun InboundScreen(onBack: () -> Unit, onClass: (StudentListRoute.Class) -> Unit, onGuide: (InboundGuideRoute) -> Unit, onEarlier: () -> Unit) {
    val year = ExchangeStudent.years(ExchangeDirection.Inbound).firstOrNull()
    StudentsScaffold(
        stringResource(R.string.home_inbound),
        onBack,
        actions = { ActionButton(stringResource(R.string.students_earlier_classes), R.drawable.ic_history, onEarlier) },
    ) {
        if (year != null) {
            item(key = "studentsHeader", contentType = "header") { ListSectionHeader(stringResource(R.string.students_heading)) }
            item(key = "class", contentType = "class") {
                ClassItem(ExchangeDirection.Inbound, year, onClick = { onClass(StudentListRoute.Class(ExchangeDirection.Inbound, year.startYear)) })
            }
        }
        item(key = "guidesHeader", contentType = "header") { ListSectionHeader(stringResource(R.string.students_need_to_know)) }
        items(InboundGuide.entries, key = { it.name }, contentType = { "guide" }) { guide ->
            GuideListItem(guide, onClick = { onGuide(InboundGuideRoute(guide)) })
        }
    }
}

/** A row that opens another page, with its symbol. */
@Composable
private fun LinkItem(text: String, icon: Int, onClick: () -> Unit, modifier: Modifier = Modifier) {
    ListItem(
        headlineContent = { Text(text) },
        leadingContent = { Icon(painterResource(icon), contentDescription = null, tint = MaterialTheme.colorScheme.primary) },
        modifier = modifier.clickable(onClick = onClick),
    )
}

/** An icon button in the top bar, with its name as a tooltip on a long press and for TalkBack. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
internal fun ActionButton(label: String, icon: Int, onClick: () -> Unit) {
    TooltipBox(
        positionProvider = TooltipDefaults.rememberTooltipPositionProvider(TooltipAnchorPosition.Below),
        tooltip = { PlainTooltip { Text(label) } },
        state = rememberTooltipState(),
    ) {
        IconButton(onClick = onClick) { Icon(painterResource(icon), contentDescription = label) }
    }
}

/** A page with a top bar and a back button over a list. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
internal fun StudentsScaffold(title: String, onBack: () -> Unit, actions: @Composable RowScope.() -> Unit = {}, content: LazyListScope.() -> Unit) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(title) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(painterResource(R.drawable.ic_arrow_back), stringResource(R.string.action_back)) } },
                actions = actions,
            )
        },
    ) { padding ->
        LazyColumn(contentPadding = padding, modifier = Modifier.fillMaxSize().consumeWindowInsets(padding), content = content)
    }
}
