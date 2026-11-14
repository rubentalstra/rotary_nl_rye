import RotaryStudents
import SwiftUI

/// A page of information for students, for outbounds or for inbounds.
protocol StudentGuide: Hashable {
    var title: LocalizedStringResource { get }
    var subtitle: LocalizedStringResource { get }
    var systemImage: String { get }
    var sections: [GuideSection] { get }
}

extension OutboundGuide: StudentGuide {}
extension InboundGuide: StudentGuide {}

/// A guide in a list: its symbol in a tinted square, as in Settings, its
/// title and one line on what it tells.
struct GuideRow<Guide: StudentGuide>: View {
    let guide: Guide

    var body: some View {
        Label {
            VStack(alignment: .leading, spacing: 2) {
                Text(guide.title)
                Text(guide.subtitle)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        } icon: {
            Image(systemName: guide.systemImage)
                .font(.body.weight(.medium))
                .foregroundStyle(.white)
                .frame(width: 32, height: 32)
                .background(Color.accentColor.gradient, in: .rect(cornerRadius: 8))
        }
        .padding(.vertical, 2)
    }
}
