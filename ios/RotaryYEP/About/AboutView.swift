import RotaryCore
import SwiftUI

/// The root of the About tab: what Rotary Youth Exchange is and stands for.
struct AboutView: View {
    var body: some View {
        NavigationStack {
            List {
                ForEach(AboutTopic.allCases) { topic in
                    Section {
                        if let body = topic.body {
                            Text(body)
                        }
                        ForEach(topic.points, id: \.key) { point in
                            Label {
                                Text(point)
                            } icon: {
                                Image(systemName: "checkmark.circle.fill")
                                    .foregroundStyle(.tint)
                            }
                        }
                    } header: {
                        Label {
                            Text(topic.title)
                        } icon: {
                            Image(systemName: topic.systemImage)
                        }
                    }
                }
                Section {
                    Text(AboutTopic.motto)
                        .font(.title3.italic())
                        .multilineTextAlignment(.center)
                        .frame(maxWidth: .infinity)
                        .listRowBackground(Color.clear)
                }
            }
            .navigationTitle(Text(AppTab.about.title))
        }
    }
}

#Preview {
    AboutView()
}
