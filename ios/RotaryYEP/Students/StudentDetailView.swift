import RotaryStudents
import SwiftUI

/// A student's page: their photo (full screen with a tap), name, where they
/// come from and go to, whether they are on exchange or a rebound, and what
/// they wrote about themselves.
struct StudentDetailView: View {
    let student: ExchangeStudent

    var body: some View {
        List {
            StudentHeader(student: student)
            Section {
                LabeledContent {
                    Text(verbatim: "\(student.homeCountry.flag) \(student.homeCountry.name)")
                } label: {
                    Label("Van", systemImage: "house")
                }
                LabeledContent {
                    Text(verbatim: "\(student.destination.flag) \(student.destination.name)")
                } label: {
                    Label("Naar", systemImage: "airplane")
                }
                LabeledContent {
                    Text(verbatim: student.exchangeYear.description)
                } label: {
                    Label("Uitwisselingsjaar", systemImage: "calendar")
                }
            }
            Section("Over mij") {
                Text(verbatim: student.bio)
                    .textSelection(.enabled)
                    .padding(.vertical, 4)
            }
        }
        .navigationTitle(Text(student.name, format: .name(style: .medium)))
        .navigationBarTitleDisplayMode(.inline)
    }
}

/// The photo, the name, the two flags with an arrow between them, and the
/// status.
private struct StudentHeader: View {
    let student: ExchangeStudent
    @State private var showsPhoto = false
    @Namespace private var photo
    @ScaledMetric private var photoSize: CGFloat = 132

    var body: some View {
        Section {
            VStack(spacing: 14) {
                Button {
                    showsPhoto = true
                } label: {
                    PersonPhoto(url: student.photoURL, size: min(photoSize, 220))
                }
                .buttonStyle(.plain)
                .disabled(student.photoURL == nil)
                .accessibilityLabel(Text("Foto van \(student.name.formatted())"))
                .accessibilityHint(Text("Toont de foto groot."))
                .matchedTransitionSource(id: "photo", in: photo)
                .fullScreenCover(isPresented: $showsPhoto) {
                    if let url = student.photoURL {
                        PhotoViewer(url: url, name: student.name)
                            .navigationTransition(.zoom(sourceID: "photo", in: photo))
                    }
                }
                Text(student.name, format: .name(style: .medium))
                    .font(.title2.bold())
                    .multilineTextAlignment(.center)
                HStack(spacing: 12) {
                    Text(verbatim: student.homeCountry.flag)
                    Image(systemName: "arrow.right")
                        .font(.title3.weight(.semibold))
                        .foregroundStyle(.secondary)
                    Text(verbatim: student.destination.flag)
                }
                .font(.largeTitle)
                .accessibilityElement(children: .ignore)
                .accessibilityLabel(Text("Van \(student.homeCountry.name) naar \(student.destination.name)"))
                StatusBadge(student: student)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 8)
            .listRowBackground(Color.clear)
        }
    }
}
