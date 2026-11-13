import RotaryCore
import SwiftUI

/// A person in a list: photo, name and the role shown under the name.
struct PersonRow: View {
    let person: Person

    var body: some View {
        HStack(spacing: 12) {
            PersonPhoto(url: person.photoURL, size: 44)
            VStack(alignment: .leading, spacing: 2) {
                Text(person.name, format: .name(style: .medium))
                Text(person.role.title)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        }
    }
}
