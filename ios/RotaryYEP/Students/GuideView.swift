import RotaryCore
import RotaryStudents
import SwiftUI

/// A guide's page: its sections as grouped lists, each piece drawn the
/// system's way: paragraphs, labelled points, facts, numbered steps,
/// questions and a mail link.
struct GuideView<Guide: StudentGuide>: View {
    let guide: Guide

    var body: some View {
        List {
            Section {
                Label {
                    Text(guide.subtitle)
                        .font(.title3.weight(.semibold))
                } icon: {
                    Image(systemName: guide.systemImage)
                        .font(.title2)
                        .foregroundStyle(.tint)
                }
                .padding(.vertical, 6)
                .listRowBackground(Color.clear)
            }
            ForEach(guide.sections) { section in
                Section {
                    ForEach(numbered(section.items), id: \.item.id) { entry in
                        GuideItemView(item: entry.item, number: entry.number)
                    }
                } header: {
                    if let title = section.title {
                        Text(title)
                    }
                }
            }
        }
        .navigationTitle(Text(guide.title))
        .navigationBarTitleDisplayMode(.inline)
    }

    /// Each item with its step number: steps count up within a section.
    private func numbered(_ items: [GuideItem]) -> [(item: GuideItem, number: Int)] {
        var number = 0
        return items.map { item in
            if case .step = item { number += 1 }
            return (item, number)
        }
    }
}

/// One piece of a guide.
private struct GuideItemView: View {
    let item: GuideItem
    let number: Int

    var body: some View {
        switch item {
        case .text(let text):
            Text(text)
                .padding(.vertical, 2)
        case .note(let text):
            Label {
                Text(text)
            } icon: {
                Image(systemName: "info.circle")
            }
            .font(.subheadline)
            .foregroundStyle(.secondary)
        case .question(let text):
            Label {
                Text(text)
            } icon: {
                Image(systemName: "questionmark.bubble")
                    .foregroundStyle(.tint)
            }
        case .point(let systemImage, let title, let text):
            Label {
                VStack(alignment: .leading, spacing: 2) {
                    if let title {
                        Text(title)
                            .font(text == nil ? .body : .headline)
                    }
                    if let text {
                        Text(text)
                            .font(title == nil ? .body : .subheadline)
                            .foregroundStyle(title == nil ? .primary : .secondary)
                    }
                }
            } icon: {
                Image(systemName: systemImage)
                    .foregroundStyle(.tint)
            }
            .padding(.vertical, 2)
        case .fact(let systemImage, let title, let value):
            Label {
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                    Text(value)
                }
            } icon: {
                Image(systemName: systemImage)
                    .foregroundStyle(.tint)
            }
            .accessibilityElement(children: .combine)
        case .step(let title, let text):
            HStack(alignment: .firstTextBaseline, spacing: 14) {
                Text(number, format: .number)
                    .font(.subheadline.weight(.bold))
                    .foregroundStyle(.white)
                    .frame(width: 28, height: 28)
                    .background(Color.accentColor, in: .circle)
                    .alignmentGuide(.firstTextBaseline) { $0[VerticalAlignment.center] + 5 }
                VStack(alignment: .leading, spacing: 2) {
                    if let title {
                        Text(title)
                            .font(.headline)
                    }
                    if let text {
                        Text(text)
                            .font(title == nil ? .body : .subheadline)
                            .foregroundStyle(title == nil ? .primary : .secondary)
                    }
                }
            }
            .padding(.vertical, 2)
            .accessibilityElement(children: .combine)
        case .mail(let address, let subject):
            if let url = mailURL(address, subject: subject) {
                Link(destination: url) {
                    Label {
                        Text(verbatim: address)
                    } icon: {
                        Image(systemName: "envelope")
                    }
                }
            }
        }
    }

    private func mailURL(_ address: String, subject: String?) -> URL? {
        var components = URLComponents()
        components.scheme = "mailto"
        components.path = address
        if let subject {
            components.queryItems = [URLQueryItem(name: "subject", value: subject)]
        }
        return components.url
    }
}
