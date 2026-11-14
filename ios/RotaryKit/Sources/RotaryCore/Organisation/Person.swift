public import Foundation

/// Someone people can reach: a member of a team, of ROTEX, or an emergency
/// contact. Only the name and a role are certain; the rest is what the person
/// chose to share.
public struct Person: Identifiable, Equatable, Sendable {
    public let name: PersonNameComponents
    /// The first role is the one shown under the name.
    public let roles: [Role]
    /// Written the Dutch way, as people read it: `06 12 34 56 78`, or
    /// `0182 61 26 76` with an area code. `ContactLinks` dials it as `+31…`.
    public let phone: String?
    public let email: String?
    public let club: String?
    public let district: String?
    public let photoURL: URL?
    /// In the person's own words and language, shown as written.
    public let bio: String?

    public init(
        name: PersonNameComponents, roles: [Role], phone: String? = nil, email: String? = nil,
        club: String? = nil, district: String? = nil, photoURL: URL? = nil, bio: String? = nil
    ) {
        precondition(!roles.isEmpty, "\(name) has no role")
        self.name = name
        self.roles = roles
        self.phone = phone
        self.email = email
        self.club = club
        self.district = district
        self.photoURL = photoURL
        self.bio = bio
    }

    /// A person's natural identity: their name, unique among the people of
    /// the app and fixed while it runs (OrganisationTests checks it).
    public var id: PersonNameComponents { name }

    /// The role shown under the name.
    public var role: Role { roles[0] }

    /// Whether `query` matches the name, the club, or a role in the app's language.
    public func matches(_ query: String) -> Bool {
        let query = query.trimmingCharacters(in: .whitespaces)
        guard !query.isEmpty else { return true }
        let fields = [name.formatted(), club ?? ""] + roles.map { String(localized: $0.title) }
        return fields.contains { $0.localizedStandardContains(query) }
    }
}

/// Hashes the identity only, not the bio and the rest (equal persons have
/// equal names, so this agrees with the synthesised `==`).
extension Person: Hashable {
    public func hash(into hasher: inout Hasher) {
        hasher.combine(name)
    }
}
