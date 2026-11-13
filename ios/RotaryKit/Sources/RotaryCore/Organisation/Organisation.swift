/// The organisation someone is part of, shown as a badge with their photo.
public enum Organisation: Sendable {
    /// Rotary: the MDJC and the Long Term and Short Term teams.
    case rotary
    /// ROTEX, the association of returned exchange students.
    case rotex
}

extension Person {
    /// Follows from the groups the person is in, so it never drifts from
    /// them: ROTEX for a ROTEX member, Rotary for anyone in another team,
    /// none for someone outside the teams (the independent confidants).
    public var organisation: Organisation? {
        if ContactGroup.rotex.members.contains(self) { return .rotex }
        if ContactGroup.teams.contains(where: { $0.members.contains(self) }) { return .rotary }
        return nil
    }
}
